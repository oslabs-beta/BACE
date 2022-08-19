import React from "react";
import {render} from 'react-dom';

function Popup() {
  return (
    <div>
      <h1>Hello World</h1>
      <p>this is a test</p>
    </div>
  ); 
}

render(<Popup />, document.getElementById("root"))