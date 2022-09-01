/*! For license information please see index.js.LICENSE.txt */
(()=>{"use strict";var e={5844:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0});const i=n(1761);class r extends EventTarget{constructor(){super(),this.db=new Map,this.overviews=new Map,this.sceneGraphs=new Map,this.renderers=new Map,this.renderingInfo=new Map,this.port=chrome.runtime.connect({name:"r3f-devtools"}),this.port.postMessage({name:"connect",tabId:chrome.devtools.inspectedWindow.tabId}),this.port.onDisconnect.addListener((e=>{console.error("disconnected from background",e)})),this.port.onMessage.addListener((e=>{this.onMessage(e),console.log(e)})),document.addEventListener("keydown",(e=>{let t,n;switch(e.key){case"q":n=!0;break;case"w":t="translate";break;case"e":t="rotate";break;case"r":t="scale"}(t||n)&&this.dispatchToContent("_transform-controls-update",{mode:t,space:n})}),{passive:!0})}reload(){chrome.devtools.inspectedWindow.reload({})}getEntity(e){return e?/renderer/.test(e)?this.renderers.get(e):this.db.get(e):{uuid:e}}getEntityandDependencies(e){const t={},n=[e];for(;n.length;){const e=n.shift();if(e){const r=this.getEntity(e);if(r&&e&&!t[e]){t[e]=r;for(let e of Object.values(r))(0,i.isUUID)(e)&&n.push(e)}}}return t}getRenderingInfo(e){return this.renderingInfo.get(e)}getResourcesOverview(e){return this.overviews.get(e)}getSceneGraph(e){return this.sceneGraphs.get(e)}updateProperty(e,t,n,i){const r=this.getEntity(e);this.dispatchToContent("entity-update",{uuid:e,property:t,value:n,dataType:i}),r[t]=n,this.update(r)}requestEntity(e){this.dispatchToContent("_request-entity",{uuid:e})}requestOverview(e){this.dispatchToContent("_request-overview",{type:e})}requestSceneGraph(e){this.dispatchToContent("_request-scene-graph",{uuid:e})}requestRenderingInfo(e){this.dispatchToContent("_request-rendering-info",{uuid:e})}select(e){e&&this.dispatchToContent("select",{uuid:e})}onMessage(e){const{id:t,type:n,data:i}=e;switch(n){case"error":this.dispatchEvent(new CustomEvent("error",{detail:i}));break;case"register":this.revision=i.revision,this.eval(`console.log("r3f-devtools: debugging three.js r${this.revision}")`);break;case"injection":this.db.clear(),this.overviews.clear(),this.sceneGraphs.clear(),this.renderers.clear(),this.renderingInfo.clear(),i(),this.dispatchEvent(new CustomEvent("devtools-ready"));break;case"observe":this.dispatchEvent(new CustomEvent("observe",{detail:{uuids:i.uuids}}));break;case"scene-graph":this.sceneGraphs.set(i.uuid,i.graph),this.dispatchEvent(new CustomEvent("scene-graph-update",{detail:{uuid:i.uuid,graph:i.graph}}));break;case"overview":this.overviews.set(i.type,i.entities),this.dispatchEvent(new CustomEvent("overview-update",{detail:{type:i.type,entities:i.entities}}));break;case"rendering-info":this.dispatchEvent(new CustomEvent("rendering-info-update",{detail:i})),this.renderingInfo.set(i.uuid,i);break;case"entity":if("renderer"===i.type)this.renderers.set(i.uuid,i),this.dispatchEvent(new CustomEvent("renderer-update",{detail:{renderer:i,uuid:i.uuid}}));else if(Array.isArray(i))for(let e of i)this.update(e)}}update(e){this.db.set(e.uuid,e),this.dispatchEvent(new CustomEvent("entity-update",{detail:{entity:e,uuid:e.uuid}}))}dispatchToContent(e,t){this.eval(`__R3F_DEVTOOLS__.dispatchEvent(new CustomEvent('${e}', {\n      detail: ${JSON.stringify(t)},\n    }));`)}eval(e){const[t,n]=chrome.devtools.inspectedWindow.eval(e);return n&&console.warn(n),t}}t.default=r},8438:function(e,t,n){var i=this&&this.__decorate||function(e,t,n,i){var r,o=arguments.length,a=o<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,n):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,i);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(a=(o<3?r(a):o>3?r(t,n,a):r(t,n))||a);return o>3&&a&&Object.defineProperty(t,n,a),a},r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const o=n(3247),a=n(6594),s=r(n(5844)),l={scene:{title:"Scene",resource:"scenes"},geometries:{title:"Geometries",resource:"geometries"},materials:{title:"Materials",resource:"materials"},textures:{title:"Textures",resource:"textures"},rendering:{title:"Rendering",resource:null}};let p=class extends o.LitElement{constructor(){super(),this.errorText=void 0,this.activeScene=void 0,this.activeEntity=void 0,this.activeRenderer=void 0,this.errorTimeout=null,this.needsReload=!0,this.isReady=!1,this.panel="scene",this.loadReady=!1,this.onContentLoad=this.onContentLoad.bind(this),this.onContentError=this.onContentError.bind(this),this.onPanelClick=this.onPanelClick.bind(this),this.onContentUpdate=this.onContentUpdate.bind(this),this.onContentInitialLoad=this.onContentInitialLoad.bind(this),this.setError=this.setError.bind(this),this.onCommand=this.onCommand.bind(this),this.content=new s.default,this.content.addEventListener("devtools-ready",(()=>{this.onContentInitialLoad,this.onContentLoad})),this.content.addEventListener("error",this.onContentError),this.content.addEventListener("rendering-info-update",this.onContentUpdate),this.content.addEventListener("entity-update",this.onContentUpdate),this.content.addEventListener("renderer-update",this.onContentUpdate),this.content.addEventListener("scene-graph-update",this.onContentUpdate),this.content.addEventListener("overview-update",this.onContentUpdate),this.content.addEventListener("observe",this.onContentUpdate),this.content.addEventListener("command",this.onCommand)}setError(e){this.errorTimeout&&window.clearTimeout(this.errorTimeout),this.errorText=e,this.errorTimeout=window.setTimeout((()=>{this.errorText="",this.errorTimeout=null}),5e3)}shouldUpdate(e){return e.has("activeEntity")&&this.activeEntity&&(this.content.select(this.activeEntity),this.content.requestEntity(this.activeEntity)),e.has("activeScene")&&this.activeScene&&this.content.requestSceneGraph(this.activeScene),(e.has("panel")||e.has("isReady")&&this.isReady)&&this.refreshData(),!0}onContentInitialLoad(e){const t=document.createElement("script");let n;chrome.windows.getCurrent((e=>{n=e.height})),t.async=!0,t.innerHTML=`${function(){const e={focused:!0,url:chrome.extension.getURL("devtools.html"),type:"popup",width:380,height:n,setSelfAsOpener:!0};chrome.windows.create(e,(e=>{console.log("popup up!")}))}()}`,document.head.appendChild(t)}onContentLoad(e){this.activeEntity=void 0,this.activeRenderer=void 0,this.isReady=!1,this.needsReload=!1}onContentError(e){this.setError(e.detail)}refreshData(e={activeEntity:!1}){const t=l[this.panel];t&&t.resource&&this.content.requestOverview(t.resource),this.activeScene&&"scene"===this.panel&&this.content.requestSceneGraph(this.activeScene),!1!==e.activeEntity&&this.activeEntity&&"rendering"!==this.panel&&this.content.requestEntity(this.activeEntity),"rendering"===this.panel&&this.activeRenderer&&this.content.requestEntity(this.activeRenderer)}onPanelClick(e){this.panel=e.target.getAttribute("panel")}onContentUpdate(e){switch(e.type){case"observe":this.isReady=!0;const t=e.detail.uuids.find((e=>/renderer/.test(e)));!this.activeRenderer&&t&&(this.activeRenderer=t),this.refreshData({activeEntity:!1});break;case"rendering-info-update":case"renderer-update":"rendering"===this.panel&&this.activeRenderer===e.detail.uuid&&this.requestUpdate();break;case"entity-update":this.requestUpdate();break;case"scene-graph-update":"scene"===this.panel&&this.activeScene===e.detail.uuid&&this.requestUpdate();break;case"overview-update":!this.activeScene&&"scenes"===e.detail.type&&e.detail.entities[0]?this.activeScene=e.detail.entities[0].uuid:this.panel&&l[this.panel].resource===e.detail.type&&this.requestUpdate()}}onCommand(e){const t=e.detail.type;switch(t){case"refresh":this.refreshData();break;case"select-scene":this.activeScene=e.detail.uuid;break;case"select-entity":this.activeEntity=e.detail.uuid;break;case"select-renderer":this.activeRenderer=e.detail.id;break;case"select-panel":this.panel=e.detail.panel;break;case"request-entity":this.content.requestEntity(e.detail.uuid);break;case"request-overview":this.content.requestOverview(e.detail.resourceType);break;case"request-scene-graph":this.content.requestSceneGraph(e.detail.uuid);break;case"request-rendering-info":this.content.requestRenderingInfo(e.details.uuid);break;case"update-property":const{uuid:n,property:i,value:r,dataType:o}=e.detail;this.content.updateProperty(n,i,r,o);break;default:console.warn(`Unknown command ${t}`)}}render(){const e=this.panel||"scene",t=l[e],n=this.errorText||"",i="scene"===e&&this.activeScene?this.content.getSceneGraph(this.activeScene):void 0,r="scene"===e&&this.activeScene?this.content.getResourcesOverview("scenes"):void 0,s=!(!t.resource||"scene"===e),p=s?this.content.getResourcesOverview(t.resource):[],d="rendering"===e?!!this.activeRenderer:!!this.activeEntity,c="rendering"===e?this.activeRenderer:this.activeEntity,h=d?this.content.getEntityandDependencies(c):void 0,u="rendering"===e&&this.activeRenderer?this.content.getRenderingInfo(this.activeRenderer):void 0;return o.html`
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
    <div class="flex" state=${this.isReady?"ready":this.needsReload?"needs-reload":"waiting"} id="container">
      // reload panes
      <devtools-message visible-when='needs-reload'>
        <span>R3F Devtools requires a page reload.</span>
        <devtools-button @click="${()=>this.content.reload()}"> // this calls content.reload() to just basically reload the page
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
        <x-icon class="collapsible" panel="scene" title="${l.scene.title}" ?active=${"scene"===e} icon="cubes" fill></x-icon>
        <x-icon class="collapsible" panel="geometries" title="${l.geometries.title}" ?active=${"geometries"===e} icon="dice-d20" fill></x-icon>
        <x-icon class="collapsible" panel="materials" title="${l.materials.title}" ?active=${"materials"===e} icon="paint-brush" fill></x-icon>
        <x-icon class="collapsible" panel="textures" title="${l.textures.title}" ?active=${"textures"===e} icon="chess-board" fill></x-icon>
        <x-icon class="collapsible" panel="rendering" title="${l.rendering.title}" ?active=${"rendering"===e} icon="video" fill></x-icon>
      </tab-bar>
      <div class="frame flex" visible-when='ready'> 
        // scene viewer
        <scene-view
          .graph="${i}"
          .scenes="${r}"
          .activeScene="${(0,a.ifDefined)(this.activeScene)}"
          .activeEntity="${(0,a.ifDefined)(this.activeEntity)}"
          ?enabled=${"scene"===e}
        ></scene-view>
        // resources viewer - NOTE: WE MIGHT NOT WANT THIS HERE IF WE HAVE A SEPARATE GUI
        <resources-view
          title="${t.title}"
          selected="${(0,a.ifDefined)(this.activeEntity)}"
          .resources="${p}"
          ?enabled=${s}
        ></resources-view>
        // renderer view
        <renderer-view
          .rendererId="${this.activeRenderer}"
          .renderingInfo="${u}"
          ?enabled=${"rendering"===e}
        ></renderer-view>
      </div>

      // for inspecting a particular element
      <div ?show-inspector=${d} class="inspector-frame frame flex inverse"
        visible-when='ready'>
          <parameters-view ?enabled=${d}
            .uuid="${c}"
            .entities="${h}">
          </parameters-view>
      </div>
      <title-bar title="${n}" class="error ${n?"show-error":""}"></title-bar>
    </div>
    `}};i([(0,o.property)({type:String})],p.prototype,"errorText",void 0),i([(0,o.property)({type:Boolean})],p.prototype,"needsReload",void 0),i([(0,o.property)({type:Boolean})],p.prototype,"isReady",void 0),i([(0,o.property)({type:Boolean})],p.prototype,"loadReady",void 0),i([(0,o.property)({type:String})],p.prototype,"panel",void 0),i([(0,o.property)({type:String})],p.prototype,"activeScene",void 0),i([(0,o.property)({type:String})],p.prototype,"activeEntity",void 0),i([(0,o.property)({type:String})],p.prototype,"activeRenderer",void 0),i([(0,o.property)({type:s.default})],p.prototype,"content",void 0),i([(0,o.property)({type:Number})],p.prototype,"errorTimeout",void 0),p=i([(0,o.customElement)("app-element")],p),t.default=p},5610:function(e,t,n){var i=this&&this.__decorate||function(e,t,n,i){var r,o=arguments.length,a=o<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,n):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,i);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(a=(o<3?r(a):o>3?r(t,n,a):r(t,n))||a);return o>3&&a&&Object.defineProperty(t,n,a),a};Object.defineProperty(t,"__esModule",{value:!0});const r=n(3247);let o=class extends r.LitElement{constructor(){super(),this.uuid="",this.width=0,this.height=0}render(){return r.html`None`}onLoad(e){const t=e.composedPath()[0];this.width=t.naturalWidth,this.height=t.naturalHeight}onActivate(){this.dispatchEvent(new CustomEvent("select-entity",{detail:{uuid:this.uuid},bubbles:!0,composed:!0}))}};i([(0,r.property)({type:Number,reflect:!0})],o.prototype,"width",void 0),i([(0,r.property)({type:Number,reflect:!0})],o.prototype,"height",void 0),o=i([(0,r.customElement)("image-preview-element")],o),t.default=o},2535:function(e,t,n){var i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const r=n(3247),o=i(n(4566)),a=i(n(599)),s=i(n(7907)),l=i(n(5663)),p=i(n(1303)),d=i(n(8924)),c=n(1761),h=function(e,t){for(var n=(t=(t=t.replace(/\[(\w+)\]/g,".$1")).replace(/^\./,"")).split("."),i=0,r=n.length;i<r;++i){var o=n[i];if(!(o in e))return;e=e[o]}return e},u={Type:{name:"Type",type:"string",prop:"baseType"},UUID:{name:"UUID",type:"string",prop:"uuid"},Name:{name:"Name",type:"string",prop:"name"}};function m(e,t,n,i){for(let o of n){if("function"==typeof o){const t=o(e);if(!t)continue;o=t}if("group"!==o.type){const{name:n,type:a,prop:s,enumType:l,default:p,readonly:d}=o;let c=h(e,s);void 0===c&&(c=p);let u="min"in o?o.min:-1/0,m="max"in o?o.max:1/0,y="step"in o?o.step:"int"===a?1:.01,f="precision"in o?o.precision:"int"===a?0:3,v={};c&&i&&-1!==["geometry","material","texture"].indexOf(o.type)&&(v=i[c]||{}),t.push(r.html`
        <key-value uuid=${e.uuid}
          key-name="${n}"
          .value="${c}"
          type="${a}"
          property="${s}"
          .enumType="${l||""}"
          .min="${u}"
          .max="${m}"
          .step="${y}"
          .precision="${f}"
          .readonly="${!0===d}"
          .data="${v}"
          >
        </key-value>`)}else{const n=[];m(e,t,n,[...o.props]),t.push(r.html`<accordion-view>
        <div class="accordion-title" slot="content">${o.name}</div>
        ${n}
      </accordion-view>`)}}}class y extends r.LitElement{constructor(){super(...arguments),this.uuid=""}onRefresh(e){this.dispatchEvent(new CustomEvent("command",{detail:{type:"refresh"},bubbles:!0,composed:!0}))}render(){const e=this.entities&&this.entities[this.uuid]||null,t=e?(0,c.getEntityName)(e):"",n=[];if(e){let t=o.default[e.baseType]||a.default[e.baseType]||s.default[e.baseType]||l.default[e.baseType]||p.default[e.baseType]||d.default[e.baseType];t||(t=a.default.Object3D),m(e,n,[..."renderer"===e.type?[u.Type,u.Name]:[u.Type,u.UUID,u.Name],...t.props],this.entities)}return r.html`
      <style>
        :host {
          display: flex;
          flex-direction: column;
          width: 100%;
          height: 100%;
        }
        .properties {
          flex: 1;
          overflow-y: auto;
          overflow-x: hidden;
        }
        .hide {
          display: none;
        }
        accordion-view {
          border-top: 1px solid var(--title-border-color);
        }
        accordion-view ~ accordion-view {
          border-top: 0px;
        }
        accordion-view[open] {
          border-bottom: 1px solid var(--title-border-color);
        }
        .accordion-title {
          line-height: 15px;
          white-space: nowrap;
          align-items: center;
          overflow: hidden;
          text-overflow: ellipsis;
          padding: 2px 0.2em;
        }
      </style>
      <title-bar title="${t}">
        <devtools-icon-button icon="refresh" class="${this.entity?"":"hide"}" @click="${this.onRefresh}">
      </title-bar>
      <div class="properties">
        ${n} 
      </div>
    `}}t.default=y},1399:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0});const i=n(3247);class r extends i.LitElement{constructor(){super(),this.enabledSet=!1,this.enabled=!1,this.onPoll=this.onPoll.bind(this)}disconnectedCallback(){this.timer&&window.clearInterval(this.timer),super.disconnectedCallback()}onPoll(){this.rendererId&&this.dispatchEvent(new CustomEvent("command",{detail:{type:"request-rendering-info",uuid:this.rendererId},bubbles:!0,composed:!0}))}shouldUpdate(){return this.enabledSet&&(this.enabled?this.timer=window.setInterval(this.onPoll,1e3):window.clearInterval(this.timer)),this.enabledSet=!0,!0}render(){const e=this.renderingInfo?this.renderingInfo.info:{render:{frame:0,calls:0,triangles:0,points:0,lines:0},memory:{geometries:0,textures:0},programs:0};return i.html`
    <style>
      :host {
        display: flex;
        flex-direction: column;
        width: 100%;
      }
      /* quick hack, need to rethink title components */
      title-bar[title="Memory"] {
        border-top: 1px solid var(--title-border-color);
      }
      ul {
        list-style-type: none;
        padding-left: 0.8em;
        margin: 0.4em 0;
      }
      ul li {
        margin: 0.2em 0;
      }
      ul li span:first-child {
        font-weight: bold;
        padding-right: 0.5em;
      }
      ul li span:first-child::after {
        content: ':';
      }
    </style>
    <title-bar title="Renderer"></title-bar>
    <ul>
      <li><span>frame</span><span>${e.render.frame}</span></li>
      <li><span>draw calls</span><span>${e.render.calls}</span></li>
      <li><span>triangles</span><span>${e.render.triangles}</span></li>
      <li><span>points</span><span>${e.render.points}</span></li>
      <li><span>lines</span><span>${e.render.lines}</span></li>
    </ul>
    <title-bar title="Memory"></title-bar>
    <ul>
      <li><span>geometries</span><span>${e.memory.geometries||0}</span></li>
      <li><span>textures</span><span>${e.memory.textures||0}</span></li>
      <li><span>programs</span><span>${e.programs||0}</span></li>
    </ul>
    `}}t.default=r},4785:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0});const i=n(3247),r=n(1761);class o extends i.LitElement{constructor(){super(...arguments),this.title="",this.resources=[]}connectedCallback(){super.connectedCallback(),this.addEventListener("tree-item-select",this.onTreeItemSelect)}disconnectedCallback(){this.removeEventListener("tree-item-select",this.onTreeItemSelect),super.disconnectedCallback()}render(){const e=this.title;let t=(this.resources||[]).map(((e,t)=>{let n=e.uuid&&this.selected&&this.selected===e.uuid,o=(0,r.getEntityName)(e);return i.html`
      <tree-item
        unique="${e.uuid}"
        ?selected="${n}"
        depth="0"
      >
      <div slot="content">${o}</div>
      </tree-item>
      `}));return i.html`
    <style>
      :host {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        overflow-x: hidden;
      }
      :host > tree-item {
        flex: 1;
        overflow-y: auto;
        overflow-x: hidden;
      }
      #tree-root {
        --tree-item-arrow-width: 0.8em;
      }
      #tree-root:focus {
        /* TODO how can focus be shown in the tree view? */
        outline: none;
      }
    </style>
    <title-bar title="${e}">
      <devtools-icon-button icon="refresh" @click="${this.onRefreshClick}">
    </title-bar>
    <tree-item
      id="tree-root"
      tabindex="0"
      root
      open
      depth="-1">
      ${t}
    </tree-item>
    `}updated(){var e;const t=null===(e=this.shadowRoot)||void 0===e?void 0:e.querySelector("tree-item[selected]");t&&t.parentElement&&(t.parentElement.open=!0)}onRefreshClick(e){this.dispatchEvent(new CustomEvent("command",{detail:{type:"refresh"},bubbles:!0,composed:!0}))}onTreeItemSelect(e){e.stopPropagation();const t=e.composedPath()[0].getAttribute("unique");this.dispatchEvent(new CustomEvent("command",{detail:{type:"select-entity",uuid:t},bubbles:!0,composed:!0}))}}t.default=o},9495:function(e,t,n){var i=this&&this.__decorate||function(e,t,n,i){var r,o=arguments.length,a=o<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,n):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,i);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(a=(o<3?r(a):o>3?r(t,n,a):r(t,n))||a);return o>3&&a&&Object.defineProperty(t,n,a),a},r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const o=n(3247),a=n(1761),s=r(n(8588));let l=class extends o.LitElement{constructor(){super(),this.graph={},this.scenes=[],this.activeScene=null,this.activeEntity="scene",this.app={},this.onRefreshClick=this.onRefreshClick.bind(this),this.onTreeItemSelect=this.onTreeItemSelect.bind(this),this.onContentUpdate=this.onContentUpdate.bind(this)}connectedCallback(){super.connectedCallback(),this.addEventListener("tree-item-select",this.onTreeItemSelect)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("tree-item-select",this.onTreeItemSelect)}render(){if(!this.scenes)return o.html`<div></div>`;let e;return this.graph&&this.activeScene&&(e=this.createSceneGraphNode(this.graph,this.activeScene,this.activeEntity)),o.html`
    <style>
      :host {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        overflow-x: hidden;
      }
      :host > tree-item {
        flex: 1;
        overflow-y: auto;
        overflow-x: hidden;
      }
      :host > tree-item:focus {
        /* TODO how can focus be shown in the tree view? */
        outline: none;
      }
      ${s.default}
    </style>
    <title-bar title="Scene">
      // when a scene is selected, map it?
      <select @change="${this.onSceneSelect}" class="chrome-select">
        ${this.scenes.map((e=>o.html`<option value="${e.uuid}" title="${e.uuid}">${e.name||e.uuid}</option>`))}
      </select>
      // create a button to refresh the display
      <devtools-icon-button icon="refresh" @click="${this.onRefreshClick}">
    </title-bar>
    // render the scene graph node
    ${e}
    `}createSceneGraphNode(e,t,n,i=0){const r=e[t];return o.html`
    <tree-item
      // to give nodes a "nested" appearance
      tabindex="${0===i?0:""}"
      // unique id tag
      unique="${r.uuid}"
      // if depth is 0, this is the root
      ?root="${0===i}"
      // if this is selected, mark it as selected
      ?selected="${r.uuid&&n&&n===r.uuid}"
      // if the obj is a scene in and of itself, mark it as open
      ?open="${"Scene"===r.baseType}"
      // display an arrow if the obj has children
      ?show-arrow="${r.children.length>0}"
      depth="${i}"
      uuid="${r.uuid}"
    >
      <div slot="content">${(0,a.getEntityName)(r)}</div>
      // map children nodes out and create additional nested nodes for them
      ${r.children.map((t=>this.createSceneGraphNode(e,t,n,i+1)))}
    </tree-item>
    `}onRefreshClick(e){this.activeScene&&this.dispatchEvent(new CustomEvent("command",{detail:{type:"refresh"},bubbles:!0,composed:!0}))}onSceneSelect(e){this.dispatchEvent(new CustomEvent("command",{detail:{type:"select-scene",uuid:e.target.value},bubbles:!0,composed:!0}))}onContentUpdate(e){"scene"===this.app.content.getEntityCategory(e.detail.uuid)&&this.requestUpdate()}onTreeItemSelect(e){e.stopPropagation();const t=e.composedPath()[0].getAttribute("uuid");this.dispatchEvent(new CustomEvent("command",{detail:{type:"select-entity",uuid:t},bubbles:!0,composed:!0}))}};i([(0,o.property)({type:Object})],l.prototype,"graph",void 0),i([(0,o.property)({type:Array})],l.prototype,"scenes",void 0),i([(0,o.property)({type:String})],l.prototype,"activeScene",void 0),i([(0,o.property)({type:String})],l.prototype,"activeEntity",void 0),i([(0,o.property)({type:Object})],l.prototype,"app",void 0),l=i([(0,o.customElement)("scene-view-element")],l),t.default=l},3444:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0});const i=n(3247);class r extends i.LitElement{render(){return i.html`
      <style>
        /**
         * Current CSS API:
         * var(--title-color)
         * var(--title-background-color)
         */
        :host {
          height: 22px;
          display: flex;
          color: var(--title-color);
          background-color: var(--title-background-color);
          line-height: 15px;
          white-space: nowrap;
          align-items: center;
          overflow: hidden;
        }
        #title {
          text-overflow: ellipsis;
          padding: 2px 0.8em;
          flex: 1;
        }
        ::slotted(*) {
          display: inline-block;
        }
      </style>
      <slot></slot>
    `}}t.default=r},2423:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0});const i=n(3247);class r extends i.LitElement{constructor(){super(...arguments),this.title=""}render(){return i.html`
    <style>
      /**
       * Current CSS API:
       * var(--title-color)
       * var(--title-background-color)
       * var(--title-border-color)
       */
      :host {
        height: 22px;
        display: flex;
        color: var(--title-color);
        background-color: var(--title-background-color);
        border-bottom: 1px solid var(--title-border-color);
        line-height: 15px;
        white-space: nowrap;
        align-items: center;
        overflow: hidden;
      }
      #title {
        text-overflow: ellipsis;
        padding: 2px 0.8em;
        flex: 1;
      }
      ::slotted(*) {
        display: inline-block;
      }
    </style>
    <span id="title">
    ${this.title}
    </span>
    <slot></slot>
  `}}t.default=r},8588:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.default="\n/*\n * Styling taken from css/inspectorCommon.css from chrome devtools\n */\nselect {\n  /* Form elements do not automatically inherit font style from ancestors. */\n  font-family: inherit;\n  font-size: inherit;\n}\n  .chrome-select {\n    -webkit-appearance: none;\n    -webkit-user-select: none;\n    border: 1px solid rgba(0, 0, 0, 0.2);\n    border-radius: 2px;\n    color: #333;\n    font: inherit;\n    margin: 0;\n    outline: none;\n    padding-right: 20px;\n    padding-left: 6px;\n    background-image: -webkit-image-set(url('assets/chromeSelect.png') 1x, url('assets/chromeSelect_2x.png') 2x);\n    background-color: hsl(0, 0%, 98%);\n    background-position: right center;\n    background-repeat: no-repeat;\n    min-height: 24px;\n    min-width: 16px;\n    background-size: 15px;\n  }\n  .chrome-select:enabled:active,\n  .chrome-select:enabled:focus,\n  .chrome-select:enabled:hover {\n    background-color: hsl(0, 0%, 96%);\n    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);\n  }\n  .chrome-select:enabled:active {\n    background-color: #f2f2f2;\n  }\n  .chrome-select:enabled:focus {\n    border-color: transparent;\n    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1), 0 0 0 2px rgba(66, 133, 244, 0.4);\n  }\n  .chrome-select:disabled {\n    opacity: 0.38;\n  }\n  .chrome-select optgroup,\n  .chrome-select option {\n    background-color: #EEEEEE;\n    color: #222;\n  }\n"},3557:function(e,t,n){var i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const r=n(3247),o=n(9476),a=i(n(7006)),s=i(n(8588));class l extends r.LitElement{constructor(){super(),this.type="",this.value=null,this.onInput=this.onInput.bind(this)}onInput(e){const t=+[...e.target.querySelectorAll("option")].filter((e=>e.selected))[0].value;null!==t&&this.dispatchEvent(new CustomEvent("change",{detail:{value:t},bubbles:!0,composed:!0}))}render(){if(!o.ConstantTypes[this.type])return r.html`<input type="number" value="${this.value}" />`;const e=o.ConstantTypes[this.type].map(((e,t)=>{let n;if(n=a.default[e],"null"===e&&(n=-1),"number"!=typeof n)throw new Error(`invalid constant value for ${e}`);const i=void 0===this.value?0===t:this.value===n;return r.html`<option value="${n}" .selected="${i}">${e}</option>`}));return r.html`
      <style>
        :host {
          display: flex;
        }
      ${s.default}
      </style>
      <select class="chrome-select" @input="${this.onInput}">${e}</select>
    `}}t.default=l},8124:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0});const i=n(3247),r=n(1761),o=document.createElement("a");let a=0;class s extends i.LitElement{constructor(){super(),this.value="",this._id="key-value-element-"+a++,this.precision=1,this.step=1,this.min=-1/0,this.max=1/0}onDataURLClick(e){try{let e=JSON.stringify(this.value,null,2),t=new Blob([e],{type:"application/json"}),n=window.URL.createObjectURL(t);o.setAttribute("href",n),o.setAttribute("target","_window"),o.click(),window.URL.revokeObjectURL(n)}catch(e){}e.preventDefault()}onDependencyClick(e){const t=e.composedPath()[0].getAttribute("data-uuid");null!==t&&this.dispatchEvent(new CustomEvent("command",{detail:{type:"select-entity",uuid:t},bubbles:!0,composed:!0}))}onChange(e){const t=e.composedPath()[0];let n=null,i=null,o=this.property;switch(this.type){case"color":n=t.value?(0,r.cssStringToHexNumber)(t.value):0,i="color";break;case"boolean":n=!!t.checked,i="boolean";break;case"number":case"radians":i="number",n=t.value;break;case"enum":i="number",n=e.detail.value;break;case"vec2":case"vec3":case"vec4":i=this.type,n=e.detail.value,o=`${this.property}.${t.getAttribute("axis")}`;break;default:n=t.value}null!==n&&this.dispatchEvent(new CustomEvent("command",{detail:{type:"update-property",uuid:this.uuid,property:o,dataType:i,value:n},bubbles:!0,composed:!0}))}render(){let e;if(null===this.value)e=i.html``;else if(this.readOnly)e=this.value;else switch(this.type){case"array":e=this.value?i.html`
              <a href="#" @click=${e=>this.onDataURLClick(e)}>
                array
              </a>
            `:i.html`[]`;break;case"enum":let t=this.enumType||this.property;e=i.html`<enum-value .uuid="${this.uuid}" .type="${t}" .value="${this.value}"></enum-value>`;break;case"vec2":case"vec3":case"vec4":const n="vec2"===this.type?2:"vec3"===this.type?3:4;e=[...new Array(n)].map(((e,t)=>{i.html`<number-input
              .id="${0===t?this._id:""}"
              axis="${0===t?"x":1===t?"y":2===t?"z":"w"}"
              .value="${this.value[t]}"
              .min="${this.min}"
              .max="${this.max}"
              .step="${this.step}"
              .precision="${this.precision}"
            />`}));break;case"image":case"texture":case"material":case"geometry":if(this.data){const t=(0,r.getEntityName)(this.data);e=i.html`<div class="badge" data-uuid="${this.value}" @click="${this.onDependencyClick}">${t}</div>`}break;case"color":e=i.html`<input id="${this._id}" type="color" .value="${(0,r.hexNumberToCSSString)(+this.value)}" />`;break;case"boolean":e=i.html`<input id="${this._id}" type="checkbox" .checked="${this.value}" />`;break;case"number":case"int":case"angle":e=i.html`<number-input
            .id="${this._id}"
            .value="${this.value}"
            .min="${this.min}"
            .max="${this.max}"
            .step="${this.step}"
            .precision="${this.precision}"
          />`;break;default:e=this.value}return i.html`
      <style>
        /**
         * Current CSS API:
         *
         * --key-value-height: auto; // Yes can be styled by parent, but this ensures
         *                           // that all views use the same height
         * --key-value-divider-position: 30%;
         * --key-value-padding-left: 10px;
         */
        :host {
          height: var(--key-value-height, auto);
          width: 100%;
          display: flex;
          align-items: center;
        }
        label {
          flex: 0 0 var(--key-value-divider-position, 30%);
        }
        #value {
          flex: 1;
        }
        label, #value {
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          padding-left: var(--key-value-padding-left, 10px);
        }
        #value 
        #value[type="vec4"] number-input {
          width: 25%;
        }
        #value[type="vec3"] number-input {
          width: 33%;
        }
        #value[type="vec2"] number-input {
          width: 50%;
        }
        .badge {
          background-color: var(--tab-selected-bg-color);
          padding: 1px 5px;
        }
      </style>
      <label title="${this.keyName}" for="${this._id}">${this.keyName}</label>
      <div name="${this.keyName}" @change="${this.onChange}" id="value" type="${this.type}">
        ${e}
      </div>
    `}}t.default=s},2679:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0});const i=n(3247),r=n(1761);class o extends i.LitElement{onActivate(e){this.app.dispatchEvent(new CustomEvent("select-entity",{detail:{uuid:this.uuid}}))}render(){const e=this.material;if(!e)return null;const t=e.color?(0,r.hexNumberToCSSString)(e.color):"white";return i.html`
    <style>
      :host {
        cursor: pointer;
      }
      .wrapper {
        height: auto;
        width: 100%;
        display: flex;
      }
      #icon {
        flex: 0 0 10px;
        height: 10px;
        width: 10px;
        border: 1px solid black;
      }
      #name {
        padding-left: 10px;
        flex: 1;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    </style>
    <div class="wrapper" @click="${this.onActivate}">
      <div id="icon" style="background-color:${t}"></div>
      <div id="name">${e.type}</div>
    </div>
    `}}t.default=o},7400:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0});const i=n(3247);n(1761);class r extends i.LitElement{onActivate(e){this.app.dispatchEvent(new CustomEvent("select-entity",{detail:{uuid:this.uuid}}))}render(){return null}}t.default=r},8600:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0});const i=n(3247);class r extends i.LitElement{constructor(){super(...arguments),this.open=!0}render(){return i.html`
  <style>
    :host {
      width: 100%;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      line-height: 15px;
      white-space: nowrap;
      align-items: center;
      overflow: hidden;
    }

    .row{
      display: flex;
      flex: 1;
      width: 100%;
      align-items: center;
      padding-left: 4px;
      color: var(--title-color);
      background-color: var(--title-background-color);
      border-bottom: 1px solid var(--title-border-color);
    }

    .arrow{
      height: 14px;
      width: 14px;
      flex: 0 1 14px;
      background-color: transparent;
      border: 0;
      padding: 0;
      position: relative;
      pointer-events: none;
    }

    .arrow:focus{
      outline: none;
    }

    .arrow::after{
      content: '▸';
      font-size: 14px;
      color: rgb(110, 110, 110);
      display: none;
      pointer-events: auto;
      transform: translateY(-2px)
    }

    .arrow::after {
      display: block;
    }

    :host([open]) .arrow::after{
      transform: rotate(90deg);
    }

    slot[name=content] {
      text-overflow: ellipsis;
      padding: 2px 0.8em;
      flex: 1;
    }

    #children {
      display: none;
      width: 100%;
    }

    :host([open]) #children {
      display: block;
    }

  </style>
    <div class="row"
      click="${this.onClick}">
      <button class="arrow" click="${this.onVisibilityToggle}"></button>
      <slot name="content"></slot>
    </div>
    <slot id="children"></slot>  
  </div>
  `}onVisibilityToggle(e){e.stopPropagation(),this.open=!this.open}onClick(e){e.stopPropagation(),this.open=!this.open}}t.default=r},307:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0});const i=n(3247);class r extends i.LitElement{render(){return i.html`
<style>
    :host {
      font-size: 13px;
      color: rgb(110, 110, 110);
      min-width: 28px;
      height: 26px;
      border: 1px solid rgb(221, 221, 221);
      background-color: rgb(243, 243, 243);

      cursor: pointer;
      display: flex;
      align-items: center;
      padding: 0 10px;
    }
</styles>
<slot></slot>
    `}}t.default=r},2776:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0});const i=n(3247);class r extends i.LitElement{render(){return i.html`
<style>
  :host {
    color: inherit;
    flex: 0;
    cursor: pointer;
    display: flex;
    align-items: center; 
  }

  :host > button {
    border: none;
    background-color: transparent;
    padding: 0;
  }

  :host > button:focus {
    outline-width: 0;
  }

  :host > button:enabled:hover:not(:active) > * {
    background-color: var(--tab-selected-fg-color);
  }

</style>
<button>
  <devtools-icon icon="${this.icon}"></devtools-icon>
</button>      
    `}}t.default=r},4703:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0});const i=n(3247);class r extends i.LitElement{render(){return i.html`
<style>
    :host {
      font-size: 13px;
      color: rgb(110, 110, 110);
      min-width: 28px;
      height: 26px;
      border: 1px solid rgb(221, 221, 221);
      background-color: rgb(243, 243, 243);

      cursor: pointer;
      display: flex;
      align-itmes: center;
      padding: 0 10px;
    }
</styles>
<slot></slot>
    `}}t.default=r},7359:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0});const i=n(3247);class r extends i.LitElement{constructor(){super(...arguments),this.icon="",this.fill=!0}render(){const e=`${this.icon}${this.fill?"":"-outline"}`;return i.html`
<link rel="stylesheet" href="styles/fontawesome.css">
<style>
:host {
  display: inline-block;
  flex-shrink: 0;
  padding: 4px 8px;
}

:host([active]) {
  color: var(--selection-fg-color);
  background-color: var(--selection-bg-color);
}
i {
  font-size: 16px
}
</style>
<i class="fa fa-${e}"></i>
    `}}t.default=r},2198:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0});const i=n(3247);Symbol("onActivate");class r extends i.LitElement{constructor(){super(),this.distance=0,this.onMouseDownValue=0,this.min=-1/0,this.max=1/0,this.value=0,this.precision=3,this.step=1,this.onMouseMove=this.onMouseMove.bind(this),this.onMouseUp=this.onMouseUp.bind(this)}firstUpdated(){this.distance=0,this.onMouseDownValue=0,this.prevPointer=[0,0],this.input=this.shadowRoot.querySelector("input"),this.setValue(this.value),this.onBlur()}onMouseMove(e){const t=parseFloat(this.value),n=[e.clientX,e.clientY],i=n[0]-this.prevPointer[0]-(n[1]-this.prevPointer[1]);if(this.distance+=i,Math.abs(i)<=2)return;let r=this.onMouseDownValue;const o=e.shiftKey?10:1;r=Math.round(this.distance/2)*o*this.step,r+=t,r=Math.min(this.max,Math.max(this.min,r)),t!==r&&this.setValue(r),this.prevPointer=[e.clientX,e.clientY]}onMouseDown(e){e.preventDefault(),this.distance=0,this.onMouseDownValue=this.value,this.prevPointer=[e.clientX,e.clientY],document.addEventListener("mousemove",this.onMouseMove,!1),document.addEventListener("mouseup",this.onMouseUp,!1)}onMouseUp(e){document.removeEventListener("mousemove",this.onMouseMove,!1),document.removeEventListener("mouseup",this.onMouseUp,!1),Math.abs(this.distance)<2&&(this.input.focus(),this.input.select())}setValue(e){e!==this.value&&void 0!==e&&((e=0===this.precision?parseInt(e):parseFloat(e))<this.min&&(e=this.min),e>this.max&&(e=this.max),this.value=e,this.dispatchEvent(new CustomEvent("change",{detail:{value:parseFloat(e.toFixed(5))},bubbles:!0,composed:!0})))}shouldUpdate(e){return e.has("value")&&(e.get("value"),this.value),!0}onBlur(){this.setValue(parseFloat(this.input.value))}onChange(e){this.setValue(e.target.value)}onKeyDown(e){if(e.stopPropagation(),13===e.keyCode)return this.setValue(parseFloat(this.input.value)),void this.input.blur();38!==e.keyCode?40!==e.keyCode||this.setValue(parseFloat(this.value)-this.step):this.setValue(parseFloat(this.value)+this.step)}render(){const e=this.value.toFixed(this.precision);return i.html`
<style>
:host {
  display: inline-block;
}

input{
  width: 100%;
}
</style>
<input
  type="text"
  .value=${e}
  @keydown=${this.onKeyDown}
  @change=${this.onChange}
  @mousedown=${this.onMouseDown}
  @focus=${this.onfocus} 
  @blur=${this.onBlur}
/>    
    `}}t.default=r},7198:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0});const i=n(3247),r=["ArrowRight","ArrowLeft","ArrowUp","ArrowDown"];class o extends i.LitElement{constructor(){super(),this.onKeyDown=this.onKeyDown.bind(this),this.unique="",this.open=!1,this.showArrow=!1,this.depth=0,this.root=!1,this.selected=!1,this.listening=!1,this.connected=!1}connectedCallback(){super.connectedCallback(),this.connected=!0,this.addListeners()}disconnectedCallback(){this.removeListeners(),this.connected=!1,super.disconnectedCallback()}shouldUpdate(e){return e.has("root")&&(this.root?this.addListeners():this.removeListeners()),!0}getTreeItemChildren(){if(this.shadowRoot){const e=this.shadowRoot.querySelector("#children");if(e)return e.assignedElements()}}getSelected(){if(!this.root)return void console.warn("Must be called on root");const e=[this];for(let t of e){if(t.selected)return t;e.push(...t.getTreeItemChildren())}}select(){this.dispatchEvent(new CustomEvent("tree-item-select",{detail:{},bubbles:!0,composed:!0}))}onKeyDown(e){if(-1===r.indexOf(e.key))return;const t=this.getSelected();if(!t)return;const n=t.open;let i=t.parentElement,o=i?i.nextElementSibling:null,a=t.getTreeItemChildren(),s=t.nextElementSibling,l=t.previousElementSibling,p=null;if(i&&i.getTreeItemChildren||(i=null),o&&i.getTreeItemChildren||(o=null),s&&s.getTreeItemChildren||(s=null),l&&l.getTreeItemChildren||(l=null),l){const e=l.getTreeItemChildren();p=e.length?e[e.length-1]:null}let d=null;switch(e.key){case"ArrowLeft":n&&a.length?t.open=!1:i&&(d=i);break;case"ArrowRight":n&&a.length?d=a[0]:!n&&a.length&&(t.open=!0);break;case"ArrowDown":n&&a.length?d=a[0]:s?d=s:o&&(d=o);break;case"ArrowUp":l?d=l.open&&p?p:l:i&&(d=i)}d&&(e.preventDefault(),d.select())}onArrowClick(e){this.getTreeItemChildren().length&&(e.stopPropagation(),this.open=!this.open)}onClick(e){e.stopPropagation(),this.select()}onDoubleClick(e){e.stopPropagation(),this.open=!this.open}onTreeItemSelect(e){if(!this.root)return;const t=e.composedPath()[0],n=this.getSelected();t!==n?(n&&(n.selected=!1),t.focus()):e.stopPropagation()}addListeners(){this.root&&this.connected&&!this.listening&&(this.addEventListener("keydown",this.onKeyDown),this.addEventListener("tree-item-select",this.onTreeItemSelect),this.listening=!0)}removeListeners(){this.removeEventListener("keydown",this.onKeyDown),this.removeEventListener("tree-item-select",this.onTreeItemSelect),this.listening=!1}render(){return this.unique||console.warn("TreeItemElement's 'unique' attribute not set."),i.html`
<style>
  /**
   * Current CSS API:
   * --tree-item-indent-per-level: 10px
   * --tree-item-row-height: 20px
   * --tree-item-arrow-width: 24px
   * --tree-item-border-color
   * --tree-item-hover-color
   * --tree-item-hover-background-color
   * --tree-item-selected-color
   * --tree-item-selected-background-color
   */
  
  :host {
    height: auto;
    width: 100%
    display: block;
    cursor: pointer;
  }
  :host([depth]){
    border-top: 1px solid var(--tree-item-border-color);
  }
  :host([depth="0"]), :host([depth="-1"]){
    border: 0;
  }
  :host([depth="0"]) #children {
    border-bottom: 1px solid var(--tree-item-border-color);
  }

  .row {
    display: flex;
    height: var(--tree-item-row-height, 20px);
    width: 100%;
    align-items: center;
    padding-left: calc(var(--depth, 0) * var(--tree-item-indent-per-level, 10px));
  }

  :host([depth="-1"]) .row {
    display: none;
  }

  .row:hover {
    color: var(--tree-item-hover-color);
    background-color: var(--tree-item-hover-background-color);
  }

  :host([selected]) .row{
    color: var(--tree-item-selected-color);
    background-color: var(--tree-item-selected-background-color);
  }

  :host([selected]) .row:hover {
    color: var(--tree-item-hover-selected-color);
    background-color: var(--tree-item-hover-selected-background-color);
  }

  .arrow-block {
    height: 100%;
    flex: 0 0 var(--tree-item-arrow-width, 24px);
    background-color: transparent;
    border: 0;
    padding: 0;
    position: relative;
  }

  .arrow {
    pointer-events: none;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 3px 0 3px 6px;
    border-color: transparent transparent transparent var(--title-color);
    display: none;
    position: absolute;
    top: 50%
    left: 50%
    transform: translate(-50%, -50%);
  }

  :host([show-arrow]) .arrow{
    display: inline-block;
  }
  :host([open]) .arrow {
    transform: translate(-50%, -50%) rotate(90deg);
  }
  :host([selected]) .arrow {
    border-color: transparent transparent transparent var(--tree-item-selected-color);
  }

  slow[name=content] {
    flex: 1;
  }

  #children{
    display: none;
  }

  :host([open]) #children {
    display: block;
  }
</style>
<div class="row"
  style="--depth:${this.depth||0}"
  @click="${this.onClick}"
  @dblclick="${this.onDoubleClick}">
  <div class="arrow-block" @click="${this.onArrowClick}"> 
    <div class="arrow"></div>
  </div>
  <slot name="content"></slot>
</div>
<slot id="children"></slot> 
  `}}t.default=o},9476:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.ConstantTypes=t.ObjectTypes=t.MaterialTypes=void 0,t.MaterialTypes=["Material","LineBasicMaterial","LineDashedMaterial","MeshBasicMaterial","MeshDepthMaterial","MeshDistanceMaterial","MeshLambertMaterial","MeshMatcapMaterial","MeshNormalMaterial","MeshPhongMaterial","MeshPhysicalMaterial","MeshStandardMaterial","MeshToonMaterial","PointsMaterial","RawShaderMaterial","ShaderMaterial","ShadowMaterial","SpriteMaterial"],t.ObjectTypes=["Mesh","Line","LineLoop","LineSegments","AmbientLight","DirectionalLight","HemisphereLight","PointLight","RectAreaLight","SpotLight","ArrowHelper","AxesHelper","BoxHelper","Box3Helper","CameraHelper","DirectionalLightHelper","FaceNormalsHelper","GridHelper","PolarGridHelper","PositionalAudioHelper","HemisphereLightHelper","PlaneHelper","PointLightHelper","RectAreaLightHelper","SkeletonHelper","SpotLightHelper","VertexNormalsHelper","Skeleton","Bone","Group"];const n={mapping:["UVMapping","CubeReflectionMapping","CubeRefractionMapping","EquirectangularReflectionMapping","EquirectangularRefractionMapping","SphericalReflectionMapping","CubeUVReflectionMapping","CubeUVRefractionMapping"],drawMode:["TrianglesDrawMode","TriangleStripDrawMode","TriangleFanDrawMode"],side:["FrontSide","BackSide","DoubleSide"],colors:["NoColors","FaceColors","VertexColors"],blending:["NormalBlending","NoBlending","AdditiveBlending","SubtractiveBlending","MultiplyBlending","CustomBlending"],blendEquation:["AddEquation","SubtractEquation","ReverseSubtractEquation","MinEquation","MaxEquation"],blendDst:["OneMinusSrcAlphaFactor","ZeroFactor","OneFactor","SrcColorFactor","OneMinusSrcColorFactor","SrcAlphaFactor","DstAlphaFactor","OneMinusDstAlphaFactor","DstColorFactor","OneMinusDstColorFactor"],blendSrc:["OneMinusSrcAlphaFactor","ZeroFactor","OneFactor","SrcColorFactor","OneMinusSrcColorFactor","SrcAlphaFactor","DstAlphaFactor","OneMinusDstAlphaFactor","DstColorFactor","OneMinusDstColorFactor","SrcAlphaSaturateFactor"],depthFunc:["LessEqualDepth","NeverDepth","AlwaysDepth","LessDepth","GreaterEqualDepth","GreaterDepth","NotEqualDepth"],combine:["MultiplyOperation","MixOperation","AddOperation"],vertexColors:["NoColors","VertexColors","FaceColors"],normalMapType:["TangentSpaceNormalMap","ObjectSpaceNormalMap"],encoding:["LinearEncoding","sRGBEncoding","GammaEncoding","RGBEEncoding","LogLuvEncoding","RGBM7Encoding","RGBM16Encoding","RGBDEncoding","BasicDepthPacking","RGBADepthPacking"],format:["RGBAFormat","AlphaFormat","RGBFormat","LuminanceFormat","LuminanceAlphaFormat","RGBEFormat","DepthFormat","DepthStencilFormat"],type:["UnsignedByteType","ByteType","ShortType","UnsignedShortType","IntType","UnsignedIntType","FloatType","HalfFloatType","UnsignedShort4444Type","UnsignedShort5551Type","UnsignedShort565Type","UnsignedInt248Type"],wrapping:["ClampToEdgeWrapping","RepeatWrapping","MirroredRepeatWrapping"],magFilter:["LinearFilter","NearestFilter"],minFilter:["LinearMipMapLinearFilter","NearestFilter","NearestMipMapNearestFilter","NearestMipMapLinearFilter","LinearFilter","LinearMipMapNearestFilter"],toneMapping:["NoToneMapping","LinearToneMapping","ReinhardToneMapping","Uncharted2ToneMapping","CineonToneMapping","ACESFilmicToneMapping"],shadowMap:["BasicShadowMap","PCFShadowMap","PCFSoftShadowMap","VSMShadowMap"]};t.ConstantTypes=n,n.shadowSide=n.side,n.blendSrcAlpha=["null",...n.blendSrc],n.blendDstAlpha=["null",...n.blendDst],n.blendEquationAlpha=["null",...n.blendEquation],n.depthPacking=[...n.encoding],n.depthPacking[n.depthPacking.indexOf("BasicDepthPacking")]=n.depthPacking[0],n.depthPacking[0]="BasicDepthPacking"},1303:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0});const n=e=>{const t=e.data&&e.data.attributes;if(t)return{name:"Attributes",type:"group",props:Object.keys(t).map((e=>({name:e,type:"array",prop:`data.attributes.${e}`})))}},i={type:"geometry",props:[{name:"Vertices",type:"array",prop:"data.vertices"},{name:"Colors",type:"array",prop:"colors"},{name:"Faces",type:"array",prop:"faces"},{name:"Faces Vertex UVs",type:"array",prop:"faceVertexUvs"},{name:"Morph Targets",type:"array",prop:"morphTargets"},{name:"Morph Normals",type:"array",prop:"morphNormals"},{name:"Skin Weights",type:"array",prop:"skinWeights"},{name:"Skin Indices",type:"array",prop:"skinIndices"},{name:"Line Distances",type:"array",prop:"faceVertexUvs"}]},r=[{name:"Index",type:"attribute",prop:"data.index"},{name:"Groups",type:"array",prop:"data.groups"},{name:"Morph Targets Relative",type:"boolean",prop:"data.morphTargetsRelative",default:!1}],o={type:"geometry",props:[...r],BufferAttributes:n},a={BufferGeometry:o,Geometry:i,InstancedBufferGeometry:{type:"geometry",props:[...r,{name:"Instance Count",type:"int",prop:"instanceCount"}],BufferAttributes:n},BoxBufferGeometry:o,BoxGeometry:i,CircleBufferGeometry:o,CircleGeometry:i,ConeBufferGeometry:o,ConeGeometry:i,CylinderBufferGeometry:o,CylinderGeometry:i,DodecahedronBufferGeometry:o,DodecahedronGeometry:i,EdgesGeometry:i,ExtrudeBufferGeometry:o,ExtrudeGeometry:i,IcosahedronBufferGeometry:o,IcosahedronGeometry:i,LatheBufferGeometry:o,LatheGeometry:i,OctahedronBufferGeometry:o,OctahedronGeometry:i,ParametricBufferGeometry:o,ParametricGeometry:i,PlaneBufferGeometry:o,PlaneGeometry:i,PolyhedronBufferGeometry:o,PolyhedronGeometry:i,RingBufferGeometry:o,RingGeometry:i,ShapeBufferGeometry:o,ShapeGeometry:i,SphereBufferGeometry:o,SphereGeometry:i,TetrahedronBufferGeometry:o,TetrahedronGeometry:i,TextBufferGeometry:o,TextGeometry:i,TorusBufferGeometry:o,TorusGeometry:i,TorusKnotBufferGeometry:o,TorusKnotGeometry:i,TubeBufferGeometry:o,TubeGeometry:i,WireframeGeometry:i};t.default=a},7907:function(e,t,n){var i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const r=i(n(9164)),o=i(n(3764)),a=[{name:"Color",prop:"color",type:"color"},{name:"Intensity",prop:"intensity",type:"number"}],s=[r.default,o.default],l={name:"Cast Shadow",prop:"castShadow",type:"boolean",default:!1},p={name:"Target",prop:"target",type:"vec3"},d={name:"Decay",prop:"decay",type:"number",default:1},c={name:"Distance",prop:"distance",type:"number",default:0},h={name:"Power",prop:"power",type:"number",default:4*Math.PI},u={type:"light",props:[...a,...s]},m={Light:u,AmbientLight:u,DirectionalLight:{type:"object",props:[...a,l,p,...s]},HemisphereLight:{type:"object",props:[...a,l,{name:"Ground Color",prop:"groundColor",type:"color"},...s]},PointLight:{type:"object",props:[...a,l,d,c,h,...s]},RectAreaLight:{type:"object",props:[...a,l,{name:"Width",prop:"width",type:"number"},{name:"Height",prop:"height",type:"number"},...s]},SpotLight:{type:"object",props:[...a,l,{name:"Angle",prop:"angle",type:"angle",default:Math.PI/3,min:0,max:Math.PI/2},d,c,h,{name:"Penumbra",prop:"penumbra",type:"number",default:0,min:0,max:1},p,...s]}};t.default=m},8434:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.default={name:"Blending",type:"group",props:[{name:"Blending",prop:"blending",type:"enum"},{name:"Alpha Test",prop:"alphaTest",type:"number",default:0},{name:"Source",prop:"blendSrc",type:"enum"},{name:"Source Alpha",prop:"blendSrcAlpha",type:"enum",default:0},{name:"Destination",prop:"blendDst",type:"enum"},{name:"Destination Alpha",prop:"blendDstAlpha",type:"enum",default:0},{name:"Blend Equation",prop:"blendEquation",type:"enum"},{name:"Blend Equation Alpha",prop:"blendEquationAlpha",type:"enum",default:0},{name:"Premultiplied Alpha",prop:"premultipliedAlpha",type:"boolean",default:!1}]}},542:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.default={name:"Properties",type:"group",props:[{name:"Side",prop:"side",type:"enum",default:0},{name:"Transparent",prop:"transparent",type:"boolean",default:!1},{name:"Visible",prop:"visible",type:"boolean",default:!0},{name:"Opacity",prop:"opacity",type:"number",min:0,max:1,default:1},{name:"Color Write",prop:"colorWrite",type:"boolean",default:!0},{name:"Depth Func",prop:"depthFunc",type:"enum"},{name:"Depth Test",prop:"depthTest",type:"boolean",default:!0},{name:"Depth Write",prop:"depthWrite",type:"boolean",default:!0},{name:"Lights",prop:"lights",type:"boolean",default:!1},{name:"Flat Shading",prop:"flatShading",type:"boolean",default:!1},{name:"Fog",prop:"fog",type:"boolean",default:!1},{name:"Dithering",prop:"dithering",type:"boolean",default:!1},{name:"Clip Intersection",prop:"clipIntersection",type:"boolean",default:!1},{name:"Clip Shadows",prop:"clipShadows",type:"boolean",default:!1},{name:"Shadow Side",prop:"shadowSide",type:"enum",default:0},{name:"Tone Mapped",prop:"toneMapped",type:"boolean",default:!0},{name:"Vertex Colors",prop:"vertexColors",type:"enum"},{name:"Vertex Tangents",prop:"vertexTangents",type:"boolean",default:!1}]}},2582:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.lineDashed=t.line=void 0,t.line={name:"Line Width",type:"number",prop:"linewidth",default:1},t.lineDashed=[{name:"Dash Size",type:"number",prop:"dashSize",default:3},{name:"Dash Scale",type:"number",prop:"scale",default:1},{name:"Gap Size",type:"number",prop:"gapSize",default:1}]},4636:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.clearCoat=t.roughness=t.metalness=void 0,t.metalness={type:"group",name:"Metalness",props:[{name:"Map",type:"texture",prop:"metalnessMap"},{name:"Metalness",type:"number",prop:"metalness",min:0,max:1}]},t.roughness={type:"group",name:"Roughness",props:[{name:"Roughness Map",type:"texture",prop:"roughnessMap"},{name:"Roughness",type:"number",prop:"roughness",min:0,max:1}]},t.clearCoat={type:"group",name:"Clear Coat",props:[{name:"Clear Coat",type:"number",prop:"clearCoat",min:0,max:1,default:0},{name:"Clear Coat Roughness",type:"number",prop:"clearCoatRoughness",min:0,max:1,default:0}]}},5684:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.default={type:"group",name:"Polygon Offset",props:[{name:"Enabled",type:"boolean",prop:"polygonOffset",default:!1},{name:"Offset Factor",type:"int",prop:"polygonOffsetFactor",default:0},{name:"Offset Units",type:"int",prop:"polygonOffsetUnits",default:0}]}},1373:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.emissive=t.point=t.rotation=t.sizeAttenuation=t.wireframe=t.clipping=t.specular=t.specularMap=t.skinning=t.refractionRatio=t.reflectivity=t.morphTargets=t.morphNormals=t.lightMap=t.envMapIntensity=t.envMap=t.ao=t.diffuseMap=t.displacement=t.distance=t.bumpMap=t.normalMap=t.matcap=t.alphaMap=t.depthPacking=t.combine=t.gradientMap=t.color=void 0,t.color={name:"Color",prop:"color",type:"color"},t.gradientMap={name:"Gradient Map",prop:"gradientMap",type:"texture"},t.combine={name:"Combine",prop:"combine",type:"enum"},t.depthPacking={name:"Depth Packing",prop:"depthPacking",type:"enum"},t.alphaMap={name:"Alpha Map",prop:"alphaMap",type:"texture"},t.matcap={name:"matcap",prop:"matcap",type:"texture"},t.normalMap={type:"group",name:"Normal Map",props:[{name:"Map",type:"texture",prop:"normalMap"},{name:"Scale",type:"vec2",prop:"normalScale",default:[1,1]},{name:"Type",type:"enum",prop:"normalMapType"}]},t.bumpMap={type:"group",name:"Bump Map",props:[{name:"Map",type:"texture",prop:"bumpMap"},{name:"Scale",type:"texture",prop:"bumpScale",default:1}]},t.distance={name:"Distance",type:"group",props:[{name:"referencePosition",prop:"referencePosition",type:"vec3"},{name:"Near Distance",prop:"nearDistance",type:"number"},{name:"Far Distance",prop:"farDistance",type:"number"}]},t.displacement={type:"group",name:"Displacement Map",props:[{name:"Map",type:"texture",prop:"displacementMap"},{name:"Scale",type:"number",prop:"displacementScale",min:0,default:1},{name:"Bias",type:"number",prop:"displacementBias",min:0,default:0}]},t.diffuseMap={name:"Diffuse Map",prop:"map",type:"texture"},t.ao={name:"Ambient Occlusion",type:"group",props:[{name:"Map",prop:"aoMap",type:"texture"},{name:"Intensity",prop:"aoMapIntensity",type:"number",min:0,default:1}]},t.envMap={name:"Environment Map",type:"texture",prop:"envMap"},t.envMapIntensity={name:"Environment Intensity",type:"number",prop:"envMapIntensity",default:1,min:0},t.lightMap={name:"Light Map",type:"group",props:[{name:"Map",prop:"lightMap",type:"texture"},{name:"Intensity",prop:"lightMapIntensity",type:"number",min:0,default:1}]},t.morphNormals={name:"Morph Normals",type:"boolean",prop:"morphNormals",default:!1},t.morphTargets={name:"Morph Targets",type:"boolean",prop:"morphTargets",default:!1},t.reflectivity={name:"Reflectivity",type:"number",prop:"reflectivity",min:0,max:1,default:1},t.refractionRatio={name:"Refraction Ratio",type:"number",prop:"refractionRatio",default:.98,min:0},t.skinning={name:"Skinning",type:"boolean",prop:"skinning",default:!1},t.specularMap={name:"Specular Map",type:"texture",prop:"specularMap"},t.specular={name:"Specular",type:"group",props:[{name:"Color",type:"color",prop:"specular"},{name:"Map",type:"texture",prop:"specularMap"}]},t.clipping={name:"Clipping",type:"boolean",prop:"clipping",default:!1},t.wireframe={name:"Wireframe",type:"group",props:[{name:"Enabled",type:"boolean",prop:"wireframe",default:!1},{name:"Line Width",type:"number",prop:"wireframeLinewidth",default:1},{name:"Line Cap",type:"string",prop:"wireframeLinecap",default:"round"},{name:"Line Join",type:"string",prop:"wireframeLinejoin",default:"round"}]},t.sizeAttenuation={name:"Attenuation",type:"boolean",prop:"sizeAttenuation",default:!0},t.rotation={name:"Rotation",type:"radians",prop:"rotation",default:0},t.point={name:"Points",type:"group",props:[{name:"Size",type:"number",prop:"size",default:1},{name:"Attenuation",type:"boolean",prop:"sizeAttenuation",default:!0}]},t.emissive={name:"Emissive",type:"group",props:[{name:"Color",type:"color",prop:"emissive"},{name:"Emissive Map ",type:"texture",prop:"emissiveMap"},{name:"Emissive Intensity",prop:"emissiveIntensity",type:"number",default:1}]}},5663:function(e,t,n){var i=this&&this.__createBinding||(Object.create?function(e,t,n,i){void 0===i&&(i=n);var r=Object.getOwnPropertyDescriptor(t,n);r&&!("get"in r?!t.__esModule:r.writable||r.configurable)||(r={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,i,r)}:function(e,t,n,i){void 0===i&&(i=n),e[i]=t[n]}),r=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),o=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&i(t,e,n);return r(t,e),t},a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const s=a(n(542)),l=o(n(1373)),p=a(n(8434)),d=a(n(5684)),c=n(2582),h=n(4636),u=[{name:"Environment",type:"group",props:[l.envMap,l.envMapIntensity].map((e=>Object.assign({},e,{name:e.name.replace(/Environment /,"")})))},h.metalness,h.roughness,l.normalMap,l.bumpMap,l.displacement,l.ao,l.lightMap,l.emissive],m=[s.default,p.default,d.default],y=[Object.assign({},s.default,{props:[...s.default.props.filter((({prop:e})=>-1===["side","shadowSide"].indexOf(e)))]}),p.default,d.default],f={type:"material",props:m},v={Material:f,MeshBasicMaterial:{type:"material",props:[l.color,l.diffuseMap,l.combine,l.alphaMap,l.envMap,l.reflectivity,l.refractionRatio,l.specularMap,l.morphTargets,l.skinning,l.wireframe,l.ao,l.lightMap,...m]},MeshDepthMaterial:{type:"material",props:[l.depthPacking,l.diffuseMap,l.alphaMap,l.wireframe,l.displacement,...m]},MeshDistanceMaterial:{type:"material",props:[l.diffuseMap,l.alphaMap,l.morphTargets,l.skinning,l.distance,l.displacement,...m]},MeshLambertMaterial:{type:"material",props:[l.color,l.diffuseMap,l.alphaMap,l.envMap,l.reflectivity,l.refractionRatio,l.morphNormals,l.morphTargets,l.skinning,l.specularMap,l.wireframe,l.emissive,l.ao,l.lightMap,...m]},MeshMatcapMaterial:{type:"material",props:[l.color,l.matcap,l.diffuseMap,l.alphaMap,l.morphNormals,l.morphTargets,l.skinning,l.normalMap,l.bumpMap,l.displacement,...m]},MeshNormalMaterial:{type:"material",props:[l.morphNormals,l.morphTargets,l.skinning,l.wireframe,l.normalMap,l.bumpMap,l.displacement,...m]},MeshPhongMaterial:{type:"material",props:[l.color,l.alphaMap,l.envMap,l.diffuseMap,l.combine,l.refractionRatio,l.reflectivity,l.morphNormals,l.morphTargets,l.skinning,l.ao,l.specular,l.lightMap,l.wireframe,l.emissive,l.normalMap,l.bumpMap,l.displacement,...m]},MeshPhysicalMaterial:{type:"material",props:[l.diffuseMap,l.color,l.refractionRatio,l.reflectivity,l.skinning,l.wireframe,...u,h.clearCoat,...m]},MeshStandardMaterial:{type:"material",props:[l.diffuseMap,l.color,l.refractionRatio,l.skinning,l.wireframe,...u,...m]},MeshToonMaterial:{type:"material",props:[l.color,l.diffuseMap,l.combine,l.gradientMap,l.alphaMap,l.refractionRatio,l.reflectivity,l.envMap,l.morphNormals,l.morphTargets,l.skinning,l.specular,l.ao,l.lightMap,l.wireframe,l.emissive,l.normalMap,l.bumpMap,l.displacement,...m]},PointsMaterial:{type:"material",props:[l.color,l.alphaMap,l.diffuseMap,l.morphTargets,l.point,...m]},RawShaderMaterial:{type:"material",props:[l.clipping,l.morphNormals,l.morphTargets,l.skinning,l.wireframe,...m]},ShaderMaterial:{type:"material",props:[l.clipping,l.morphNormals,l.morphTargets,l.skinning,l.wireframe,...m]},ShadowMaterial:f,SpriteMaterial:{type:"material",props:[l.color,l.diffuseMap,l.rotation,l.sizeAttenuation,...m]},LineBasicMaterial:{type:"material",props:[l.color,c.line,...y]},LineDashedMaterial:{type:"material",props:[l.color,c.line,...c.lineDashed,...y]}};t.default=v},3764:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.default={name:"Rendering",type:"group",props:[{name:"Render Order",prop:"renderOrder",type:"int",default:0},{name:"Visible",prop:"visible",type:"boolean",default:!0},{name:"Receive Shadow",prop:"receiveShadow",type:"boolean",default:!1},{name:"Cast Shadow",prop:"castShadow",type:"boolean",default:!1},{name:"Frustum Culled",prop:"frustumCulled",type:"boolean",default:!0}]}},9164:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.default={name:"Transform",type:"group",props:[{name:"Position",prop:"position",type:"vec3",step:.01,precision:3},{name:"Rotation",prop:"rotation",type:"vec3",step:.01,precision:3},{name:"Scale",prop:"scale",type:"vec3",step:.01,precision:3},{name:"Matrix Auto Update",prop:"matrixAutoUpdate",type:"boolean",default:!0}]}},599:function(e,t,n){var i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const r=i(n(9164)),o=i(n(3764)),a=[r.default,o.default],s={type:"object",props:[{name:"Geometry",prop:"geometry",type:"geometry"},{name:"Material",prop:"material",type:"material"},r.default,o.default]},l={type:"helper",props:a},p={type:"bone",props:a},d={type:"object",props:a},c={Mesh:s,Line:s,LineLoop:s,LineSegments:s,Points:s,SkinnedMesh:s,InstancedMesh:s,AxesHelper:l,BoxHelper:l,Box3Helper:l,CameraHelper:l,DirectionalLightHelper:l,FaceNormalsHelper:l,GridHelper:l,PolarGridHelper:l,PositionalAudioHelper:l,HemisphereLightHelper:l,PlaneHelper:l,PointLightHelper:l,RectAreaLightHelper:l,SkeletonHelper:l,SpotLightHelper:l,VertexNormalsHelper:l,Scene:{type:"scene",props:a},Skeleton:p,Bone:p,Object3D:d,Group:d,PerspectiveCamera:d,OrthographicCamera:d,Camera:d};t.default=c},4566:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0});const n={type:"renderer",props:[{name:"Check Shader Errors",prop:"debug.checkShaderErrors",type:"boolean",default:!0},{name:"Physically Correct Lights",prop:"physicallyCorrectLights",type:"boolean",default:!1},{name:"Gamma",prop:"gammaFactor",type:"number",default:2},{name:"Output Encoding",prop:"outputEncoding",type:"enum",enumType:"encoding"},{name:"Tone Mapping",type:"group",props:[{name:"Type",prop:"toneMapping",type:"enum",enumType:"toneMapping"},{name:"Exposure",prop:"toneMappingExposure",type:"number",default:1}]},{name:"Shadow Map",type:"group",props:[{name:"Enabled",prop:"shadowMap.enabled",type:"boolean",default:!1},{name:"Auto Update",prop:"shadowMap.autoUpdate",type:"boolean",default:!0},{name:"Shadow Type",prop:"shadowMap.type",type:"enum",enumType:"shadowMap"}]},{name:"Buffer Clearing",type:"group",props:[{name:"Auto Clear",prop:"autoClear",type:"boolean",default:!0},{name:"Auto Clear Color",prop:"autoClearColor",type:"boolean",default:!0},{name:"Auto Clear Depth",prop:"autoClearDepth",type:"boolean",default:!0},{name:"Auto Clear Stencil",prop:"autoClearStencil",type:"boolean",default:!0}]},{name:"Capabilities",type:"group",props:[{name:"Is WebGL2",prop:"capabilities.isWebGL2",type:"boolean",readonly:!0},{name:"Precision",prop:"capabilities.precision",type:"string",readonly:!0},{name:"Float Fragment Textures",prop:"capabilities.floatFragmentTextures",type:"boolean",readonly:!0},{name:"Float Vertex Textures",prop:"capabilities.floatVertexTextures",type:"boolean",readonly:!0},{name:"Logarithmic Depth Buffer",prop:"capabilities.logarithmicDepthBuffer",type:"boolean",readonly:!0},{name:"Max Anisotropy",prop:"capabilities.maxAnisotropy",type:"number",readonly:!0},{name:"Max Precision",prop:"capabilities.maxPrecision",type:"string",readonly:!0},{name:"Max Attributes",prop:"capabilities.maxAttributes",type:"int",readonly:!0},{name:"Max Cubemap Size",prop:"capabilities.maxCubemapSize",type:"int",readonly:!0},{name:"Max Fragment Uniforms",prop:"capabilities.maxFragmentUniforms",type:"int",readonly:!0},{name:"Max Texture Size",prop:"capabilities.maxTextureSize",type:"int",readonly:!0},{name:"Max Textures",prop:"capabilities.maxTextures",type:"int",readonly:!0},{name:"Max Varyings",prop:"capabilities.maxVaryings",type:"int",readonly:!0},{name:"Max Vertex Textures",prop:"capabilities.maxVertexTextures",type:"int",readonly:!0},{name:"Max Vertex Uniforms",prop:"capabilities.maxVertexUniforms",type:"int",readonly:!0},{name:"Vertex Textures",prop:"capabilities.vertexTextures",type:"boolean",readonly:!0}]},{name:"Clipping",type:"group",props:[{name:"Local Clipping",prop:"localClippingEnabled",type:"boolean",default:!1}]},{name:"Scene",type:"group",props:[{name:"Sort Objects",prop:"sortObjects",type:"boolean",default:!0}]},{name:"Morph Limits",type:"group",props:[{name:"Max Morph Targets",prop:"maxMorphTargets",type:"int",default:8,min:0,max:8},{name:"Max Morph Normals",prop:"maxMorphNormals",type:"int",default:4,min:0,max:4}]}]},i={WebGLRenderer:n,WebGL1Renderer:n};t.default=i},8924:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0});const n={type:"texture",props:[{name:"Mapping",prop:"mapping",type:"enum"},{name:"Encoding",prop:"encoding",type:"enum"},{name:"Format",prop:"format",type:"enum"},{name:"Byte Type",prop:"type",type:"enum"},{name:"Anisotropy",prop:"anisotropy",type:"number",min:0},{name:"Flip Y",prop:"flipY",type:"boolean",default:!0},{name:"Generate Mipmaps",prop:"generateMipmaps",type:"boolean",default:!0},{name:"Premultiply Alpha",prop:"premultiplyAlpha",type:"boolean",default:!1},{name:"Filters",type:"group",props:[{name:"Min Filter",prop:"minFilter",type:"enum"},{name:"Mag Filter",prop:"magFilter",type:"enum"}]},()=>({name:"Wrapping",type:"group",props:[{name:"Wrap S",prop:"wrap[0]",type:"enum",enumType:"wrapping"},{name:"Wrap T",prop:"wrap[1]",type:"enum",enumType:"wrapping"}]}),{name:"Transform",type:"group",props:[{name:"Offset",prop:"offset",type:"vec2"},{name:"Repeat",prop:"repeat",type:"vec2"},{name:"Rotation",prop:"rotation",type:"radians"},{name:"Center",prop:"center",type:"vec2"},{name:"matrixAutoUpdate",prop:"matrixAutoUpdate",type:"boolean",default:!0},{name:"Matrix",prop:"matrix",type:"mat3"}]}]},i={Texture:n,CanvasTexture:n,CompressedTexture:n,CubeTexture:n,DataTexture:n,DataTexture2DArray:n,DataTexture3D:n,DepthTexture:n,VideoTexture:n};t.default=i},5965:function(e,t,n){var i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const r=i(n(8438)),o=i(n(9495)),a=i(n(1399)),s=i(n(4785)),l=i(n(2535)),p=i(n(2423)),d=i(n(5610)),c=i(n(8124)),h=i(n(2679)),u=i(n(7400)),m=i(n(3557)),y=i(n(3444)),f=i(n(2198)),v=i(n(7198)),g=i(n(8600)),b=i(n(4703)),_=i(n(2776)),$=i(n(307)),w=i(n(2776)),M=i(n(7359));customElements.define("r3f-devtools",r.default),customElements.define("renderer-view",a.default),customElements.define("scene-view",o.default),customElements.define("resources-view",s.default),customElements.define("parameters-view",l.default),customElements.define("title-bar",p.default),customElements.define("image-preview",d.default),customElements.define("key-value",c.default),customElements.define("material-value",h.default),customElements.define("texture-value",u.default),customElements.define("enum-value",m.default),customElements.define("tab-bar",y.default),customElements.define("number-input",f.default),customElements.define("tree-item",v.default),customElements.define("accordian-view",g.default),customElements.define("devtools-message",b.default),customElements.define("devtools-icon",_.default),customElements.define("devtools-button",$.default),customElements.define("devtools-icon-button",w.default),customElements.define("x-icon",M.default),window.addEventListener("error",(e=>{document.querySelector("r3f-devtools").setError(e.message)}))},1761:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.getObjectByUUID=t.cssStringToHexNumber=t.hexNumberToCSSString=t.getEntityName=t.isUUID=void 0;const n=/^([a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}){1}$/;t.isUUID=e=>"string"==typeof e&&n.test(e),t.getEntityName=e=>e.name||e.baseType,t.hexNumberToCSSString=e=>`#${("000000"+e.toString(16)).slice(-6)}`,t.cssStringToHexNumber=e=>+`0x${e.substr(1)}`,t.getObjectByUUID=(e,n)=>{if(e.uuid===n)return e;if(!e.children||!e.children.length)return null;for(let i of e.children){let e=(0,t.getObjectByUUID)(i,n);if(e)return e}}},3247:(e,t,n)=>{n.r(t),n.d(t,{CSSResult:()=>s,LitElement:()=>de,ReactiveElement:()=>_,UpdatingElement:()=>pe,_$LE:()=>he,_$LH:()=>oe,adoptStyles:()=>d,css:()=>p,customElement:()=>fe,decorateProperty:()=>ye,defaultConverter:()=>v,eventOptions:()=>_e,getCompatibleStyle:()=>c,html:()=>G,legacyPrototypeMethod:()=>ue,noChange:()=>j,notEqual:()=>g,nothing:()=>q,property:()=>ge,query:()=>$e,queryAll:()=>we,queryAssignedElements:()=>Se,queryAssignedNodes:()=>Ee,queryAsync:()=>Me,render:()=>W,standardPrototypeMethod:()=>me,state:()=>be,supportsAdoptingStyleSheets:()=>r,svg:()=>H,unsafeCSS:()=>l});const i=window,r=i.ShadowRoot&&(void 0===i.ShadyCSS||i.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,o=Symbol(),a=new WeakMap;class s{constructor(e,t,n){if(this._$cssResult$=!0,n!==o)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(r&&void 0===e){const n=void 0!==t&&1===t.length;n&&(e=a.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),n&&a.set(t,e))}return e}toString(){return this.cssText}}const l=e=>new s("string"==typeof e?e:e+"",void 0,o),p=(e,...t)=>{const n=1===e.length?e[0]:t.reduce(((t,n,i)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(n)+e[i+1]),e[0]);return new s(n,e,o)},d=(e,t)=>{r?e.adoptedStyleSheets=t.map((e=>e instanceof CSSStyleSheet?e:e.styleSheet)):t.forEach((t=>{const n=document.createElement("style"),r=i.litNonce;void 0!==r&&n.setAttribute("nonce",r),n.textContent=t.cssText,e.appendChild(n)}))},c=r?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const n of e.cssRules)t+=n.cssText;return l(t)})(e):e;var h;const u=window,m=u.trustedTypes,y=m?m.emptyScript:"",f=u.reactiveElementPolyfillSupport,v={toAttribute(e,t){switch(t){case Boolean:e=e?y:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let n=e;switch(t){case Boolean:n=null!==e;break;case Number:n=null===e?null:Number(e);break;case Object:case Array:try{n=JSON.parse(e)}catch(e){n=null}}return n}},g=(e,t)=>t!==e&&(t==t||e==e),b={attribute:!0,type:String,converter:v,reflect:!1,hasChanged:g};class _ extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this.u()}static addInitializer(e){var t;null!==(t=this.h)&&void 0!==t||(this.h=[]),this.h.push(e)}static get observedAttributes(){this.finalize();const e=[];return this.elementProperties.forEach(((t,n)=>{const i=this._$Ep(n,t);void 0!==i&&(this._$Ev.set(i,n),e.push(i))})),e}static createProperty(e,t=b){if(t.state&&(t.attribute=!1),this.finalize(),this.elementProperties.set(e,t),!t.noAccessor&&!this.prototype.hasOwnProperty(e)){const n="symbol"==typeof e?Symbol():"__"+e,i=this.getPropertyDescriptor(e,n,t);void 0!==i&&Object.defineProperty(this.prototype,e,i)}}static getPropertyDescriptor(e,t,n){return{get(){return this[t]},set(i){const r=this[e];this[t]=i,this.requestUpdate(e,r,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)||b}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const e=Object.getPrototypeOf(this);if(e.finalize(),this.elementProperties=new Map(e.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const e=this.properties,t=[...Object.getOwnPropertyNames(e),...Object.getOwnPropertySymbols(e)];for(const n of t)this.createProperty(n,e[n])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const n=new Set(e.flat(1/0).reverse());for(const e of n)t.unshift(c(e))}else void 0!==e&&t.push(c(e));return t}static _$Ep(e,t){const n=t.attribute;return!1===n?void 0:"string"==typeof n?n:"string"==typeof e?e.toLowerCase():void 0}u(){var e;this._$E_=new Promise((e=>this.enableUpdating=e)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(e=this.constructor.h)||void 0===e||e.forEach((e=>e(this)))}addController(e){var t,n;(null!==(t=this._$ES)&&void 0!==t?t:this._$ES=[]).push(e),void 0!==this.renderRoot&&this.isConnected&&(null===(n=e.hostConnected)||void 0===n||n.call(e))}removeController(e){var t;null===(t=this._$ES)||void 0===t||t.splice(this._$ES.indexOf(e)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach(((e,t)=>{this.hasOwnProperty(t)&&(this._$Ei.set(t,this[t]),delete this[t])}))}createRenderRoot(){var e;const t=null!==(e=this.shadowRoot)&&void 0!==e?e:this.attachShadow(this.constructor.shadowRootOptions);return d(t,this.constructor.elementStyles),t}connectedCallback(){var e;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(e=this._$ES)||void 0===e||e.forEach((e=>{var t;return null===(t=e.hostConnected)||void 0===t?void 0:t.call(e)}))}enableUpdating(e){}disconnectedCallback(){var e;null===(e=this._$ES)||void 0===e||e.forEach((e=>{var t;return null===(t=e.hostDisconnected)||void 0===t?void 0:t.call(e)}))}attributeChangedCallback(e,t,n){this._$AK(e,n)}_$EO(e,t,n=b){var i;const r=this.constructor._$Ep(e,n);if(void 0!==r&&!0===n.reflect){const o=(void 0!==(null===(i=n.converter)||void 0===i?void 0:i.toAttribute)?n.converter:v).toAttribute(t,n.type);this._$El=e,null==o?this.removeAttribute(r):this.setAttribute(r,o),this._$El=null}}_$AK(e,t){var n;const i=this.constructor,r=i._$Ev.get(e);if(void 0!==r&&this._$El!==r){const e=i.getPropertyOptions(r),o="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==(null===(n=e.converter)||void 0===n?void 0:n.fromAttribute)?e.converter:v;this._$El=r,this[r]=o.fromAttribute(t,e.type),this._$El=null}}requestUpdate(e,t,n){let i=!0;void 0!==e&&(((n=n||this.constructor.getPropertyOptions(e)).hasChanged||g)(this[e],t)?(this._$AL.has(e)||this._$AL.set(e,t),!0===n.reflect&&this._$El!==e&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(e,n))):i=!1),!this.isUpdatePending&&i&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var e;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((e,t)=>this[t]=e)),this._$Ei=void 0);let t=!1;const n=this._$AL;try{t=this.shouldUpdate(n),t?(this.willUpdate(n),null===(e=this._$ES)||void 0===e||e.forEach((e=>{var t;return null===(t=e.hostUpdate)||void 0===t?void 0:t.call(e)})),this.update(n)):this._$Ek()}catch(e){throw t=!1,this._$Ek(),e}t&&this._$AE(n)}willUpdate(e){}_$AE(e){var t;null===(t=this._$ES)||void 0===t||t.forEach((e=>{var t;return null===(t=e.hostUpdated)||void 0===t?void 0:t.call(e)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(e){return!0}update(e){void 0!==this._$EC&&(this._$EC.forEach(((e,t)=>this._$EO(t,this[t],e))),this._$EC=void 0),this._$Ek()}updated(e){}firstUpdated(e){}}var $;_.finalized=!0,_.elementProperties=new Map,_.elementStyles=[],_.shadowRootOptions={mode:"open"},null==f||f({ReactiveElement:_}),(null!==(h=u.reactiveElementVersions)&&void 0!==h?h:u.reactiveElementVersions=[]).push("1.4.1");const w=window,M=w.trustedTypes,x=M?M.createPolicy("lit-html",{createHTML:e=>e}):void 0,A=`lit$${(Math.random()+"").slice(9)}$`,S="?"+A,E=`<${S}>`,C=document,T=(e="")=>C.createComment(e),k=e=>null===e||"object"!=typeof e&&"function"!=typeof e,R=Array.isArray,P=e=>R(e)||"function"==typeof(null==e?void 0:e[Symbol.iterator]),L=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,O=/-->/g,D=/>/g,F=RegExp(">|[ \t\n\f\r](?:([^\\s\"'>=/]+)([ \t\n\f\r]*=[ \t\n\f\r]*(?:[^ \t\n\f\r\"'`<>=]|(\"|')|))|$)","g"),N=/'/g,B=/"/g,U=/^(?:script|style|textarea|title)$/i,I=e=>(t,...n)=>({_$litType$:e,strings:t,values:n}),G=I(1),H=I(2),j=Symbol.for("lit-noChange"),q=Symbol.for("lit-nothing"),V=new WeakMap,W=(e,t,n)=>{var i,r;const o=null!==(i=null==n?void 0:n.renderBefore)&&void 0!==i?i:t;let a=o._$litPart$;if(void 0===a){const e=null!==(r=null==n?void 0:n.renderBefore)&&void 0!==r?r:null;o._$litPart$=a=new J(t.insertBefore(T(),e),e,void 0,null!=n?n:{})}return a._$AI(e),a},z=C.createTreeWalker(C,129,null,!1),K=(e,t)=>{const n=e.length-1,i=[];let r,o=2===t?"<svg>":"",a=L;for(let t=0;t<n;t++){const n=e[t];let s,l,p=-1,d=0;for(;d<n.length&&(a.lastIndex=d,l=a.exec(n),null!==l);)d=a.lastIndex,a===L?"!--"===l[1]?a=O:void 0!==l[1]?a=D:void 0!==l[2]?(U.test(l[2])&&(r=RegExp("</"+l[2],"g")),a=F):void 0!==l[3]&&(a=F):a===F?">"===l[0]?(a=null!=r?r:L,p=-1):void 0===l[1]?p=-2:(p=a.lastIndex-l[2].length,s=l[1],a=void 0===l[3]?F:'"'===l[3]?B:N):a===B||a===N?a=F:a===O||a===D?a=L:(a=F,r=void 0);const c=a===F&&e[t+1].startsWith("/>")?" ":"";o+=a===L?n+E:p>=0?(i.push(s),n.slice(0,p)+"$lit$"+n.slice(p)+A+c):n+A+(-2===p?(i.push(void 0),t):c)}const s=o+(e[n]||"<?>")+(2===t?"</svg>":"");if(!Array.isArray(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return[void 0!==x?x.createHTML(s):s,i]};class Y{constructor({strings:e,_$litType$:t},n){let i;this.parts=[];let r=0,o=0;const a=e.length-1,s=this.parts,[l,p]=K(e,t);if(this.el=Y.createElement(l,n),z.currentNode=this.el.content,2===t){const e=this.el.content,t=e.firstChild;t.remove(),e.append(...t.childNodes)}for(;null!==(i=z.nextNode())&&s.length<a;){if(1===i.nodeType){if(i.hasAttributes()){const e=[];for(const t of i.getAttributeNames())if(t.endsWith("$lit$")||t.startsWith(A)){const n=p[o++];if(e.push(t),void 0!==n){const e=i.getAttribute(n.toLowerCase()+"$lit$").split(A),t=/([.?@])?(.*)/.exec(n);s.push({type:1,index:r,name:t[2],strings:e,ctor:"."===t[1]?ee:"?"===t[1]?ne:"@"===t[1]?ie:Q})}else s.push({type:6,index:r})}for(const t of e)i.removeAttribute(t)}if(U.test(i.tagName)){const e=i.textContent.split(A),t=e.length-1;if(t>0){i.textContent=M?M.emptyScript:"";for(let n=0;n<t;n++)i.append(e[n],T()),z.nextNode(),s.push({type:2,index:++r});i.append(e[t],T())}}}else if(8===i.nodeType)if(i.data===S)s.push({type:2,index:r});else{let e=-1;for(;-1!==(e=i.data.indexOf(A,e+1));)s.push({type:7,index:r}),e+=A.length-1}r++}}static createElement(e,t){const n=C.createElement("template");return n.innerHTML=e,n}}function Z(e,t,n=e,i){var r,o,a,s;if(t===j)return t;let l=void 0!==i?null===(r=n._$Cl)||void 0===r?void 0:r[i]:n._$Cu;const p=k(t)?void 0:t._$litDirective$;return(null==l?void 0:l.constructor)!==p&&(null===(o=null==l?void 0:l._$AO)||void 0===o||o.call(l,!1),void 0===p?l=void 0:(l=new p(e),l._$AT(e,n,i)),void 0!==i?(null!==(a=(s=n)._$Cl)&&void 0!==a?a:s._$Cl=[])[i]=l:n._$Cu=l),void 0!==l&&(t=Z(e,l._$AS(e,t.values),l,i)),t}class X{constructor(e,t){this.v=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}p(e){var t;const{el:{content:n},parts:i}=this._$AD,r=(null!==(t=null==e?void 0:e.creationScope)&&void 0!==t?t:C).importNode(n,!0);z.currentNode=r;let o=z.nextNode(),a=0,s=0,l=i[0];for(;void 0!==l;){if(a===l.index){let t;2===l.type?t=new J(o,o.nextSibling,this,e):1===l.type?t=new l.ctor(o,l.name,l.strings,this,e):6===l.type&&(t=new re(o,this,e)),this.v.push(t),l=i[++s]}a!==(null==l?void 0:l.index)&&(o=z.nextNode(),a++)}return r}m(e){let t=0;for(const n of this.v)void 0!==n&&(void 0!==n.strings?(n._$AI(e,n,t),t+=n.strings.length-2):n._$AI(e[t])),t++}}class J{constructor(e,t,n,i){var r;this.type=2,this._$AH=q,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=n,this.options=i,this._$C_=null===(r=null==i?void 0:i.isConnected)||void 0===r||r}get _$AU(){var e,t;return null!==(t=null===(e=this._$AM)||void 0===e?void 0:e._$AU)&&void 0!==t?t:this._$C_}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=Z(this,e,t),k(e)?e===q||null==e||""===e?(this._$AH!==q&&this._$AR(),this._$AH=q):e!==this._$AH&&e!==j&&this.$(e):void 0!==e._$litType$?this.T(e):void 0!==e.nodeType?this.k(e):P(e)?this.O(e):this.$(e)}S(e,t=this._$AB){return this._$AA.parentNode.insertBefore(e,t)}k(e){this._$AH!==e&&(this._$AR(),this._$AH=this.S(e))}$(e){this._$AH!==q&&k(this._$AH)?this._$AA.nextSibling.data=e:this.k(C.createTextNode(e)),this._$AH=e}T(e){var t;const{values:n,_$litType$:i}=e,r="number"==typeof i?this._$AC(e):(void 0===i.el&&(i.el=Y.createElement(i.h,this.options)),i);if((null===(t=this._$AH)||void 0===t?void 0:t._$AD)===r)this._$AH.m(n);else{const e=new X(r,this),t=e.p(this.options);e.m(n),this.k(t),this._$AH=e}}_$AC(e){let t=V.get(e.strings);return void 0===t&&V.set(e.strings,t=new Y(e)),t}O(e){R(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let n,i=0;for(const r of e)i===t.length?t.push(n=new J(this.S(T()),this.S(T()),this,this.options)):n=t[i],n._$AI(r),i++;i<t.length&&(this._$AR(n&&n._$AB.nextSibling,i),t.length=i)}_$AR(e=this._$AA.nextSibling,t){var n;for(null===(n=this._$AP)||void 0===n||n.call(this,!1,!0,t);e&&e!==this._$AB;){const t=e.nextSibling;e.remove(),e=t}}setConnected(e){var t;void 0===this._$AM&&(this._$C_=e,null===(t=this._$AP)||void 0===t||t.call(this,e))}}class Q{constructor(e,t,n,i,r){this.type=1,this._$AH=q,this._$AN=void 0,this.element=e,this.name=t,this._$AM=i,this.options=r,n.length>2||""!==n[0]||""!==n[1]?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=q}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(e,t=this,n,i){const r=this.strings;let o=!1;if(void 0===r)e=Z(this,e,t,0),o=!k(e)||e!==this._$AH&&e!==j,o&&(this._$AH=e);else{const i=e;let a,s;for(e=r[0],a=0;a<r.length-1;a++)s=Z(this,i[n+a],t,a),s===j&&(s=this._$AH[a]),o||(o=!k(s)||s!==this._$AH[a]),s===q?e=q:e!==q&&(e+=(null!=s?s:"")+r[a+1]),this._$AH[a]=s}o&&!i&&this.P(e)}P(e){e===q?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=e?e:"")}}class ee extends Q{constructor(){super(...arguments),this.type=3}P(e){this.element[this.name]=e===q?void 0:e}}const te=M?M.emptyScript:"";class ne extends Q{constructor(){super(...arguments),this.type=4}P(e){e&&e!==q?this.element.setAttribute(this.name,te):this.element.removeAttribute(this.name)}}class ie extends Q{constructor(e,t,n,i,r){super(e,t,n,i,r),this.type=5}_$AI(e,t=this){var n;if((e=null!==(n=Z(this,e,t,0))&&void 0!==n?n:q)===j)return;const i=this._$AH,r=e===q&&i!==q||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,o=e!==q&&(i===q||r);r&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t,n;"function"==typeof this._$AH?this._$AH.call(null!==(n=null===(t=this.options)||void 0===t?void 0:t.host)&&void 0!==n?n:this.element,e):this._$AH.handleEvent(e)}}class re{constructor(e,t,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){Z(this,e)}}const oe={A:"$lit$",M:A,C:S,L:1,R:K,D:X,V:P,I:Z,H:J,N:Q,U:ne,B:ie,F:ee,W:re},ae=w.litHtmlPolyfillSupport;var se,le;null==ae||ae(Y,J),(null!==($=w.litHtmlVersions)&&void 0!==$?$:w.litHtmlVersions=[]).push("2.3.1");const pe=_;class de extends _{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e,t;const n=super.createRenderRoot();return null!==(e=(t=this.renderOptions).renderBefore)&&void 0!==e||(t.renderBefore=n.firstChild),n}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=W(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),null===(e=this._$Do)||void 0===e||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),null===(e=this._$Do)||void 0===e||e.setConnected(!1)}render(){return j}}de.finalized=!0,de._$litElement$=!0,null===(se=globalThis.litElementHydrateSupport)||void 0===se||se.call(globalThis,{LitElement:de});const ce=globalThis.litElementPolyfillSupport;null==ce||ce({LitElement:de});const he={_$AK:(e,t,n)=>{e._$AK(t,n)},_$AL:e=>e._$AL};(null!==(le=globalThis.litElementVersions)&&void 0!==le?le:globalThis.litElementVersions=[]).push("3.2.2");const ue=(e,t,n)=>{Object.defineProperty(t,n,e)},me=(e,t)=>({kind:"method",placement:"prototype",key:t.key,descriptor:e}),ye=({finisher:e,descriptor:t})=>(n,i)=>{var r;if(void 0===i){const i=null!==(r=n.originalKey)&&void 0!==r?r:n.key,o=null!=t?{kind:"method",placement:"prototype",key:i,descriptor:t(n.key)}:{...n,key:i};return null!=e&&(o.finisher=function(t){e(t,i)}),o}{const r=n.constructor;void 0!==t&&Object.defineProperty(n,i,t(i)),null==e||e(r,i)}},fe=e=>t=>"function"==typeof t?((e,t)=>(customElements.define(e,t),t))(e,t):((e,t)=>{const{kind:n,elements:i}=t;return{kind:n,elements:i,finisher(t){customElements.define(e,t)}}})(e,t),ve=(e,t)=>"method"===t.kind&&t.descriptor&&!("value"in t.descriptor)?{...t,finisher(n){n.createProperty(t.key,e)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:t.key,initializer(){"function"==typeof t.initializer&&(this[t.key]=t.initializer.call(this))},finisher(n){n.createProperty(t.key,e)}};function ge(e){return(t,n)=>void 0!==n?((e,t,n)=>{t.constructor.createProperty(n,e)})(e,t,n):ve(e,t)}function be(e){return ge({...e,state:!0})}function _e(e){return ye({finisher:(t,n)=>{Object.assign(t.prototype[n],e)}})}function $e(e,t){return ye({descriptor:n=>{const i={get(){var t,n;return null!==(n=null===(t=this.renderRoot)||void 0===t?void 0:t.querySelector(e))&&void 0!==n?n:null},enumerable:!0,configurable:!0};if(t){const t="symbol"==typeof n?Symbol():"__"+n;i.get=function(){var n,i;return void 0===this[t]&&(this[t]=null!==(i=null===(n=this.renderRoot)||void 0===n?void 0:n.querySelector(e))&&void 0!==i?i:null),this[t]}}return i}})}function we(e){return ye({descriptor:t=>({get(){var t,n;return null!==(n=null===(t=this.renderRoot)||void 0===t?void 0:t.querySelectorAll(e))&&void 0!==n?n:[]},enumerable:!0,configurable:!0})})}function Me(e){return ye({descriptor:t=>({async get(){var t;return await this.updateComplete,null===(t=this.renderRoot)||void 0===t?void 0:t.querySelector(e)},enumerable:!0,configurable:!0})})}var xe;const Ae=null!=(null===(xe=window.HTMLSlotElement)||void 0===xe?void 0:xe.prototype.assignedElements)?(e,t)=>e.assignedElements(t):(e,t)=>e.assignedNodes(t).filter((e=>e.nodeType===Node.ELEMENT_NODE));function Se(e){const{slot:t,selector:n}=null!=e?e:{};return ye({descriptor:i=>({get(){var i;const r="slot"+(t?`[name=${t}]`:":not([name])"),o=null===(i=this.renderRoot)||void 0===i?void 0:i.querySelector(r),a=null!=o?Ae(o,e):[];return n?a.filter((e=>e.matches(n))):a},enumerable:!0,configurable:!0})})}function Ee(e,t,n){let i,r=e;return"object"==typeof e?(r=e.slot,i=e):i={flatten:t},n?Se({slot:r,flatten:t,selector:n}):ye({descriptor:e=>({get(){var e,t;const n="slot"+(r?`[name=${r}]`:":not([name])"),o=null===(e=this.renderRoot)||void 0===e?void 0:e.querySelector(n);return null!==(t=null==o?void 0:o.assignedNodes(i))&&void 0!==t?t:[]},enumerable:!0,configurable:!0})})}console.warn("The main 'lit-element' module entrypoint is deprecated. Please update your imports to use the 'lit' package: 'lit' and 'lit/decorators.ts' or import from 'lit-element/lit-element.ts'. See https://lit.dev/msg/deprecated-import-path for more information.")},7006:(e,t,n)=>{n.r(t),n.d(t,{ACESFilmicToneMapping:()=>ne,AddEquation:()=>A,AddOperation:()=>X,AdditiveAnimationBlendMode:()=>Ct,AdditiveBlending:()=>$,AlphaFormat:()=>Oe,AlwaysDepth:()=>H,AlwaysStencilFunc:()=>nn,BackSide:()=>y,BasicDepthPacking:()=>Ot,BasicShadowMap:()=>d,ByteType:()=>xe,CineonToneMapping:()=>te,ClampToEdgeWrapping:()=>ce,CubeReflectionMapping:()=>oe,CubeRefractionMapping:()=>ae,CubeUVReflectionMapping:()=>pe,CullFaceBack:()=>s,CullFaceFront:()=>l,CullFaceFrontBack:()=>p,CullFaceNone:()=>a,CustomBlending:()=>x,CustomToneMapping:()=>ie,DecrementStencilOp:()=>Vt,DecrementWrapStencilOp:()=>zt,DepthFormat:()=>Ue,DepthStencilFormat:()=>Ie,DoubleSide:()=>f,DstAlphaFactor:()=>F,DstColorFactor:()=>B,DynamicCopyUsage:()=>cn,DynamicDrawUsage:()=>on,DynamicReadUsage:()=>ln,EqualDepth:()=>V,EqualStencilFunc:()=>Xt,EquirectangularReflectionMapping:()=>se,EquirectangularRefractionMapping:()=>le,FlatShading:()=>v,FloatType:()=>Te,FrontSide:()=>m,GLSL1:()=>un,GLSL3:()=>mn,GreaterDepth:()=>z,GreaterEqualDepth:()=>W,GreaterEqualStencilFunc:()=>tn,GreaterStencilFunc:()=>Qt,HalfFloatType:()=>ke,IncrementStencilOp:()=>qt,IncrementWrapStencilOp:()=>Wt,IntType:()=>Ee,InterpolateDiscrete:()=>$t,InterpolateLinear:()=>wt,InterpolateSmooth:()=>Mt,InvertStencilOp:()=>Kt,KeepStencilOp:()=>Ht,LessDepth:()=>j,LessEqualDepth:()=>q,LessEqualStencilFunc:()=>Jt,LessStencilFunc:()=>Zt,LinearEncoding:()=>Pt,LinearFilter:()=>ge,LinearMipMapLinearFilter:()=>we,LinearMipMapNearestFilter:()=>_e,LinearMipmapLinearFilter:()=>$e,LinearMipmapNearestFilter:()=>be,LinearSRGBColorSpace:()=>It,LinearToneMapping:()=>Q,LoopOnce:()=>gt,LoopPingPong:()=>_t,LoopRepeat:()=>bt,LuminanceAlphaFormat:()=>Be,LuminanceFormat:()=>Ne,MOUSE:()=>r,MaxEquation:()=>T,MinEquation:()=>C,MirroredRepeatWrapping:()=>he,MixOperation:()=>Z,MultiplyBlending:()=>M,MultiplyOperation:()=>Y,NearestFilter:()=>ue,NearestMipMapLinearFilter:()=>ve,NearestMipMapNearestFilter:()=>ye,NearestMipmapLinearFilter:()=>fe,NearestMipmapNearestFilter:()=>me,NeverDepth:()=>G,NeverStencilFunc:()=>Yt,NoBlending:()=>b,NoColorSpace:()=>Bt,NoToneMapping:()=>J,NormalAnimationBlendMode:()=>Et,NormalBlending:()=>_,NotEqualDepth:()=>K,NotEqualStencilFunc:()=>en,ObjectSpaceNormalMap:()=>Nt,OneFactor:()=>R,OneMinusDstAlphaFactor:()=>N,OneMinusDstColorFactor:()=>U,OneMinusSrcAlphaFactor:()=>D,OneMinusSrcColorFactor:()=>L,PCFShadowMap:()=>c,PCFSoftShadowMap:()=>h,REVISION:()=>i,RGBADepthPacking:()=>Dt,RGBAFormat:()=>Fe,RGBAIntegerFormat:()=>Ve,RGBA_ASTC_10x10_Format:()=>mt,RGBA_ASTC_10x5_Format:()=>ct,RGBA_ASTC_10x6_Format:()=>ht,RGBA_ASTC_10x8_Format:()=>ut,RGBA_ASTC_12x10_Format:()=>yt,RGBA_ASTC_12x12_Format:()=>ft,RGBA_ASTC_4x4_Format:()=>it,RGBA_ASTC_5x4_Format:()=>rt,RGBA_ASTC_5x5_Format:()=>ot,RGBA_ASTC_6x5_Format:()=>at,RGBA_ASTC_6x6_Format:()=>st,RGBA_ASTC_8x5_Format:()=>lt,RGBA_ASTC_8x6_Format:()=>pt,RGBA_ASTC_8x8_Format:()=>dt,RGBA_BPTC_Format:()=>vt,RGBA_ETC2_EAC_Format:()=>nt,RGBA_PVRTC_2BPPV1_Format:()=>Qe,RGBA_PVRTC_4BPPV1_Format:()=>Je,RGBA_S3TC_DXT1_Format:()=>ze,RGBA_S3TC_DXT3_Format:()=>Ke,RGBA_S3TC_DXT5_Format:()=>Ye,RGBFormat:()=>De,RGB_ETC1_Format:()=>et,RGB_ETC2_Format:()=>tt,RGB_PVRTC_2BPPV1_Format:()=>Xe,RGB_PVRTC_4BPPV1_Format:()=>Ze,RGB_S3TC_DXT1_Format:()=>We,RGFormat:()=>je,RGIntegerFormat:()=>qe,RedFormat:()=>Ge,RedIntegerFormat:()=>He,ReinhardToneMapping:()=>ee,RepeatWrapping:()=>de,ReplaceStencilOp:()=>jt,ReverseSubtractEquation:()=>E,SRGBColorSpace:()=>Ut,ShortType:()=>Ae,SmoothShading:()=>g,SrcAlphaFactor:()=>O,SrcAlphaSaturateFactor:()=>I,SrcColorFactor:()=>P,StaticCopyUsage:()=>dn,StaticDrawUsage:()=>rn,StaticReadUsage:()=>sn,StreamCopyUsage:()=>hn,StreamDrawUsage:()=>an,StreamReadUsage:()=>pn,SubtractEquation:()=>S,SubtractiveBlending:()=>w,TOUCH:()=>o,TangentSpaceNormalMap:()=>Ft,TriangleFanDrawMode:()=>Rt,TriangleStripDrawMode:()=>kt,TrianglesDrawMode:()=>Tt,UVMapping:()=>re,UnsignedByteType:()=>Me,UnsignedInt248Type:()=>Le,UnsignedIntType:()=>Ce,UnsignedShort4444Type:()=>Re,UnsignedShort5551Type:()=>Pe,UnsignedShortType:()=>Se,VSMShadowMap:()=>u,WrapAroundEnding:()=>St,ZeroCurvatureEnding:()=>xt,ZeroFactor:()=>k,ZeroSlopeEnding:()=>At,ZeroStencilOp:()=>Gt,_SRGBAFormat:()=>yn,sRGBEncoding:()=>Lt});const i="143",r={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},o={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},a=0,s=1,l=2,p=3,d=0,c=1,h=2,u=3,m=0,y=1,f=2,v=1,g=2,b=0,_=1,$=2,w=3,M=4,x=5,A=100,S=101,E=102,C=103,T=104,k=200,R=201,P=202,L=203,O=204,D=205,F=206,N=207,B=208,U=209,I=210,G=0,H=1,j=2,q=3,V=4,W=5,z=6,K=7,Y=0,Z=1,X=2,J=0,Q=1,ee=2,te=3,ne=4,ie=5,re=300,oe=301,ae=302,se=303,le=304,pe=306,de=1e3,ce=1001,he=1002,ue=1003,me=1004,ye=1004,fe=1005,ve=1005,ge=1006,be=1007,_e=1007,$e=1008,we=1008,Me=1009,xe=1010,Ae=1011,Se=1012,Ee=1013,Ce=1014,Te=1015,ke=1016,Re=1017,Pe=1018,Le=1020,Oe=1021,De=1022,Fe=1023,Ne=1024,Be=1025,Ue=1026,Ie=1027,Ge=1028,He=1029,je=1030,qe=1031,Ve=1033,We=33776,ze=33777,Ke=33778,Ye=33779,Ze=35840,Xe=35841,Je=35842,Qe=35843,et=36196,tt=37492,nt=37496,it=37808,rt=37809,ot=37810,at=37811,st=37812,lt=37813,pt=37814,dt=37815,ct=37816,ht=37817,ut=37818,mt=37819,yt=37820,ft=37821,vt=36492,gt=2200,bt=2201,_t=2202,$t=2300,wt=2301,Mt=2302,xt=2400,At=2401,St=2402,Et=2500,Ct=2501,Tt=0,kt=1,Rt=2,Pt=3e3,Lt=3001,Ot=3200,Dt=3201,Ft=0,Nt=1,Bt="",Ut="srgb",It="srgb-linear",Gt=0,Ht=7680,jt=7681,qt=7682,Vt=7683,Wt=34055,zt=34056,Kt=5386,Yt=512,Zt=513,Xt=514,Jt=515,Qt=516,en=517,tn=518,nn=519,rn=35044,on=35048,an=35040,sn=35045,ln=35049,pn=35041,dn=35046,cn=35050,hn=35042,un="100",mn="300 es",yn=1035},6594:(e,t,n)=>{var i;n.r(t),n.d(t,{ifDefined:()=>B});const r=window,o=r.trustedTypes,a=o?o.createPolicy("lit-html",{createHTML:e=>e}):void 0,s=`lit$${(Math.random()+"").slice(9)}$`,l="?"+s,p=`<${l}>`,d=document,c=(e="")=>d.createComment(e),h=e=>null===e||"object"!=typeof e&&"function"!=typeof e,u=Array.isArray,m=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,y=/-->/g,f=/>/g,v=RegExp(">|[ \t\n\f\r](?:([^\\s\"'>=/]+)([ \t\n\f\r]*=[ \t\n\f\r]*(?:[^ \t\n\f\r\"'`<>=]|(\"|')|))|$)","g"),g=/'/g,b=/"/g,_=/^(?:script|style|textarea|title)$/i,$=e=>(t,...n)=>({_$litType$:e,strings:t,values:n}),w=($(1),$(2),Symbol.for("lit-noChange")),M=Symbol.for("lit-nothing"),x=new WeakMap,A=d.createTreeWalker(d,129,null,!1),S=(e,t)=>{const n=e.length-1,i=[];let r,o=2===t?"<svg>":"",l=m;for(let t=0;t<n;t++){const n=e[t];let a,d,c=-1,h=0;for(;h<n.length&&(l.lastIndex=h,d=l.exec(n),null!==d);)h=l.lastIndex,l===m?"!--"===d[1]?l=y:void 0!==d[1]?l=f:void 0!==d[2]?(_.test(d[2])&&(r=RegExp("</"+d[2],"g")),l=v):void 0!==d[3]&&(l=v):l===v?">"===d[0]?(l=null!=r?r:m,c=-1):void 0===d[1]?c=-2:(c=l.lastIndex-d[2].length,a=d[1],l=void 0===d[3]?v:'"'===d[3]?b:g):l===b||l===g?l=v:l===y||l===f?l=m:(l=v,r=void 0);const u=l===v&&e[t+1].startsWith("/>")?" ":"";o+=l===m?n+p:c>=0?(i.push(a),n.slice(0,c)+"$lit$"+n.slice(c)+s+u):n+s+(-2===c?(i.push(void 0),t):u)}const d=o+(e[n]||"<?>")+(2===t?"</svg>":"");if(!Array.isArray(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return[void 0!==a?a.createHTML(d):d,i]};class E{constructor({strings:e,_$litType$:t},n){let i;this.parts=[];let r=0,a=0;const p=e.length-1,d=this.parts,[h,u]=S(e,t);if(this.el=E.createElement(h,n),A.currentNode=this.el.content,2===t){const e=this.el.content,t=e.firstChild;t.remove(),e.append(...t.childNodes)}for(;null!==(i=A.nextNode())&&d.length<p;){if(1===i.nodeType){if(i.hasAttributes()){const e=[];for(const t of i.getAttributeNames())if(t.endsWith("$lit$")||t.startsWith(s)){const n=u[a++];if(e.push(t),void 0!==n){const e=i.getAttribute(n.toLowerCase()+"$lit$").split(s),t=/([.?@])?(.*)/.exec(n);d.push({type:1,index:r,name:t[2],strings:e,ctor:"."===t[1]?P:"?"===t[1]?O:"@"===t[1]?D:R})}else d.push({type:6,index:r})}for(const t of e)i.removeAttribute(t)}if(_.test(i.tagName)){const e=i.textContent.split(s),t=e.length-1;if(t>0){i.textContent=o?o.emptyScript:"";for(let n=0;n<t;n++)i.append(e[n],c()),A.nextNode(),d.push({type:2,index:++r});i.append(e[t],c())}}}else if(8===i.nodeType)if(i.data===l)d.push({type:2,index:r});else{let e=-1;for(;-1!==(e=i.data.indexOf(s,e+1));)d.push({type:7,index:r}),e+=s.length-1}r++}}static createElement(e,t){const n=d.createElement("template");return n.innerHTML=e,n}}function C(e,t,n=e,i){var r,o,a,s;if(t===w)return t;let l=void 0!==i?null===(r=n._$Cl)||void 0===r?void 0:r[i]:n._$Cu;const p=h(t)?void 0:t._$litDirective$;return(null==l?void 0:l.constructor)!==p&&(null===(o=null==l?void 0:l._$AO)||void 0===o||o.call(l,!1),void 0===p?l=void 0:(l=new p(e),l._$AT(e,n,i)),void 0!==i?(null!==(a=(s=n)._$Cl)&&void 0!==a?a:s._$Cl=[])[i]=l:n._$Cu=l),void 0!==l&&(t=C(e,l._$AS(e,t.values),l,i)),t}class T{constructor(e,t){this.v=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}p(e){var t;const{el:{content:n},parts:i}=this._$AD,r=(null!==(t=null==e?void 0:e.creationScope)&&void 0!==t?t:d).importNode(n,!0);A.currentNode=r;let o=A.nextNode(),a=0,s=0,l=i[0];for(;void 0!==l;){if(a===l.index){let t;2===l.type?t=new k(o,o.nextSibling,this,e):1===l.type?t=new l.ctor(o,l.name,l.strings,this,e):6===l.type&&(t=new F(o,this,e)),this.v.push(t),l=i[++s]}a!==(null==l?void 0:l.index)&&(o=A.nextNode(),a++)}return r}m(e){let t=0;for(const n of this.v)void 0!==n&&(void 0!==n.strings?(n._$AI(e,n,t),t+=n.strings.length-2):n._$AI(e[t])),t++}}class k{constructor(e,t,n,i){var r;this.type=2,this._$AH=M,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=n,this.options=i,this._$C_=null===(r=null==i?void 0:i.isConnected)||void 0===r||r}get _$AU(){var e,t;return null!==(t=null===(e=this._$AM)||void 0===e?void 0:e._$AU)&&void 0!==t?t:this._$C_}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=C(this,e,t),h(e)?e===M||null==e||""===e?(this._$AH!==M&&this._$AR(),this._$AH=M):e!==this._$AH&&e!==w&&this.$(e):void 0!==e._$litType$?this.T(e):void 0!==e.nodeType?this.k(e):(e=>u(e)||"function"==typeof(null==e?void 0:e[Symbol.iterator]))(e)?this.O(e):this.$(e)}S(e,t=this._$AB){return this._$AA.parentNode.insertBefore(e,t)}k(e){this._$AH!==e&&(this._$AR(),this._$AH=this.S(e))}$(e){this._$AH!==M&&h(this._$AH)?this._$AA.nextSibling.data=e:this.k(d.createTextNode(e)),this._$AH=e}T(e){var t;const{values:n,_$litType$:i}=e,r="number"==typeof i?this._$AC(e):(void 0===i.el&&(i.el=E.createElement(i.h,this.options)),i);if((null===(t=this._$AH)||void 0===t?void 0:t._$AD)===r)this._$AH.m(n);else{const e=new T(r,this),t=e.p(this.options);e.m(n),this.k(t),this._$AH=e}}_$AC(e){let t=x.get(e.strings);return void 0===t&&x.set(e.strings,t=new E(e)),t}O(e){u(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let n,i=0;for(const r of e)i===t.length?t.push(n=new k(this.S(c()),this.S(c()),this,this.options)):n=t[i],n._$AI(r),i++;i<t.length&&(this._$AR(n&&n._$AB.nextSibling,i),t.length=i)}_$AR(e=this._$AA.nextSibling,t){var n;for(null===(n=this._$AP)||void 0===n||n.call(this,!1,!0,t);e&&e!==this._$AB;){const t=e.nextSibling;e.remove(),e=t}}setConnected(e){var t;void 0===this._$AM&&(this._$C_=e,null===(t=this._$AP)||void 0===t||t.call(this,e))}}class R{constructor(e,t,n,i,r){this.type=1,this._$AH=M,this._$AN=void 0,this.element=e,this.name=t,this._$AM=i,this.options=r,n.length>2||""!==n[0]||""!==n[1]?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=M}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(e,t=this,n,i){const r=this.strings;let o=!1;if(void 0===r)e=C(this,e,t,0),o=!h(e)||e!==this._$AH&&e!==w,o&&(this._$AH=e);else{const i=e;let a,s;for(e=r[0],a=0;a<r.length-1;a++)s=C(this,i[n+a],t,a),s===w&&(s=this._$AH[a]),o||(o=!h(s)||s!==this._$AH[a]),s===M?e=M:e!==M&&(e+=(null!=s?s:"")+r[a+1]),this._$AH[a]=s}o&&!i&&this.P(e)}P(e){e===M?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=e?e:"")}}class P extends R{constructor(){super(...arguments),this.type=3}P(e){this.element[this.name]=e===M?void 0:e}}const L=o?o.emptyScript:"";class O extends R{constructor(){super(...arguments),this.type=4}P(e){e&&e!==M?this.element.setAttribute(this.name,L):this.element.removeAttribute(this.name)}}class D extends R{constructor(e,t,n,i,r){super(e,t,n,i,r),this.type=5}_$AI(e,t=this){var n;if((e=null!==(n=C(this,e,t,0))&&void 0!==n?n:M)===w)return;const i=this._$AH,r=e===M&&i!==M||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,o=e!==M&&(i===M||r);r&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t,n;"function"==typeof this._$AH?this._$AH.call(null!==(n=null===(t=this.options)||void 0===t?void 0:t.host)&&void 0!==n?n:this.element,e):this._$AH.handleEvent(e)}}class F{constructor(e,t,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){C(this,e)}}const N=r.litHtmlPolyfillSupport;null==N||N(E,k),(null!==(i=r.litHtmlVersions)&&void 0!==i?i:r.litHtmlVersions=[]).push("2.3.1");const B=e=>null!=e?e:M}},t={};function n(i){var r=t[i];if(void 0!==r)return r.exports;var o=t[i]={exports:{}};return e[i].call(o.exports,o,o.exports,n),o.exports}n.d=(e,t)=>{for(var i in t)n.o(t,i)&&!n.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n(5965)})();