import React from "react";
import {render} from 'react-dom';
import Pop from './components/Pop'



//Needs to be created into a pop up settings
function Popup() {
  return (
    <Pop />
  );
}

render(<Popup />, document.getElementById("root"))
