import React from "react";
import {render} from 'react-dom';
import Pop from './components/Pop'

const url: string = 'devtools.html'

const params: chrome.windows.CreateData & chrome.windows.UpdateInfo = {
  focused: true, 
  left: 0,
  top: 0,
  width: 380,
  height: window.screen.availHeight,
  setSelfAsOpener: true,
  type: 'popup',
  url: chrome.runtime.getURL(url)
}
chrome.windows.create(params)



//Needs to be created into a pop up settings
function Popup() {
  return (
    <Pop/>
  );
}

render(<Popup />, document.getElementById("root"))
