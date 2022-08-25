import React from "react";
import {render} from 'react-dom';
import Pop from './components/Pop'


chrome.windows.create(
  { focused: true, url: '/devtools.html', type: "popup", width: 380, height: window.screen.availHeight, setSelfAsOpener: true});



// function Popup() {
//   return (
//     <Pop/>
//   ); 
// }

// render(<Popup />, document.getElementById("root"))
