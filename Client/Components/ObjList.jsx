import React from 'react';
import styles from '../Styles/objlist.css'

// object variable placeholder
let object = 'Object Test'

//handling the clicked inspected element ---> this is just a placeholder
const handleClick = event => {
  const object = event.target.value;

  return object;
} 

// onclick={handleClick()}
// Value of onclick to manipulate object directly with the value of the 3d object 
// object = event.target.value 

function ObjList(styles) {
  return (
    <div>
      <h3 className={styles.titleBox}>Objects</h3>
      <div>
        <div className={styles.listBox}>
          <ul> 
            <li>Object 1</li>
            <li>{object}</li>
            <li>Object 3</li>
            <li>Object 4</li>
            <li>Object 5</li>
            <li>Object 6</li>
          </ul>
        </div>
      </div>
    </div>
  )
}






export default ObjList