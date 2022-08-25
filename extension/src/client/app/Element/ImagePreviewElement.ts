import { LitElement, html, customElement, property } from 'lit-element';

@customElement('image-preview-element')
export default class ImagePreviewElement extends LitElement {
  @property({ type: Number, reflect: true }) width;
  @property({ type: Number, reflect: true }) height;
  uuid: string = '';

  constructor() {
    super();
    this.width = 0;
    this.height = 0;
  }

  render() {
    const image: any = null; // this.getEntity() ??
    if (!image) {
      return html`None`;
    }

    console.log('render image preview', image);
    return html`
    <style>
      :host {
        width: 100%;
        display: block;
      }
      img {
        width: 100%;
        height: auto;
        display: block;
      }
      .dimensions {
        text-align: center;
      }
    </style>
    <img @load="${this.onLoad}" @click="${this.onActivate}" src="${image.url}" />
    <div class="dimensions">${this.width + ' x ' + this.height}</div>
    `;
  }

  onLoad(e: any) {
    const image = e.composedPath()[0];
    this.width = image.naturalWidth;
    this.height = image.naturalHeight;
  }

  onActivate() {
    this.dispatchEvent(new CustomEvent('select-entity', {
      detail: {
        uuid: this.uuid,
      },
      bubbles: true,
      composed: true,
    }))
  }
}