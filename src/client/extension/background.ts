// import { collapseTextChangeRangesAcrossMultipleVersions } from "typescript"

console.log('background loaded')

// let isClicked = false;

// chrome.action.onClicked.addListener(tab => {
  // chrome.tabs.create({ url: 'https://www.youtube.com' })

const connections = new Map()

chrome.runtime.onConnect.addListener((port: any) => {
  console.log("port: ", port)
  let tabId: number;
  const onMessage = (message: any) => {
    tabId = message.tabId
    console.log('onConnect', tabId, message.name)
    if (message.name === 'connect') {
      console.log("connecting!")
      connections.set(tabId, port)
      console.log("connections: ", connections)
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
    if (connections.has(tabId)) connections.get(tabId).postMessage(message)
  }
  return true
})

chrome.webNavigation.onCommitted.addListener(function(details) {
  // supporting top-level frameId for now
  if (details.frameId !== 0) return;
  console.log('onCommitted', details.tabId, connections.has(details.tabId))
  if (connections.has(details.tabId)) {
    connections.get(details.tabId).postMessage({
      type: 'committed',
      id: 'r3f-devtools',
    });
  }
})

console.log('this is at the end of background.ts');
  // const params = {
  //     active: true,
  //     currentWindow: true,
  // }


  // chrome.tabs.query(params, function(tabs: any) {
  //   console.log(tabs)
  //   // chrome.devtools.panels.create('R3F')
  //   chrome.tabs.sendMessage(tabs[0].id, 'injection-ready', 
  //     () => {
  //       if (chrome.runtime.lastError) console.log('ERROR')
  //     }
  //   );
  // })