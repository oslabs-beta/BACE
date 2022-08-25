import { LitElement, html, customElement, property } from 'lit-element'
import { getEntityName } from '../utils'
import ChromeSelectStyle from './shared-styles/chrome-select';

@customElement('scene-view-element')
export default class SceneViewElement extends LitElement {
  // That is a static method you are looking at and the get is a getter for the property or the Object you want to get.
  // static class methods are defined on the class itself 
  @property({ type: Object, }) graph: {[key: string]:any} = {};
  @property({ type: Array, }) scenes: Array<any> = [];
  @property({ type: String, }) activeScene: string | null = null;
  @property({ type: String, }) activeEntity: string = 'scene';
  @property({ type: Object, }) app: {[key: string]:any} = {};
  // static get properties() {
  //   return {
  //     graph: { type: Object },
  //     scenes: { type: Array },
  //     activeScene: { type: String },
  //     activeEntity: { type: String },
  //   }
  // }

  constructor() {
    super();
    // bind functions here
    this.onRefreshClick = this.onRefreshClick.bind(this);
    this.onTreeItemSelect = this.onTreeItemSelect.bind(this);
    this.onContentUpdate = this.onContentUpdate.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('tree-item-select', this.onTreeItemSelect);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('tree-item-select', this.onTreeItemSelect);
  }

  render() {
    // if no scenes on the page
    if (!this.scenes) {
      return html`<div></div>`; // return empty div
    }

    // if there are scenes on the page
    let sceneGraphNode;

    // if there is an active scene and a graph exists
    if (this.graph && this.activeScene) {
      // create a new scene graph node with helper function defined below
      sceneGraphNode = this.createSceneGraphNode(this.graph, this.activeScene, this.activeEntity)
    }

    // return the scene
    // from litElement/html
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
      // when a scene is selected, map it?
      <select @change="${this.onSceneSelect}" class="chrome-select">
        ${this.scenes.map((scene: {[key: string]:string}) => html`<option value="${scene.uuid}" title="${scene.uuid}">${scene.name || scene.uuid}</option>`)}
      </select>
      // create a button to refresh the display
      <devtools-icon-button icon="refresh" @click="${this.onRefreshClick}">
    </title-bar>
    // render the scene graph node
    ${sceneGraphNode}
    `;
  }

  createSceneGraphNode(graph: {[key: string]:{[key: string]:any}}, uuid: string, selected: string, depth: number = 0) {
    const obj: {[key: string]:any} = graph[uuid];

    return html`
    <tree-item
      // to give nodes a "nested" appearance
      tabindex="${depth === 0 ? 0 : ''}"
      // unique id tag
      unique="${obj.uuid}"
      // if depth is 0, this is the root
      ?root="${depth === 0}"
      // if this is selected, mark it as selected
      ?selected="${obj.uuid && selected && selected === obj.uuid}"
      // if the obj is a scene in and of itself, mark it as open
      ?open="${obj.baseType === 'Scene'}"
      // display an arrow if the obj has children
      ?show-arrow="${obj.children.length > 0}"
      depth="${depth}"
      uuid="${obj.uuid}"
    >
      <div slot="content">${getEntityName(obj)}</div>
      // map children nodes out and create additional nested nodes for them
      ${obj.children.map((uuid:string) => this.createSceneGraphNode(graph, uuid, selected, depth + 1))}
    </tree-item>
    `
  }

  // should refresh the active scene
  onRefreshClick(e:any){
    if(this.activeScene){
      // dispatchEvent invokes event handlers synchronously
      this.dispatchEvent(new CustomEvent('command', {
        detail: {
          type: 'refresh',
        },
        bubbles: true,
        composed: true,
      }));
    }
  }
  
  onSceneSelect(e:any){
    this.dispatchEvent(new CustomEvent('command', {
      detail: {
        type: 'select-scene',
        uuid: e.target.value,
      },
      bubbles: true,
      composed: true,
    }));
  }

  onContentUpdate(e:any){
    if(this.app.content.getEntityCategory(e.detail.uuid) === 'scene'){
      this.requestUpdate();
    }
  }

  onTreeItemSelect(e:any){
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