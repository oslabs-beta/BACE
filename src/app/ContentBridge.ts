import { isUUID } from "./utils";

// <EventDef extends { type: any}> ?
export default class ContentBridge extends EventTarget {
  // varName: Map<keyType, valueType>
  // we have to define types outside of the constructor.  They have to have a default.  They can be defined in our outside the constructor.
  db: Map<string | undefined, {uuid:string | undefined, [key:string]:any}>;
  overviews: Map<string | null, any>;
  sceneGraphs: Map<string | undefined, any>;
  renderers: Map<any, any>; // not called anywhere because this file is incomplete -- will need to adjust types later
  renderingInfo: Map<string, string>;
  port: any; // this is chrome port? - not sure what other type this has?

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

    // this.port.onMessage.addListener(e => )

    // keydown event listener goes here

    // binding all functions seems required in ts?
    // this.reload = this.reload.bind(this);
    // this.getEntity = this.getEntity.bind(this);
    // this.getEntityandDependencies = this.getEntityandDependencies.bind(this)
  }

  reload() {
    chrome.devtools.inspectedWindow.reload({});
  }

  getEntity(uuid: string | undefined): {uuid: string | undefined, [key:string]:any} {
    // meant to return an entity object with any keys and any values or the empty obj, defined currently as any
    // need to complete this
    return {uuid};
  }

  getEntityandDependencies(rootUUID: string | undefined){
    const data : {[key:string]: any} = {};
    const uuids : Array<string | undefined> = [rootUUID];
    while(uuids.length){
      const uuid: string | undefined = uuids.shift();
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
    // @TODO
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

  // @TODO need to add _contentLog, log functionality here for onMessage?
}