// import { collapseTextChangeRangesAcrossMultipleVersions } from "typescript"

console.log('background loaded 2')

// let isClicked = false;

// chrome.action.onClicked.addListener(tab => {
  // chrome.tabs.create({ url: 'https://www.youtube.com' })

const connections = new Map()

// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   console.log('onMessage in background works')
//   if (message.name === 'r3f-devtools') {
//     console.log('connected')
//     chrome.runtime.sendMessage('Hi ContentScript')
//   }
//   else console.log('not connected')
// })
console.log("entering onConnect listener")

// onConnect wants you to go to a certain webpage
chrome.runtime.onConnect.addListener((port: any) => {
  console.log("port: ", port)
  let tabId: number;

  const onMessage = (message: any) => {
    console.log('onConnect', message.name)
    
    if (message.name === 'connect') {
      const queryOptions = { active: true, currentWindow: true };
      chrome.tabs.query(queryOptions, ([tab]) => {
        if (chrome.runtime.lastError)
          console.error(chrome.runtime.lastError);
        // `tab` will either be a `tabs.Tab` instance or `undefined`.
        else tabId = tab.id as number;

        if (tabId) {
          connections.set(tabId, port)
          console.log("connections: ", connections)
        }
      })
    }
  }

  port.onMessage.addListener(onMessage)

  port.onDisconnect.addListener((port: any) => {
    port.onMessage.removeListener(onMessage)
    connections.delete(tabId)
  })
})

chrome.runtime.onMessage.addListener((message: any, sender: any, sendResponse: any) => {
  if (sender.tab) {
    const tabId = sender.tab.id
    if (connections.has(tabId)) {
      const connPort = connections.get(tabId)
      connPort.postMessage(message)
    }
  }
  return true
})

// onCommitted wants you to stay on the main frame where frameId = 0
chrome.webNavigation.onCommitted.addListener(function(details) {
  // supporting top-level frameId for now
  console.log('these are the details in onCommitted in background.ts', details);
  console.log('this is the detail.tabId in onCommitted in background.ts', details.tabId);
  console.log('this is the detail.frameId in onCommitted in background.ts', details.frameId);
  console.log('connections inside onCommitted: ', connections)
  // if (details.frameId !== 0) return;
  if (details.frameId === 0) {
    console.log('onCommitted', details.tabId, connections.has(details.tabId))
    if (connections.has(details.tabId)) {
      const connPort = connections.get(details.tabId)
      connPort.postMessage({
        type: 'committed',
        id: 'r3f-devtools',
      });
    }
  }
})

// chrome.runtime.onMessage.addListener((message: any, sender: any, sendResponse: any) => {
//   // if (sender.tab) {
//   //   const tabId = sender.tab.id
//   //   if (connections.has(tabId)) connections.get(tabId).postMessage(message)
//   // }
//   if (message.parentFrameId) {
//     let parentFrameId = message.parentFrameId
    
//     if (parentFrameId === 0) {
//       console.log('onCommitted', sender.tabId, connections.has(sender.tabId))
//       if (connections.has(sender.tabId)) {
//         connections.get(sender.tabId).postMessage({
//           type: 'committed',
//           id: 'r3f-devtools',
//         });
//       }
//     }
//   }
//   // return true
// })

console.log('this is at the end of background.ts');