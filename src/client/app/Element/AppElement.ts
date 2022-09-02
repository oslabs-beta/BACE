import { LitElement, html, customElement, property } from 'lit-element';
import { ifDefined } from './lit-html/directives/if-defined'
import ContentBridge from '../ContentBridge';

const ERROR_TIMEOUT = 5000;

type tPanel = {
  title: string,
  resource: string | null,
}

type tPanels = {
  [key: string]: tPanel
}
const panels: tPanels = {
  scene: {
    title: 'Scene',
    resource: 'scenes',
  },
  geometries: {
    title: 'Geometries',
    resource: 'geometries',
  },
  materials: {
    title: 'Materials',
    resource: 'materials',
  },
  textures: {
    title: 'Textures',
    resource: 'textures',
  },
  rendering: {
    title: 'Rendering',
    resource: null
  },
};

@customElement('app-element')
export default class AppElement extends LitElement {
  @property({ type: String, }) errorText: string | undefined = undefined;
  @property({ type: Boolean, }) needsReload;
  @property({ type: Boolean, }) isReady;
  @property({ type: Boolean, }) loadReady;
  @property({ type: String, }) panel;
  @property({ type: String, }) activeScene: string | undefined = undefined;
  @property({ type: String, }) activeEntity: string | undefined = undefined;
  @property({ type: String, }) activeRenderer: string | undefined = undefined;
  @property({ type: ContentBridge, }) content;
  @property({ type: Number, }) errorTimeout: number | null = null;
  // static get properties() {
  //   return {
  //     errorText: { type: String, },
  //     needsReload: { type: Boolean, },
  //     isReady: { type: Boolean },
  //     // scene, geometries, materials, textures, rendering
  //     panel: { type: String, },
  //     activeScene: { type: String, },
  //     activeEntity: { type: String, },
  //     activeRenderer: { type: String, },
  //   }
  // }

  constructor() {
    super();

    this.needsReload = true;
    this.isReady = false;
    this.panel = 'scene';
    this.loadReady = false;

    this.onContentLoad = this.onContentLoad.bind(this);
    this.onContentError = this.onContentError.bind(this);
    this.onPanelClick = this.onPanelClick.bind(this);
    this.onContentUpdate = this.onContentUpdate.bind(this);
    this.onContentInitialLoad = this.onContentInitialLoad.bind(this);
    this.setError = this.setError.bind(this)
    this.onCommand = this.onCommand.bind(this);

    this.content = new ContentBridge();
    
    // chrome.runtime.onMessage.addListener('devtools-ready', () => {
    //   this.onContentInitialLoad,
    //   this.onContentLoad
    // })
    this.content.addEventListener('devtools-ready', () => {
      this.onContentInitialLoad,
      this.onContentLoad
    })
    // this.content.addEventListener('load', this.onContentLoad);
    this.content.addEventListener('error', this.onContentError);

    // onContentUpdate event listeners --- has switch statement to account for these
    this.content.addEventListener('rendering-info-update', this.onContentUpdate);
    this.content.addEventListener('entity-update', this.onContentUpdate);
    this.content.addEventListener('renderer-update', this.onContentUpdate);
    this.content.addEventListener('scene-graph-update', this.onContentUpdate);
    this.content.addEventListener('overview-update', this.onContentUpdate);
    this.content.addEventListener('observe', this.onContentUpdate);

    this.content.addEventListener('command', this.onCommand);
  }

  setError(error: string) {
    if (this.errorTimeout) {
      window.clearTimeout(this.errorTimeout)
    }
    this.errorText = error;
    this.errorTimeout = window.setTimeout(() => {
      this.errorText = '';
      this.errorTimeout = null;
    }, ERROR_TIMEOUT);
  }
  
  shouldUpdate(changedProps: any) {
    // is this ever called? -- not by us but maybe by LitElement?
    if (changedProps.has('activeEntity') && this.activeEntity) {
      this.content.select(this.activeEntity);
      this.content.requestEntity(this.activeEntity);
    }
    if (changedProps.has('activeScene') && this.activeScene) {
      this.content.requestSceneGraph(this.activeScene);
    }
    if (changedProps.has('panel') || (changedProps.has('isReady') && this.isReady)) {
      this.refreshData();
    }
    return true;
  }

  onContentInitialLoad(e: any){
    const script = document.createElement('script')

    let height: number | undefined
    chrome.windows.getCurrent((window: any) => { 
      height = window.height
    })

    function createWindow() {
      const params: chrome.windows.CreateData = {
        focused: true, 
        url: chrome.extension.getURL('devtools.html'), // chrome treats urls relative to extension root directory
        type: 'popup',
        width: 380, 
        height: height, 
        setSelfAsOpener: true
      }

      chrome.windows.create(params, (popup: any) => {
        console.log('popup up!')
      })
    }

    script.async = true
    script.innerHTML = `${createWindow()}`
    document.head.appendChild(script)

    // this.loadReady = true;
    // this.onContentLoad()
    // https://medium.com/geekculture/how-to-use-eval-in-a-v3-chrome-extension-f21ca8c2160c
    // fix this to evaluate onContentLoad
    // fix all 'eval' references as this is outdated
  }

