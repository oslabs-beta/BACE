/*in manifest.json, content scripts matches key allows us to choose which pages can be scripted and js key
 tells us which script can be run on the page */

//manipulate anything on the document
//how is our code grabbing information from the document 


chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(message: { txt: any; }, sender: any, sendResponse: any) {
  console.log(message.txt)
}



window.addEventListener('message', e => {
  if (e.source !== window ||
      typeof e.data !== 'object' ||
      e.data.id !== 'three-devtools') {
    return;
  }

  try {
    chrome.runtime.sendMessage(e.data);
  } catch (error) {
    console.error(error);
    chrome.runtime.sendMessage({
      type: 'error',
      id: 'three-devtools',
      //error handling 
      // data: error.toString(), 
    })
  }
})