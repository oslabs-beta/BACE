import React from "react";
import {render} from 'react-dom';
import App from './components/App'

function Popup() {
  return (
    <App/>
  ); 
}

render(<Popup />, document.getElementById("root"))