  // fired when content is initially loaded
  onContentLoad(e: any) {
    // if (this.loadReady) {
      this.activeEntity = undefined;
      this.activeRenderer = undefined;
      this.isReady = false;
      this.needsReload = false;
    // }
  }

  // error
  onContentError(e: any){
    this.setError(e.detail);
  }

  refreshData(config={activeEntity: false}) {
    const panelDef = panels[this.panel];
    if (panelDef && panelDef.resource) {
      this.content.requestOverview(panelDef.resource);
    }
    if (this.activeScene && this.panel === 'scene') {
      this.content.requestSceneGraph(this.activeScene);
    }
    if (config.activeEntity !== false && this.activeEntity && this.panel !== 'rendering') {
      this.content.requestEntity(this.activeEntity);
    }
    if (this.panel === 'rendering' && this.activeRenderer) {
      this.content.requestEntity(this.activeRenderer);
    }
  }

  onPanelClick(e: any){
    this.panel = e.target.getAttribute('panel');
  }

  onContentUpdate(e: any){
    switch(e.type){
      case 'observe':
        this.isReady = true;
        const renderer = e.detail.uuids.find((id: string) => /renderer/.test(id));
        if(!this.activeRenderer && renderer){
          this.activeRenderer = renderer;
        }
        this.refreshData({ activeEntity: false });
        break;
      case 'rendering-info-update':
        if(this.panel === 'rendering' && this.activeRenderer === e.detail.uuid){
          this.requestUpdate();
        }
        break;
      case 'entity-update':
        this.requestUpdate();
        break;
      case 'renderer-update':
        if(this.panel === 'rendering' && this.activeRenderer === e.detail.uuid){
          this.requestUpdate();
        }
        break;
      case 'scene-graph-update':
        if(this.panel === 'scene' && this.activeScene === e.detail.uuid){
          this.requestUpdate();
        }
        break;
      case 'overview-update':
        if(!this.activeScene && e.detail.type === 'scenes' && e.detail.entities[0]){
          this.activeScene = e.detail.entities[0].uuid;
        }
        else if(this.panel && panels[this.panel].resource === e.detail.type){
          this.requestUpdate();
        }
        break;
    }
  }

  // API for Components Event Handlers 
  onCommand(e: any){
    const type: any = e.detail.type;

    switch(type){
      case 'refresh':
        this.refreshData();
        break;
      case 'select-scene':
        this.activeScene = e.detail.uuid;
        break;
      case 'select-entity':
        this.activeEntity = e.detail.uuid;
        break;
      case 'select-renderer':
        this.activeRenderer = e.detail.id;
        break;
      case 'select-panel':
        this.panel = e.detail.panel;
        break;
      case 'request-entity':
        this.content.requestEntity(e.detail.uuid);
        break;
      case 'request-overview':
        this.content.requestOverview(e.detail.resourceType);
        break;
      case 'request-scene-graph':
        this.content.requestSceneGraph(e.detail.uuid);
        break;
      case 'request-rendering-info':
        this.content.requestRenderingInfo(e.details.uuid);
        break;
      case 'update-property':
        const { uuid, property, value, dataType } : {uuid: any; property: any; value: any; dataType: any} = e.detail;
        this.content.updateProperty(uuid, property, value, dataType);
        break;
      default: 
        console.warn(`Unknown command ${type}`);
    }
  }
  

