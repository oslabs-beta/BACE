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



window.customElements.define('r3f-devtools', AppElement);

window.customElements.define('renderer-view', RendererViewElement);
window.customElements.define('scene-view', SceneViewElement);

window.customElements.define('resources-view', ResourcesViewElement);
window.customElements.define('parameters-view', ParametersViewElement);

window.customElements.define('title-bar', TitleBarElement);

window.customElements.define('image-preview', ImagePreviewElement);
window.customElements.define('key-value', KeyValueElement);
window.customElements.define('material-value', MaterialValueElement);
window.customElements.define('texture-value', TextureValueElement);
window.customElements.define('enum-value', EnumValueElement);
window.customElements.define('tab-bar', TabBarElement);

window.customElements.define('number-input', NumberInputElement);
window.customElements.define('tree-item', TreeItemElement);
window.customElements.define('accordian-view', AccordianViewElement);
window.customElements.define('devtools-message', DevtoolsMessageElement);
window.customElements.define('devtools-icon', DevtoolsIconElement);
window.customElements.define('devtools-button', DevtoolsButtonElement);
window.customElements.define('devtools-icon-button', DevtoolsIconButtonElement);
window.customElements.define('x-icon', IconElement);

window.addEventListener('error', e => {
  // might need to adjust depending on what this app is called!
  // make sure it is of AppElement type
  const app = document.querySelector('r3f-devtools') as AppElement
  app.setError(e.message);
});

