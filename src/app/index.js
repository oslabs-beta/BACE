import AppElement from './Element/AppElement.js';
import SceneViewElement from './Element/SceneViewElement.js';

window.customElements.define('r3f-devtools-app', AppElement);
window.customElements.define('scene-view', SceneViewElement);

window.addEventListener('error', e => {
  // might need to adjust depending on what this app is called!
  document.querySelector('r3f-devtools-app').setError(e.message);
});