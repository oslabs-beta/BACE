import React from "react";
import {render} from 'react-dom';
import Pop from './components/Pop'


chrome.windows.create(
  { focused: true, url: '/devtools.html', type: "popup", width: 380, height: window.screen.availHeight, setSelfAsOpener: true});
  
  chrome.runtime.onInstalled.addListener(function() {
    chrome.contextMenus.create({
      "id": "3toolsContextMenu",
      "title": "Open 3 tools in a panel",
      "contexts": ["all"]
    });
  });
  
  
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    //message is the information sent by the contentscript
    
    //sender is information about the chrome tab information such as tabid and other information
  
    //send response is to send information back to the content scripts 
  
  })

chrome.browserAction.onClicked.addListener(buttonClicked)

function buttonClicked(tab: any) {
  console.log(tab)
  let msg = {
    txt: "hello"
  }
  //sending message to specific tab
  chrome.tabs.sendMessage(tab.id, msg)
}

// function Popup() {
//   return (
//     <Pop/>
//   ); 
// }

// render(<Popup />, document.getElementById("root"))
