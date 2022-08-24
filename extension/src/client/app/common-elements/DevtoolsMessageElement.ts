import { LitElement, html } from 'lit-element';

export default class DevtoolsMessageElement extends LitElement {
  render(): any {
    return html`
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
    `;
  }
}