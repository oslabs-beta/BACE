// import React from "react";
// import {render} from 'react-dom';
// import Dev from './components/Dev'

console.log('this is at the start at devtools');

if (chrome.devtools.inspectedWindow.tabId) {
  // currently, only inspects content windows
  // not when debugging devtools panel for example
  // might need to add second param: options
  // chrome.devtools.inspectedWindow.eval(
  //   expression: string,
  //   options?: object,
  //   callback?: function,
  // )
  
  panelCreate()
  
  // chrome.devtools.inspectedWindow.eval(`window.DevToolsAPI`, (result: any) => {
  //   if (!result) {
  //     panelCreate();
  //   }
  // })

  // .then(([result, error]: [any, any]) => {
  //   if (!result) {
  //     panelCreate();
  //   }
  // })
}

// chrome.runtime.onConnect.addListener(port => {
//   port.onMessage.addListener(msg => {
//     if (msg.name === 'r3f-devtools') console.log('SUCCESS')
//     else console.log(msg)
//   });
// });

// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   if (message.tabId) panelCreate()
// })

function panelCreate() {
  chrome.devtools.panels.create('R3F-DevTool', '../assets/R3F.png', '../index.html')
}


// function Devtool() {
//   return (
//     <Dev/>
//   ); 
// }

// render(<Devtool />, document.getElementById("devroot"))

console.log('this is at the end of devtools');