import utils from '../content/utils';
import TransformControls from '../content/TransformControls';
import EntityCache from '../content/EntityCache';
import ThreeDevTools from '../content/ThreeDevTools';
import DevToolsScene from '../content/DevToolsScene';
// import InstrumentedToJSON from '../content/toJSON';
import THREE from 'three';

// const version = chrome.runtime.getManifest().version;
// const red = 'rgb(255, 137, 137)';
// const green = 'rgb(190, 251, 125)'
// const blue = 'rgb(120, 250, 228)';

/*
TODO: add the following line after const THREE = (${THREE})();
and before const EntityCache = (${EntityCache})();

  (${TransformControls})(THREE);
  const DevToolsScene = (${DevToolsScene})(THREE);

*/

export default `
(() => {
  const DEBUG = false;
  const utils = (${utils})();
  const THREE = (${THREE})();
  (${TransformControls})(THREE);
  const DevToolsScene = (${DevToolsScene})(THREE);
  const EntityCache = (${EntityCache})();
  const devtools = new (${ThreeDevTools})(window.__R3F_DEVTOOLS__);
  window.__R3F_DEVTOOLS__.dispatchEvent(new CustomEvent('devtools-ready'));
})();
};
`;

// window.addEventListener('cascade-trigger', event => {
//   if (event.data.type === 'cascade-trigger') {
//     chrome.runtime.sendMessage('devtools-ready')
//     // window.dispatchEvent(new CustomEvent('devtools-ready'));
//   }
// })

// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   if (message === 'injection-ready') {
//     chrome.runtime.sendMessage('received injection-ready', () => {
//       if (chrome.runtime.lastError) console.log('injection-ready not working')
//       else console.log('it worked???')
//     })
//     window.postMessage({
//       id: 'r3f-devtools',
//       type: 'injection',
//       data,
//     }, '*');
//   }
//   else console.log('ERR: injection-ready is not actually ready')
// })

// console.log('%c▲%cthree-devtools%cv${version}',
//   'font-size:150%; color:${green}; text-shadow: -10px 0px ${red}, 10px 0px ${blue}; padding: 0 15px 0 10px;',
//   'font-size: 110%; background-color: #666; color:white; padding: 0 5px;',
//   'font-size: 110%; background-color: ${blue}; color:#666; padding: 0 5px;');


// put after devtools variable:
  // window.__R3F_DEVTOOLS__.dispatchEvent(new CustomEvent('devtools-ready'));
//   const InstrumentedToJSON = (${InstrumentedToJSON})(); was originally inside of the export statement -- can add back if we need this toJSON file

