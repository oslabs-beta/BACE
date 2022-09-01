import { LitElement, html } from 'lit-element';
import { getEntityName } from '../../utils';

export default class TextureValueElement extends LitElement {
  uuid?: string;
  app: any;

  onActivate(e: any) {
    this.app.dispatchEvent(new CustomEvent('select-entity', { detail: {
      uuid: this.uuid,
    }}));
  }

  render() {
    const texture: any = null; // does this not need to be initialized???
    if (!texture) {
      return null;
    }
    const name = getEntityName(texture);
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
        <div id="icon" style="background-image:url(${texture.image})"></div>
        <div id="name">${name}</div>
      </div>
    `;
  }
}