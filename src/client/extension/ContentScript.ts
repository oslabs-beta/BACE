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

console.log('this is at the start of content script');

const port = chrome.runtime.connect({ name: 'r3f-devtools' });
console.log("this is port in content script: ", port)
// notify background port that tools panel is open

port.postMessage({ name: 'connect' });

console.log("port has posted a message")

port.onDisconnect.addListener((req: object) => {
  console.error('disconnected from background', req)
});

// port.onMessage.addListener((e: any) => {
//   console.log("INSIDE PORT.ONMESSAGE LISTENER!!")
//   onMessage(e);
//   console.log(e)
// })

port.onMessage.addListener((function(msg) {
  console.log('before sending out msg.data')
  if (msg) {
    port.postMessage(msg)
  }
}))

// chrome.runtime.onMessage.addListener((message: any, sender: any, sendResponse: any) => {
//   console.log(message)
//   this.onMessage(message);
// })

// chrome.runtime.sendMessage({ name: 'r3f-devtools' }, (res) => {
//   console.log('got response from background saying: ')
//   if (chrome.runtime.lastError) console.log("BOO ERROR: ", chrome.runtime.lastError)
//   else console.log(res.json())
// })


// function onMessage(request: any) {
//   console.log("inside onMessage in ContentScript!")
//   const { id, type, data } = request;
//   console.log("going to post message from port")
//   port.postMessage(data)
//   // chrome.runtime.sendMessage(data, (response) => {
//   //   console.log(response)
//   //   if (chrome.runtime.lastError) console.log(chrome.runtime.lastError || 'ERROR in ContentScript')
//   // })
// }

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
    console.log("inside ThreeDevToolsTarget but not devtools ready :(");
    this.addEventListener('devtools-ready', e => {
      console.log("WHOA DEVTOOLS-READY!?");
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

console.log('this is at the end of content script')