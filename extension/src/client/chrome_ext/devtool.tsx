import React from "react";
import {render} from 'react-dom';

 
const icon = 'extension/public/assets/R3F.png';
const url = 'extension/public/devtools.html';
chrome.devtools.panels.create(`r3f devtool`, icon, url, function(panel){

} );

function Devtool() {
  return (
   <h1>finally</h1>
  ); 
}

render(<Devtool />, document.getElementById("devroot"))
