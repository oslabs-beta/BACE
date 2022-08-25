import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import Search from "./page1/Search";
import LoadInfo from "./page2/LoadInfo"
import React from 'react';
import SharedLayout_pop from './SharedLayout';
import TestRoute from './TestRoute';

//<h2>R3F Devtool</h2>
function Pop() {
  return (
  <BrowserRouter>
  <Routes>
    <Route path='/' element={<SharedLayout_pop />}>
      {/* index will route to the same path it is nested in */}
      <Route index element={<HomePage/>}/>
      <Route path='/search' element={<Search/>}/>
      <Route path='/load' element={<LoadInfo/>}/>
      <Route path='/test' element={<TestRoute/>}/>
      {/* if not added the extension does not render, needs to be resolved*/}
      <Route path='*'/>
    </Route>
  </Routes>
  </BrowserRouter> 
  )

}


export default Pop;