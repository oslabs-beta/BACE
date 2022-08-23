import React from 'react';
import '../../../../../styles/search.css'

// object variable placeholder
let object: string = 'Object Test'

function ObjList() {
  return (
    <div>
      <div className="titleBox fs-5">
      <h6>Objects</h6>
      </div>
        <div>
          <div className="list-group list-group-light list-group-small"> 
            <button className="list-group-item list-group-item-action fs-6">Object 1</button>
            <button className="list-group-item list-group-item-action fs-6">{object}</button>
            <button className="list-group-item list-group-item-action fs-6">Object 3 </button>
            <button className="list-group-item list-group-item-action fs-6">Object 4</button>
            <button className="list-group-item list-group-item-action fs-6">Object 5</button>
            <button className="list-group-item list-group-item-action fs-6">Object 6</button>
          </div>
        </div>
    </div>
  )
}






export default ObjList