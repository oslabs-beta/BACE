//context menu for opening 3 tools
chrome.runtime.onInstalled.addListener(function() {
  chrome.contextMenus.create({
    "id": "3toolsContextMenu",
    "title": "Open 3 tools in a panel",
    "contexts": ["all"]
  });
});

//
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  //message is the information sent by the contentscript
  
  //sender is information about the chrome tab information such as tabid and other information

  //send response is to send information back to the content scripts 

})

/***************************************************************************************************** */
console.log('in a panel', chrome.devtools);


//this shoudl probably live else where lik in  contentbridge
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