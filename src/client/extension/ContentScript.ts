// const script = document.createElement('script')

// async function createWindow() {
//   const params: chrome.windows.CreateData = {
//     focused: true, 
//     url: chrome.extension.getURL('devtools.html'), // chrome treats urls relative to extension root directory
//     type: 'popup',
//     width: 380, 
//     height: window.screen.availHeight, 
//     setSelfAsOpener: true
//   }

//   chrome.windows.create(params, popup => {
//     console.log('popup up!')
//   })
// }

// script.text = `
// window.__R3F_TOOLS__.addEventListener('devtools-ready', createWindow)
// window.__R3f_TOOLS__.dispatchEvent(')
// `

const script: any = document.createElement('script');
script.text = `
(() => {
/**
 * This script injected by the installed three.js developer
 * tools extension.
 * https://github.com/threejs/three-devtools
 */

const $devtoolsReady = Symbol('devtoolsReady');
const $backlog = Symbol('backlog');

// The __THREE_DEVTOOLS__ target is small and light-weight, and collects
// events triggered until the devtools panel is ready, which is when
// the events are flushed.
const target = new class ThreeDevToolsTarget extends EventTarget {
  constructor() {
    super();
    this[$devtoolsReady] = false;
    this[$backlog] = [];
    this.addEventListener('devtools-ready', e => {
      this[$devtoolsReady] = true;
      for (let event of this[$backlog]) {
        this.dispatchEvent(event);
      }
    }, { once: true });
  }

  dispatchEvent(event) {
    if (this[$devtoolsReady] || event.type === 'devtools-ready') {
      super.dispatchEvent(event);
    } else {
      this[$backlog].push(event);
    }
  }
}

Object.defineProperty(window, '__R3F_DEVTOOLS__', {
  value: target,
});
})();
`;

script.onload = () => {
  script.parentNode.removeChild(script);
}
(document.head || document.documentElement).appendChild(script);

window.addEventListener('message', e => {
  if (e.source !== window ||
      typeof e.data !== 'object' ||
      e.data.id !== 'three-devtools') {
    return;
  }

  try {
    chrome.runtime.sendMessage(e.data);
  } catch (error: any) {
    console.error(error);
    chrome.runtime.sendMessage({
      type: 'error',
      id: 'r3f-devtools',
      data: error.toString(), 
    });
  }
});