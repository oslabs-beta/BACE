console.log('in a panel', chrome.devtools);

const port = chrome.runtime.connect({
  name: 'r3f-devtools', // may change if we decide on a name
});

port.postMessage({
  name: 'connect',
  tabId: chrome.devtools.inspectedWindow.tabId,
});

port.onDisconnect.addListener(request => {
  console.log('disconnected from background');
});

port.onMessage.addListener(request => {
  console.log('panel request receive', request);
});

// may change param if we decide on a name?
chrome.devtools.inspectedWindow.eval('__R3F_DEVTOOLS__.updateScenes()');