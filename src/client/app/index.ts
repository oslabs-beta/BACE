import AppElement from './Element/AppElement';
import SceneViewElement from './Element/SceneViewElement';

import RendererViewElement from './Element/RendererViewElement';
import ResourcesViewElement from './Element/ResourcesViewElement';
import ParametersViewElement from './Element/ParametersViewElement';

import TitleBarElement from './Element/TitleBarElement';

import ImagePreviewElement from './Element/ImagePreviewElement';
import KeyValueElement from './Element/values/KeyValueElement';
import MaterialValueElement from './Element/values/MaterialValueElement';
import TextureValueElement from './Element/values/TextureValueElement';
import EnumValueElement from './Element/values/EnumValueElement';
import TabBarElement from './Element/TabBarElement';

import NumberInputElement from './common-elements/NumberInputElement';
import TreeItemElement from './common-elements/TreeItemElement';
import AccordianViewElement from './common-elements/AccordianViewElement';
import DevtoolsMessageElement from './common-elements/DevtoolsMessageElement';
import DevtoolsIconElement from './common-elements/DevtoolsIconButtonElement';
import DevtoolsButtonElement from './common-elements/DevtoolsButtonElement';
import DevtoolsIconButtonElement from './common-elements/DevtoolsIconButtonElement';
import IconElement from './common-elements/IconElement';
// import { customElement } from 'lit-element';

// const script: HTMLScriptElement = document.createElement('script')
// script.src = '../../../public/dist/webcomponent.js'
// script.async = false
// document.head.appendChild(script)

// script.onload = () => {
  customElements.define('r3f-devtools', AppElement);

  customElements.define('renderer-view', RendererViewElement);
  customElements.define('scene-view', SceneViewElement);

  customElements.define('resources-view', ResourcesViewElement);
  customElements.define('parameters-view', ParametersViewElement);

  customElements.define('title-bar', TitleBarElement);

  customElements.define('image-preview', ImagePreviewElement);
  customElements.define('key-value', KeyValueElement);
  customElements.define('material-value', MaterialValueElement);
  customElements.define('texture-value', TextureValueElement);
  customElements.define('enum-value', EnumValueElement);
  customElements.define('tab-bar', TabBarElement);

  customElements.define('number-input', NumberInputElement);
  customElements.define('tree-item', TreeItemElement);
  customElements.define('accordian-view', AccordianViewElement);
  customElements.define('devtools-message', DevtoolsMessageElement);
  customElements.define('devtools-icon', DevtoolsIconElement);
  customElements.define('devtools-button', DevtoolsButtonElement);
  customElements.define('devtools-icon-button', DevtoolsIconButtonElement);
  customElements.define('x-icon', IconElement);
// }

window.addEventListener('error', e => {
  // might need to adjust depending on what this app is called!
  // make sure it is of AppElement type
  const app = document.querySelector('r3f-devtools') as AppElement
  app.setError(e.message);
});

