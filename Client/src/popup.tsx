import React from "react";
import {render} from 'react-dom';
import App from '../Components/App'

function Popup() {
  return (
    <App/>
  ); 
}

render(<Popup />, document.getElementById("root"))
