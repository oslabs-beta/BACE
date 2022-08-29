import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import Search from "./page1/Search";
import LoadInfo from "./page2/LoadInfo"
import React from 'react';
import SharedLayout_pop from './SharedLayout';
import TestRoute from './TestRoute';

// const handleClick = () => {
//   console.log('button clicked')
//   const params = {
//     active: true,
//     currentWindow: true
//   }
//   chrome.tabs.query(params, function sendResponse(tabs: any) {
//     let message = { openWindow: 'open-window' }
//     chrome.tabs.sendMessage(tabs[0].id, message)
//   })
// }

function Pop() {
  return (
  // <BrowserRouter>
  // <Routes>
  //   <Route path='/' element={<SharedLayout_pop />}>
  //     {/* index will route to the same path it is nested in */}
  //     <Route index element={<HomePage/>}/>
  //     <Route path='/search' element={<Search/>}/>
  //     <Route path='/load' element={<LoadInfo/>}/>
  //     <Route path='/test' element={<TestRoute/>}/>
  //     {/* if not added the extension does not render, needs to be resolved*/}
  //     <Route path='*'/>
  //   </Route>
  // </Routes>
  // </BrowserRouter> 
  <div>
      <h3>ThreeDevTool</h3>
      {/* <h3>Would you like to run ThreeDevTool?</h3>
      <button id="start-dev" onClick={handleClick}>
        <strong>Yes</strong>
      </button> */}
  </div>
  )

}


export default Pop;