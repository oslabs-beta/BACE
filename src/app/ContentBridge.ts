import { isUUID } from "./utils";

export default class ContentBridge extends EventTarget {
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

    this.port.onDisconnect.addListener(req => {
      console.error('disconnected from background', req)
    });

    // this.port.onMessage.addListener(e => )

    // keydown event listener goes here
  }

  reload() {
    chrome.devtools.inspectedWindow.reload();
  }

  getEntityandDependencies(rootUUID){
    const data = {};
    const uuids = [rootUUID];
    while(uuids.length){
      const uuid = uuids.shift();
      const entity = this.getEntity(uuid);
      if(entity && !data[uuid]){
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

  getRenderingInfo(uuid) {
    return this.renderingInfo.get(uuid);
  }

  getResourcesOverview(type) {
    return this.overviews.get(type);
  }

  getSceneGraph(uuid) {
    return this.sceneGraphs.get(uuid);
  }

  updateProperty(uuid, property, value, dataType) {
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
  requestEntity(uuid) {
    this.dispatchToContent('_request-entity', { uuid });
  }

  requestOverview(type) {
    this.dispatchToContent('_request-overview', { type })
  }

  requestSceneGraph(uuid) {
    this.dispatchToContent('_request-scene-graph', { uuid });
  }

  requestRenderingInfo(uuid) {
    this.dispatchToContent('_request-rendering-info', { uuid });
  }

  select(uuid) {
    if (!uuid) {
      return;
    }
    this.dispatchToContent('select', { uuid })
  }

  onMessage(request) {
    // @TODO
  }

  update(entity) {
    this.db.set(entity.uuid, entity);
    this.dispatchEvent(new CustomEvent('entity-update', {
      detail: {
        entity,
        uuid: entity.uuid,
      },
    }));
  }

  dispatchToContent(type, detail) {
    this.eval(`__R3F_DEVTOOLS__.dispatchEvent(new CustomEvent('${type}', {
      detail: ${JSON.stringify(detail)},
    }));`
    );
  }

  async eval(string) {
    // supposed to call log
    // this.log('EVAL', string);

    const [result, error] = await chrome.devtools.inspectedWindow.eval(string);
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