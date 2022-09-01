import { LitElement, html } from 'lit-element';
import { hexNumberToCSSString } from '../../utils';

export default class MaterialValueElement extends LitElement {
  app: any;
  uuid?: string;
  material: any;

  onActivate(e: any) {
    this.app.dispatchEvent(new CustomEvent('select-entity', {
      detail: {
        uuid: this.uuid,
      }
    }))
  }
  
  render() {
    // was originally const material = null but not sure how that would ever be changed??
    const material = this.material;

    if (!material) return null;

    const color = material.color ? hexNumberToCSSString(material.color) : 'white';
    return html`
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
      <div id="icon" style="background-color:${color}"></div>
      <div id="name">${material.type}</div>
    </div>
    `;
  }
}