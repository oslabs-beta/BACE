import React from "react";
import {render} from 'react-dom';
import Pop from './components/Pop'



function Popup() {
  return (
    <Pop/>
  ); 
}

render(<Popup />, document.getElementById("root"))
