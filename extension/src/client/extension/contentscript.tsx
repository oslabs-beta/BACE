/*in manifest.json, content scripts matches key allows us to choose which pages can be scripted and js key
 tells us which script can be run on the page */

//manipulate anything on the document
//how is our code grabbing information from the document 

//listening for messages
// chrome.runtime.onMessage.addListener(gotMessage);

// function gotMessage(message:any, sender: any, sendResponse: any) {
//   console.log(message)
// }


// chrome.tabs.connect(tabId, name)


function ping() {
  chrome.runtime.sendMessage('ping', response => {
    if(chrome.runtime.lastError) {
      setTimeout(ping, 1000);
    } else {
      console.log("pong")
      // Do whatever you want, background script is ready now
    }
  });
}

ping();

window.addEventListener('message', e => {
  if (e.source !== window ||
      typeof e.data !== 'object' ||
      e.data.id !== 'r3f-devtools') {
    return;
  }

  try {
    chrome.runtime.sendMessage(e.data);
  } catch (error) {
    console.error(error);
    chrome.runtime.sendMessage({
      type: 'error',
      id: 'r3f-devtools',
      //error handling 
      // data: error.toString(), 
    })
  }
})