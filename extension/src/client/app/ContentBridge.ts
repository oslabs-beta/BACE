import { isUUID } from "./utils";
import injection from './injection.js';

// <EventDef extends { type: any}> ?
export default class ContentBridge extends EventTarget {
  // varName: Map<keyType, valueType>
  // we have to define types outside of the constructor.  They have to have a default.  They can be defined in our outside the constructor.
  db: Map<string | undefined, {uuid:string | undefined, [key:string]:any}>;
  overviews: Map<string | null, any>;
  sceneGraphs: Map<string | undefined, any>;
  renderers: Map<any, any>; 
  renderingInfo: Map<string, string>;
  port: any; // this is chrome port? - not sure what other type this has?
  revision: any;

  constructor() {
    super();

    this.db = new Map();
    this.overviews = new Map();
    this.sceneGraphs = new Map();
    this.renderers = new Map();
    this.renderingInfo = new Map();

    this.port = chrome.runtime.connect({
      name: 'r3f-devtools',
    });

    // notify background port that tools panel is open
    this.port.postMessage({
      name: 'connect',
      tabId: chrome.devtools.inspectedWindow.tabId,
    });

    this.port.onDisconnect.addListener((req: object) => {
      console.error('disconnected from background', req)
    });

    this.port.onMessage.addListener((e: any) => {
      this.onMessage(e);
    })

    // keydown event listener goes here
    document.addEventListener('keydown', e => {
      let mode, space;
      switch (e.key) {
        case 'q': space = true; break;
        case 'w': mode = 'translate'; break;
        case 'e': mode = 'rotate'; break;
        case 'r': mode = 'scale'; break;
      }

      if (mode || space) {
        this.dispatchToContent('_transform-controls-update', { mode, space });
      }
    }, { passive: true })

    // binding all functions seems required in ts?
    // this.reload = this.reload.bind(this);
    // this.getEntity = this.getEntity.bind(this);
    // this.getEntityandDependencies = this.getEntityandDependencies.bind(this)
  }

  reload() {
    chrome.devtools.inspectedWindow.reload({});
  }

  getEntity(uuid: string): {uuid: string | undefined, [key:string]:any} {
    // meant to return an entity object with any keys and any values or the empty obj, defined currently as any
    // need to complete this
    if (uuid)
      return /renderer/.test(uuid) ? this.renderers.get(uuid) : this.db.get(uuid);
    return {uuid};
  }

  getEntityandDependencies(rootUUID: string | undefined){
    const data : {[key:string]: any} = {};
    const uuids : Array<string | undefined> = [rootUUID];
    while(uuids.length){
      const uuid: string | undefined = uuids.shift();
      if (uuid) {
        const entity = this.getEntity(uuid);
        if(entity && uuid && !data[uuid]){
          data[uuid] = entity;
          for(let value of Object.values(entity)){
            if(isUUID(value)){
              uuids.push(value);
            }
          }
        }
      }
    }

    return data;
  } 

  getRenderingInfo(uuid: string) {
    return this.renderingInfo.get(uuid);
  }

  getResourcesOverview(type: string | null) {
    return this.overviews.get(type);
  }

  getSceneGraph(uuid: string) {
    return this.sceneGraphs.get(uuid);
  }

  updateProperty(uuid: string, property: string, value: string, dataType: string | null) {
    const object = this.getEntity(uuid);
    // dispatchToContent should be defined below
    this.dispatchToContent('entity-update', {
      uuid,
      property,
      value,
      dataType,
    });

    // updating property won't trigger a data flush, instead update the local state so that elements' values are in synce with their HTML input state
    // important when switching between different items with LitElement

    object[property] = value;
    this.update(object);
  }

  // request methods
  requestEntity(uuid: string) {
    this.dispatchToContent('_request-entity', { uuid });
  }

  requestOverview(type: string | null) {
    this.dispatchToContent('_request-overview', { type })
  }

  requestSceneGraph(uuid: string) {
    this.dispatchToContent('_request-scene-graph', { uuid });
  }

  requestRenderingInfo(uuid: string) {
    this.dispatchToContent('_request-rendering-info', { uuid });
  }

  select(uuid: string) {
    if (!uuid) {
      return;
    }
    this.dispatchToContent('select', { uuid })
  }

  onMessage(request: any) {
    const { id, type, data } = request;

    // this.log('>>', type, data);
    switch(type) {
      case 'error':
        this.dispatchEvent(new CustomEvent('error', {
          detail: data,
        }));
        break;
      case 'register':
        this.revision = data.revision;
        this.eval(`console.log("three-devtools: debugging three.js r${this.revision}")`);
        break;
      case 'committed':
        this.db.clear();
        this.overviews.clear();
        this.sceneGraphs.clear();
        this.renderers.clear();
        this.renderingInfo.clear();

        this.eval(injection);
        this.dispatchEvent(new CustomEvent('load'));
        break;
      case 'observe':
        this.dispatchEvent(new CustomEvent('observe', {
          detail: {
            uuids: data.uuids,
          },
        }));
        break;
      case 'scene-graph':
        this.sceneGraphs.set(data.uuid, data.graph);
        this.dispatchEvent(new CustomEvent('scene-graph-update', {
          detail: {
            uuid: data.uuid,
            graph: data.graph,
          },
        }));
        break;
      case 'overview':
        this.overviews.set(data.type, data.entities);
        this.dispatchEvent(new CustomEvent('overview-update', {
          detail: {
            type: data.type,
            entities: data.entities,
          },
        }));
        break;
      case 'rendering-info':
        this.dispatchEvent(new CustomEvent('rendering-info-update', {
          detail: data,
        }));
        this.renderingInfo.set(data.uuid, data);
        break;
      case 'entity':
        if (data.type === 'renderer') {
          this.renderers.set(data.uuid, data);
          this.dispatchEvent(new CustomEvent('renderer-update', {
            detail: {
              renderer: data,
              uuid: data.uuid,
            },
          }));
        } else if (Array.isArray(data)) {
          for (let entity of data) {
            this.update(entity);
          }
        }
        break;
    }
  }

  update(entity: {uuid:string | undefined, [key:string]:any}) {
    this.db.set(entity.uuid, entity); // this means that db is a map with key entity.uuid and value entity
    this.dispatchEvent(new CustomEvent('entity-update', {
      detail: {
        entity,
        uuid: entity.uuid,
      },
    }));
  }

  dispatchToContent(type: string, detail: any) {
    this.eval(`__R3F_DEVTOOLS__.dispatchEvent(new CustomEvent('${type}', {
      detail: ${JSON.stringify(detail)},
    }));`
    );
  }

  eval(str: string) {
    // supposed to call log
    // this.log('EVAL', string);

    // fixed typing very sketchily - may break -- eyeglasses
    const [result, error] = chrome.devtools.inspectedWindow.eval(str) as unknown as Array<any>;
    if (error) {
      console.warn(error);
    }
    return result;
  }

  // updateProperty(uuid,property, value, dataType){
  //   const object = this.getEntity(uuid);

  // }

  // @TODO need to add _contentLog, log 
  // log(...message) {
  //   if (VERBOSE_CONTENT_BRIDGE) {
  //     console.log('ContentBridge:', ...message);
  //   }
  // }
}