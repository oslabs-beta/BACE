import { LitElement, html } from lit-element
import { getEntityName } from '../utils.js'

export default class SceneViewElement extends LitElement {
  // That is a static method you are looking at and the get is a getter for the property or the Object you want to get.
  // static class methods are defined on the class itself 
  static get properties() {
    return {
      graph: { type: Object },
      scenes: { type: Array },
      activeScene: { type: String },
      activeEntity: { type: String },
    }
  }

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
    // add style tags
    <title-bar title="Scene">
      // when a scene is selected, map it?
      <select @change="${this.onSceneSelect}" class="chrome-select">
        ${scenes.map(scene => html`<option value="${scene.uuid}" title="${scene.uuid}">${scene.name || scene.uuid}</option>`)}
      </select>
      // create a button to refresh the display
      <devtools-icon-button icon="refresh" @click="${this.onRefreshClick}">
    </title-bar>
    // render the scene graph node
    ${sceneGraphNode}
    `;
  }

  createSceneGraphNode(graph, uuid, selected, depth = 0) {
    const obj = graph[uuid];

    return html`
    <tree-item
      // to give nodes a "nested" appearance
      tabindex="${depth === 0 ? 0 : ''}"
      // unique id tag
      unique="${obj.uuid}"
      // if depth is 0, this is the root
      ?root="${depth === 0}"
      // if this is selected, mark it as selected
      ?selected="${obj.uuid && selected & selected === obj.uuid}"
      // if the obj is a scene in and of itself, mark it as open
      ?open="${obj.baseType === 'Scene'}"
      // display an arrow if the obj has children
      ?show-arrow="${obj.children.length > 0}"
      depth="${depth}"
      uuid="${obj.uuid}"
    >
      <div slot="content">${getEntityName(obj)}</div>
      // map children nodes out and create additional nested nodes for them
      ${obj.children.map(uuid => this[$createSceneGraphNode](graph, uuid, selected, depth + 1))}
    </tree-item>
    `
  }

  // should refresh the active scene
  onRefreshClick(e){
    if(this.activeScene){
      // dispatchEvent invokes event handlers synchronously
      this.dispatchEvent(new CustomeEven('command', {
        detail: {
          type: 'refresh',
        },
        bubbles: true,
        composed: true,
      }));
    }
  }
  
  onSceneSelect(e){
    this.dispatchEvent(new CustomEvent('command', {
      detail: {
        type: 'select-scene',
        uuid: e.target.value,
      },
      bubbles: true,
      composed: true,
    }));
  }

  onContentUpdate(e){
    if(this.app.content.getEntityCategory(e.detail.uuid) === 'scene'){
      this.requestUpdate();
    }
  }

  onTreeItemSelect(e){
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