  render() {
    const panel: string = this.panel || 'scene';
    const panelDef = panels[panel];
    const errorText = this.errorText || '';

    // if panel is "scene" and there is an active scene, get the scene graph
    const graph = panel === 'scene' && this.activeScene ? this.content.getSceneGraph(this.activeScene) : void 0;

    // if the panel is "scene" and there is an active scene, get the resources overview (we might not want this here if we are doing the gui)
    const scenes = panel === 'scene' && this.activeScene ? this.content.getResourcesOverview('scenes') : void 0;

    // boolean whether to show the resourceView
    const showResourceView = !!(panelDef.resource && panel !== 'scene');

    // if show the resources, call getResourcesOverview (again we might not want this here if we have the GUI)
    const resources = showResourceView ? this.content.getResourcesOverview(panelDef.resource) : [];

    // check if the panel is rendering to decide whether to show the inspector
    const showInspector = panel === 'rendering' ? (!!this.activeRenderer) : (!!this.activeEntity);
    // define which entity is being inspected
    const inspectedEntity = panel === 'rendering' ? this.activeRenderer : this.activeEntity;
    // grab the data of the inspected entity
    const inspectedEntityData = showInspector ? this.content.getEntityandDependencies(inspectedEntity) : void 0;
    // if the panel is rendering, get the info of an active renderer if there is one
    const renderingInfo = panel === 'rendering' && this.activeRenderer ? this.content.getRenderingInfo(this.activeRenderer) : void 0;
    
    return html`
    // add style tags- copy/pasted directly.  Can modify later.
    <style>
  :host {
    width: 100%;
    height: 100%;
  }

  /* Vertical */

  #container {
    width: 100%;
    height: 100%;
    user-select: none;
  }
  #container > * {
    border-top: 1px solid var(--view-border-color);
    border-left: 0px;
  }
  #container > devtools-message {
    border: 0px;
  }
  #container > tab-bar {
    border: 0px;
  }
  .flex {
    display: flex;
    flex-direction: column;
  }
  .flex > * {
    flex: 1;
    overflow: hidden;
  }
  .flex.inverse {
    flex-direction: row;
  }
  .collapsible {
    flex: 0 1 auto;
  }

  .inspector-frame {
    max-height: 50%;
    flex: 0 1 auto;
  }
  .inspector-frame[show-inspector] {
    flex: 1;
  }

  /* @TODO turn these into generic flex components? */
  .frame > * {
    display: none;
  }
  .frame > [enabled] {
    display: inherit;
  }

  /* Horizontal frames */

  @media (min-aspect-ratio: 1/1) {
    .flex {
      flex-direction: row;
    }
    .flex.inverse {
      flex-direction: column;
    }
    #container > * {
      border-left: 1px solid var(--view-border-color);
      border-top: 0px;
    }
    tab-bar {
      flex-direction: column;
      height: 100%;
    }
    .inspector-frame {
      max-height: 100%;
      max-width: 50%;
    }
  }

  .error {
    background-color: red;
    position: absolute;
    bottom: 0;
    color: white;
    width: 100%;
    display: none;
  }
  .show-error {
    display: block;
  }

  /* Animations and visibility handling */

  [state] [visible-when] {
    display: none;
  }
  [state='ready'] [visible-when='ready'] {
    display: inherit;
  }
  [state='needs-reload'] [visible-when='needs-reload'] {
    display: inherit;
  }
  [state='waiting'] [visible-when='waiting'] {
    display: inherit;
  }
  .loading {
    animation: loading 1s infinite;
  }
  @keyframes loading {
    from {
      transform: rotateY(0deg);
    }
    to {
      transform: rotateY(180deg);
    }
  }
</style>
    <div class="flex" state=${this.isReady ? 'ready' : this.needsReload ? 'needs-reload' : 'waiting'} id="container">
      // reload panes
      <devtools-message visible-when='needs-reload'>
        <span>R3F Devtools requires a page reload.</span>
        <devtools-button @click="${() => this.content.reload()}"> // this calls content.reload() to just basically reload the page
          <span>Reload</span>
        </devtools-button>
      </devtools-message>

      <devtools-message visible-when='waiting'>
        <span>Waiting for a scene to be observed...</span>
        <span class="loading">▲</span> // leaves a symbol to show waiting for the scene to be observed
      </devtools-message>

      // application panes
      // selecting a panel
      <tab-bar class="flex inverse collapsible" visible-when='ready' @click=${this.onPanelClick}> 
        // titles of each panels component
        <x-icon class="collapsible" panel="scene" title="${panels.scene.title}" ?active=${panel === 'scene'} icon="cubes" fill></x-icon>
        <x-icon class="collapsible" panel="geometries" title="${panels.geometries.title}" ?active=${panel === 'geometries'} icon="dice-d20" fill></x-icon>
        <x-icon class="collapsible" panel="materials" title="${panels.materials.title}" ?active=${panel === 'materials'} icon="paint-brush" fill></x-icon>
        <x-icon class="collapsible" panel="textures" title="${panels.textures.title}" ?active=${panel === 'textures'} icon="chess-board" fill></x-icon>
        <x-icon class="collapsible" panel="rendering" title="${panels.rendering.title}" ?active=${panel === 'rendering'} icon="video" fill></x-icon>
      </tab-bar>
      <div class="frame flex" visible-when='ready'> 
        // scene viewer
        <scene-view
          .graph="${graph}"
          .scenes="${scenes}"
          .activeScene="${ifDefined(this.activeScene)}"
          .activeEntity="${ifDefined(this.activeEntity)}"
          ?enabled=${panel === 'scene'}
        ></scene-view>
        // resources viewer - NOTE: WE MIGHT NOT WANT THIS HERE IF WE HAVE A SEPARATE GUI
        <resources-view
          title="${panelDef.title}"
          selected="${ifDefined(this.activeEntity)}"
          .resources="${resources}"
          ?enabled=${showResourceView}
        ></resources-view>
        // renderer view
        <renderer-view
          .rendererId="${this.activeRenderer}"
          .renderingInfo="${renderingInfo}"
          ?enabled=${panel === 'rendering'}
        ></renderer-view>
      </div>

      // for inspecting a particular element
      <div ?show-inspector=${showInspector} class="inspector-frame frame flex inverse"
        visible-when='ready'>
          <parameters-view ?enabled=${showInspector}
            .uuid="${inspectedEntity}"
            .entities="${inspectedEntityData}">
          </parameters-view>
      </div>
      <title-bar title="${errorText}" class="error ${errorText ? 'show-error' : ''}"></title-bar>
    </div>
    `;
  }
}