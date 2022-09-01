
console.log('background loaded')

let isClicked = false;

chrome.action.onClicked.addListener(tab => {
  console.log('onClick SUCCESS')
  isClicked = true
  console.log('workworkwork')
  console.log(`isClicked is ${isClicked}`)
})

if (isClicked) {
  console.log(`isClicked is ${isClicked}`)

  const params = {
      active: true,
      currentWindow: true,
  }
  chrome.tabs.query(params, function(tabs: any) {
    chrome.tabs.sendMessage(tabs[0].id, 'injection-ready', 
      () => console.log('ThreeDevTools successfully sent message to ContentBridge!')
    );
  })

  console.log('chrome.tabs.query finished')

  chrome.runtime.onConnect.addListener(port => {

    console.log("port: ", port);
    
    const onMessage = (msg: any) => {
      console.log(msg.name); 
      if (msg.name === 'r3f-devtools') console.log('SUCCESS!!!')
    }
  
    port.onMessage.addListener(onMessage)
  })
}
// chrome.tabs.sendMessage(tabId, 'injection-ready')
// chrome.runtime.sendMessage('injection-ready', () => {
//   if (chrome.runtime.lastError) console.log('injection-ready not working')
//   else console.log('it worked???')
// })
// console.log('injection-ready message FIRED!!!')
// port.postMessage('injection-ready')

// chrome.runtime.onConnect.addListener(port => {

//   console.log("port: ", port);
  
//   const onMessage = (msg: any) => {
//     console.log(msg.name); 
//     if (msg.name === 'r3f-devtools') console.log('SUCCESS!!!')
//   }

//   port.onMessage.addListener(onMessage)
// })



  // const params = {
  //   active: true,
  //   currentWindow: true,
  // }
  // chrome.tabs.query(params, tabs => {
  //   const activeTabId = tabs[0].id as number
  //   chrome.tabs.sendMessage(activeTabId, { type: "cascade-trigger" })
  // })