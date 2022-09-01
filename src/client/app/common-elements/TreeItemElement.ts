import { LitElement, html } from 'lit-element';

// const onClick = Symbol('onClick');
// const onDoubleClick = Symbol('onDoubleClick');
// const onKeyDown = Symbol('onKeyDown');
// const onArrowClick = Symbol('onArrowClick');
// const onTreeItemSelect = Symbol('onTreeItemSelect');
// const addListeners = Symbol('addListeners');
// const removeListeners = Symbol('removeListeners');
// const connected = Symbol('connected');
// const listening = Symbol('listening');
const ObservedKeys = [
  'ArrowRight',
  'ArrowLeft',
  'ArrowUp',
  'ArrowDown',
]

export default class TreeItemElement extends LitElement {

  unique: string;
  showArrow: boolean;
  depth: number;
  root: boolean;
  selected: boolean;
  open: boolean;
  listening: boolean;
  connected: boolean;

  constructor() {
    super();
    this.onKeyDown = this.onKeyDown.bind(this);

    this.unique = '';
    this.open = false;
    this.showArrow = false;
    this.depth = 0;
    this.root = false;
    this.selected = false;
    
    this.listening = false;
    this.connected = false;
  }

  connectedCallback(): any {
    super.connectedCallback();
    this.connected = true;
    this.addListeners();
  }

  disconnectedCallback(): any {
    this.removeListeners();
    this.connected = false;
    super.disconnectedCallback();
  }

  shouldUpdate(changed: any): any {
    if(changed.has('root')){
      if(this.root){
        this.addListeners();
      } else {
        this.removeListeners();
      }
    }

    return true;
  }

  // getTreeItemChildren(): any {
  //   if(this.shadowRoot !== null ){
  //    return this.shadowRoot.querySelector('#children').assignedElements();
  //   }
  // }
  
  getTreeItemChildren() {
    if (this.shadowRoot) {
      const sRoot = this.shadowRoot.querySelector('#children');
      if (sRoot) {
        return sRoot.assignedElements();
      }
    }
  }

  getSelected(): any {
    if(!this.root) {
      console.warn('Must be called on root');
      return
    }

    const queue: any = [this];
    for(let item of queue) {
      if(item.selected){
        return item;
      }
      queue.push(...item.getTreeItemChildren());
    }
  }

  select(): void {
    this.dispatchEvent(new CustomEvent('tree-item-select', {
      detail: {},
      bubbles: true,
      composed: true
    }))
  }

  onKeyDown(e: any): void {
    if(ObservedKeys.indexOf(e.key) === -1) {
      return;
    }

    const currentSelection: any = this.getSelected();
    if(!currentSelection) {
      return;
    }

    const open: any = currentSelection.open;
    let parent: any = currentSelection.parentElement;
    let parentNext: any = parent ? parent.nextElementSibling : null;
    let children: any = currentSelection.getTreeItemChildren();
    let next: any = currentSelection.nextElementSibling;
    let previous: any = currentSelection.previousElementSibling;
    let previousLastChild: any = null;

    // there are notes on the original on this part
    if(!parent || !parent.getTreeItemChildren) {
      parent = null;
    }
    if(!parentNext || !parent.getTreeItemChildren) {
      parentNext = null;
    }
    if(!next || !next.getTreeItemChildren) {
      next = null;
    }
    if(!previous || !previous.getTreeItemChildren) {
      previous = null;
    }
    if(previous){
      const previousChildren: any =  previous.getTreeItemChildren();
      previousLastChild = previousChildren.length ? previousChildren[previousChildren.length - 1]: null;
    }

    let newSelection: any = null;
    switch(e.key) {
      case 'ArrowLeft':
        if(open && children.length) {
          currentSelection.open = false;
        } else if (parent) {
          newSelection = parent;
        }
        break;
      case 'ArrowRight':
        if(open && children.length) {
          newSelection = children[0];
        } else if (!open && children.length) {
          currentSelection.open = true;
        }
        break;
      case 'ArrowDown':
        if(open && children.length) {
          newSelection = children[0];
        } else if(next) {
          newSelection = next;
        } else if(parentNext) {
          newSelection = parentNext;
        }
        break;
      case 'ArrowUp':
        if(previous) {
          if(previous.open && previousLastChild) {
            newSelection = previousLastChild;
          } else {
            newSelection = previous;
          }
        } else if (parent) {
          newSelection = parent;
        }
        break;
    }

    if(newSelection) {
      e.preventDefault();
      newSelection.select();
    }
  }

  onArrowClick(e: any) {
    if(this.getTreeItemChildren().length) {
      e.stopPropagation();
      this.open = !this.open;
    }
  }

  onClick(e: any) {
    e.stopPropagation();
    this.select();
  }

  onDoubleClick(e: any) {
    e.stopPropagation();
    this.open = !this.open;
  }

  onTreeItemSelect(e: any) {
    if(!this.root) {
      return;
    }

  const selected: any = e.composedPath()[0];
  const currentSelection: any = this.getSelected();

  if(selected !== currentSelection) {
    if(currentSelection) {
      currentSelection.selected = false;
    }
    selected.focus();
  } else {
    e.stopPropagation();
  }
}

addListeners(): void {
  if(this.root && this.connected && !this.listening){
    this.addEventListener('keydown', this.onKeyDown);
    this.addEventListener('tree-item-select', this.onTreeItemSelect);
    this.listening = true;
  }
}
removeListeners(): void {
  this.removeEventListener('keydown', this.onKeyDown);
  this.removeEventListener('tree-item-select', this.onTreeItemSelect);
  this.listening = false;
}

render(): any {
  if(!this.unique) {
    console.warn(`TreeItemElement's 'unique' attribute not set.`);
  }
  return html`
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
  style="--depth:${this.depth || 0}"
  @click="${this.onClick}"
  @dblclick="${this.onDoubleClick}">
  <div class="arrow-block" @click="${this.onArrowClick}"> 
    <div class="arrow"></div>
  </div>
  <slot name="content"></slot>
</div>
<slot id="children"></slot> 
  `;
}
}