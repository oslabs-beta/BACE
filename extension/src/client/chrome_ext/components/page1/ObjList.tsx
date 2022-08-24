import React from 'react';
import '../../../../../styles/search.css'
import LoadInfo from "./../page2/LoadInfo"

// object variable placeholder

const entity: any = {
  Type: {
    name: 'Type',
    type: 'string',
    prop: 'baseType',
  },
  UUID: {
    name: 'UUID',
    type: 'string',
    prop: 'uuid',
  },
  Name: {
    name: 'Name',
    type: 'string',
    prop: 'name',
  }
};

/*
 * input objectID
 * output object's three.js property info (ex. material)
 * pass output info as props to LoadInfo Component
*/
/* How to extract ID?
 * set id when creating objectList as id HTML element attribute
 * extract id thru event.target.id
*/

// recieves an ObjectUUID to be passed down to LoadInfo
function handleInfo(entity: any) {
  entity.UUID

}


const objects: JSX.Element[] = []
//
const objectList = () => {
  // i < graph.length
  for (let i = 0; i < 5; i++) {
    //passed into objecct should be graph[uuid].name
    // passed into handleInfo graph[uuid], which should be an object,
    // that contains all sorts of properties
    objects.push(
    <button className="list-group-item list-group-item-action fs-6" onClick={handleInfo()}>{entity.name.name}</button>
    )
  }
}

function ObjList() {
  return (
    <div>
      <div className="titleBox fs-5">
      <h6>Objects</h6>
      </div>
        <div>
          <div className="list-group list-group-light list-group-small"> 
            {objects}
          </div>
        </div>
    </div>
  )
}






export default ObjList