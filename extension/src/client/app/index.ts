import AppElement from './Element/AppElement';
import SceneViewElement from './Element/SceneViewElement';

import NumberInputElement from './common-elements/NumberInputElement';
import TreeItemElement from './common-elements/TreeItemElement';
import AccordianViewElement from './common-elements/AccordianViewElement';
import DevtoolsMessageElement from './common-elements/DevtoolsMessageElement';
import DevtoolsIconElement from './common-elements/DevtoolsIconButtonElement';
import DevtoolsButtonElement from './common-elements/DevtoolsButtonElement';
import DevtoolsIconButtonElement from './common-elements/DevtoolsIconButtonElement';
import IconElement from './common-elements/IconElement';

window.customElements.define('r3f-devtools-app', AppElement);
window.customElements.define('scene-view', SceneViewElement);

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
  const app = document.querySelector('r3f-devtools-app') as AppElement
  app.setError(e.message);
});