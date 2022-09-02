console.log("we can import things -- NOT sad :D -- index.ts")

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
console.log('this is in the start of index.ts 9');

// script.onload = () => {
// window.customElements.define('r3f-devtools', AppElement);

// window.customElements.define('renderer-view', RendererViewElement);
// window.customElements.define('scene-view', SceneViewElement);

// window.customElements.define('resources-view', ResourcesViewElement);
// window.customElements.define('parameters-view', ParametersViewElement);

// window.customElements.define('title-bar', TitleBarElement);

// window.customElements.define('image-preview', ImagePreviewElement);
// window.customElements.define('key-value', KeyValueElement);
// window.customElements.define('material-value', MaterialValueElement);
// window.customElements.define('texture-value', TextureValueElement);
// window.customElements.define('enum-value', EnumValueElement);
// window.customElements.define('tab-bar', TabBarElement);

// window.customElements.define('number-input', NumberInputElement);
// window.customElements.define('tree-item', TreeItemElement);
// window.customElements.define('accordian-view', AccordianViewElement);
// window.customElements.define('devtools-message', DevtoolsMessageElement);
// window.customElements.define('devtools-icon', DevtoolsIconElement);
// window.customElements.define('devtools-button', DevtoolsButtonElement);
// window.customElements.define('devtools-icon-button', DevtoolsIconButtonElement);
// window.customElements.define('x-icon', IconElement);
// }

// console.log('this is in the start of index.ts 5');

// customElements.define('r3f-devtools', AppElement);

// customElements.define('renderer-view', RendererViewElement);
// customElements.define('scene-view', SceneViewElement);

// customElements.define('resources-view', ResourcesViewElement);
// customElements.define('parameters-view', ParametersViewElement);

// customElements.define('title-bar', TitleBarElement);

// customElements.define('image-preview', ImagePreviewElement);
// customElements.define('key-value', KeyValueElement);
// customElements.define('material-value', MaterialValueElement);
// customElements.define('texture-value', TextureValueElement);
// customElements.define('enum-value', EnumValueElement);
// customElements.define('tab-bar', TabBarElement);

// customElements.define('number-input', NumberInputElement);
// customElements.define('tree-item', TreeItemElement);
// customElements.define('accordian-view', AccordianViewElement);
// customElements.define('devtools-message', DevtoolsMessageElement);
// customElements.define('devtools-icon', DevtoolsIconElement);
// customElements.define('devtools-button', DevtoolsButtonElement);
// customElements.define('devtools-icon-button', DevtoolsIconButtonElement);
// customElements.define('x-icon', IconElement);

// if(!window.customElements.get('r3f-devtools')) { window.customElements.define('r3f-devtools', AppElement);}

// if(!window.customElements.get('renderer-view')) { window.customElements.define('renderer-view', RendererViewElement);}
// if(!window.customElements.get('scene-view')) window.customElements.define('scene-view', SceneViewElement);

// if(!window.customElements.get('resources-view')) window.customElements.define('resources-view', ResourcesViewElement);
// if(!window.customElements.get('parameters-view')) window.customElements.define('parameters-view', ParametersViewElement);

// if(!window.customElements.get('title-bar')) window.customElements.define('title-bar', TitleBarElement);

// if(!window.customElements.get('image-preview')) window.customElements.define('image-preview', ImagePreviewElement);
// if(!window.customElements.get('key-value')) window.customElements.define('key-value', KeyValueElement);
// if(!window.customElements.get('material-value')) window.customElements.define('material-value', MaterialValueElement);
// if(!window.customElements.get('texture-value')) window.customElements.define('texture-value', TextureValueElement);
// if(!window.customElements.get('enum-value')) window.customElements.define('enum-value', EnumValueElement);
// if(!window.customElements.get('tab-bar')) window.customElements.define('tab-bar', TabBarElement);

// if(!window.customElements.get('number-input')) window.customElements.define('number-input', NumberInputElement);
// if(!window.customElements.get('tree-item')) window.customElements.define('tree-item', TreeItemElement);
// if(!window.customElements.get('accordian-view')) window.customElements.define('accordian-view', AccordianViewElement);
// if(!window.customElements.get('devtools-message')) window.customElements.define('devtools-message', DevtoolsMessageElement);
// if(!window.customElements.get('devtools-icon')) window.customElements.define('devtools-icon', DevtoolsIconElement);
// if(!window.customElements.get('devtools-button')) window.customElements.define('devtools-button', DevtoolsButtonElement);
// if(!window.customElements.get('devtools-icon-button')) window.customElements.define('devtools-icon-button', DevtoolsIconButtonElement); 
// if(!window.customElements.get('x-icon')) window.customElements.define('x-icon', IconElement);

console.log('custom elements are defined, we will see about the event listener :(')

window.addEventListener('error', e => {
  // might need to adjust depending on what this app is called!
  // make sure it is of AppElement type
  console.log('error: ', e)
  const app = document.querySelector('r3f-devtools') as AppElement
  app.setError(e.message);
});

console.log('this is at the end of index.ts')