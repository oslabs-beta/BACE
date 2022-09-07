import { LitElement, html } from '../../../web_modules/lit-element.js'
import { getEntityName, isUUID, getObjectByUUID } from '../utils.js';
import ChromeSelectStyle from './shared-styles/chrome-select.js';
import { ObjectTypes } from '../constants.js';

const $createSceneGraphNode = Symbol('createSceneGraphNode');
const $onRefreshClick = Symbol('onRefreshClick');
const $onSceneSelect = Symbol('onSceneSelect');
const $onContentUpdate = Symbol('onContentUpdate');
const $onTreeItemSelect = Symbol('onTreeItemSelect');
const $setInputUUID = Symbol('setInputUUID');

// global variable for inputUUID
let inputUUID = '';

export default class SceneViewElement extends LitElement {
  static get properties() {
    return {
      graph: { type: Object},
      scenes: { type: Array },
      activeScene: { type: String, },
      activeEntity: { type: String, },
    }
  }

  constructor() {
    super();
    this[$onRefreshClick] = this[$onRefreshClick].bind(this);
    this[$onTreeItemSelect] = this[$onTreeItemSelect].bind(this);
    this[$onContentUpdate] = this[$onContentUpdate].bind(this);
    this[$setInputUUID] = this[$setInputUUID].bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('tree-item-select', this[$onTreeItemSelect]);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('tree-item-select', this[$onTreeItemSelect]);
  }

  render() {
    const { activeScene, activeEntity, scenes, graph } = this;

    if (!scenes) {
      return html`<div></div>

      `;
    }


    let sceneGraphNode;
    if (graph && activeScene) {
      sceneGraphNode = this[$createSceneGraphNode](graph, activeScene, activeEntity);
    }

    
    return html`
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

  ${ChromeSelectStyle}
</style>
<title-bar title="Scene">
  <select @change="${this[$onSceneSelect]}" class="chrome-select">
    ${scenes.map(scene => html`<option value="${scene.uuid}" title="${scene.uuid}">${scene.name || scene.uuid}</option>`)}
  </select>
  <devtools-icon-button icon="refresh" @click="${this[$onRefreshClick]}">
</title-bar>
<input type="text" id="inputUUID" placeholder="Search Entities by UUID, Name or Type" @change="${this[$setInputUUID]}"></input>
${sceneGraphNode}
`;
  }
  // button here shows up in scene <button>Hi, I'm a button</button>

  [$createSceneGraphNode](graph, uuid, selected, depth=0) {
    const obj = graph[uuid];

    return html`
    <tree-item
      tabindex="${depth === 0 ? 0 : ''}"
      unique="${obj.uuid}"
      ?root="${depth === 0}"
      ?selected="${obj.uuid && selected && selected === obj.uuid}"
      ?open="${obj.baseType === 'Scene'}"
      ?show-arrow="${obj.children.length > 0}"
      depth="${depth}"
      uuid="${obj.uuid}"
      >
      <div slot="content">${getEntityName(obj)}</div>
      ${obj.children.map(uuid => this[$createSceneGraphNode](graph, uuid, selected, depth + 1))}
    </tree-item>
  `;
  }
// button here shows up in scene in the first page <button>Hi, I'm a button</button>

  [$setInputUUID](e) {
    inputUUID = e.target.value
    const keys = Object.keys(this.graph)
    if (isUUID(inputUUID)) {
      for (let key of keys) {
        if(getObjectByUUID(this.graph[key], inputUUID) != null) {
          // select this item from the tree
          this.dispatchEvent(new CustomEvent('command', {
            detail: {
              type: 'select-entity',
              uuid: inputUUID,
            },
            bubbles: true,
            composed: true,
          }));
          return;
        }
      }
      return getObjectByUUID(this.graph, inputUUID)
    } else if (ObjectTypes.includes(inputUUID) || inputUUID === 'Object3D') {
      for (let key of keys) {
        if (this.graph[key].baseType == inputUUID) {
          // select the first occurance of this type from the tree
          this.dispatchEvent(new CustomEvent('command', {
            detail: {
              type: 'select-entity',
              uuid: key,
            },
            bubbles: true,
            composed: true,
          }));
          return;
        } 
      }
      return;
    } else {
      for (let key of keys) {
        if (this.graph[key].name == inputUUID) {
          // select the first occurance of this name from the tree
          this.dispatchEvent(new CustomEvent('command', {
            detail: {
              type: 'select-entity',
              uuid: key,
            },
            bubbles: true,
            composed: true,
          }));
          return;
        }
      }
    }
  }

  [$onRefreshClick](e) {
    if (this.activeScene) {
      this.dispatchEvent(new CustomEvent('command', {
        detail: {
          type: 'refresh',
        },
        bubbles: true,
        composed: true,
      }));
    }
  }

  [$onSceneSelect](e) {
    this.dispatchEvent(new CustomEvent('command', {
      detail: {
        type: 'select-scene',
        uuid: e.target.value,
      },
      bubbles: true,
      composed: true,
    }));
  }

  [$onContentUpdate](e) {
    if (this.app.content.getEntityCategory(e.detail.uuid) === 'scene') {
      // Maybe the selector should be pulled into its own component,
      // this is a bit messy.
      this.requestUpdate();
    }
  }

  [$onTreeItemSelect](e) {
    e.stopPropagation();
    const treeItem = e.composedPath()[0];
    const uuid = treeItem.getAttribute('uuid');
    this.dispatchEvent(new CustomEvent('command', {
      detail: {
        type: 'select-entity',
        uuid,
      },
      bubbles: true,
      composed: true,
    }));
  }
}
