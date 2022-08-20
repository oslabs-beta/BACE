import AppElement from './Element/AppElement';
import SceneViewElement from './Element/SceneViewElement';

window.customElements.define('r3f-devtools-app', AppElement);
window.customElements.define('scene-view', SceneViewElement);

window.addEventListener('error', e => {
  // might need to adjust depending on what this app is called!
  // make sure it is of AppElement type
  const app = document.querySelector('r3f-devtools-app') as AppElement
  app.setError(e.message);
});