import { LitElement, svg, html } from 'lit-element';

// https://lit.dev/docs/api/templates/
// this link will tell us what svg will do

export default class IconElement extends LitElement {
  // static get properties() {
  //   return {
      icon: String = ''; // we set to empty string
      fill: Boolean =  true; // we set to true
  //   }
  // }

  render(): any {
    const iconName = `${this.icon}${this.fill? '' : '-outline'}`;
    return html`
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
<i class="fa fa-${iconName}"></i>
    `;
  }

}

// do we need fontawesome.css then? or we can just delete?