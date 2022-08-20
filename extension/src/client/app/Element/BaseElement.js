import { LitElement } from 'lit-element';

export default class BaseElement extends LitElement {
  static get properties() {
    return {
      // id for each element
      uuid: { type: String, reflect: true },
    };
  }
}
