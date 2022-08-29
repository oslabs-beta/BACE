import React from "react";
import {render} from 'react-dom';
import Dev from './components/Dev'


// what does it reurn? 
// const port = chrome.runtime.connect({
//   name: 'r3f-devtools',
// });


// port.onMessage.addListener((message, sender, sendResponse?:any) => {
//   //message is the information sent by the contentscript
//   console.log(message)
//   //sender is information about the chrome tab information such as tabid and other information
//   console.log(sender)
//   //send response is to send information back to the content scripts 

// })

chrome.runtime.onConnect.addListener(port => {
  port.onMessage.addListener(msg => {
    console.log(msg)
  });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => sendResponse('pong'));

// chrome.devtools.panels.themeName = 'default'

function Devtool() {
  return (
    <Dev/>
  ); 
}

render(<Devtool />, document.getElementById("devroot"))
