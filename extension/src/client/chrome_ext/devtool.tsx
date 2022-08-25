import React from "react";
import {render} from 'react-dom';
import Dev from './components/Dev'




//Theme changed depending on users settings 
//Will have the make writting dynamic if want to change this to default 



function handleShown() {

  console.log("panel is being shown");
  //used to modify when a user come to the panel
}

function handleHidden() {
  console.log("panel is being hidden");
  //used to modify what happens when a user leaves a panel
}


// const icon: string = '/assets/R3F.png';
// const url: string = '/devtools.html';
// const iconPath: string = '/assets/icon1.png'

//  chrome.devtools.panels.create(`r3f devtool`, icon, url, (panel: any) => {
 
//   panel.onShown.addListener(handleShown);
//   panel.onHidden.addListener(handleHidden);

  
//   const button = panel.createStatusBarButton(iconPath, 'statusbar', true)
//   button.onClicked.addListener(handleShown);
  
  
// });



// chrome.devtools.panels.themeName = 'default'

function Devtool() {
  return (
    <Dev/>
  ); 
}

render(<Devtool />, document.getElementById("devroot"))
