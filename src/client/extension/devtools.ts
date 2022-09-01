// import React from "react";
// import {render} from 'react-dom';
// import Dev from './components/Dev'


// port.onMessage.addListener((message, sender, sendResponse?:any) => {
//   //message is the information sent by the contentscript
//   console.log(message)
//   //sender is information about the chrome tab information such as tabid and other information
//   console.log(sender)
//   //send response is to send information back to the content scripts 

// })

chrome.runtime.onConnect.addListener(port => {
  port.onMessage.addListener(msg => {
    if (msg.name === 'r3f-devtools') console.log('SUCCESS')
    else console.log(msg)
  });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.tabId) panelCreate()
})

function panelCreate() {
  chrome.devtools.panels.create('R3F-DevTool', '../assets/R3F.png', '../index.html')
}

// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => sendResponse('pong'));

// chrome.devtools.panels.themeName = 'default'

// function Devtool() {
//   return (
//     <Dev/>
//   ); 
// }

// render(<Devtool />, document.getElementById("devroot"))
