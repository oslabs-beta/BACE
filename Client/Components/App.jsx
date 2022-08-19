import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './HomePage.jsx'
import Search from "./Search.jsx";
import React from 'react';
import SharedLayout from './SharedLayout.jsx'
import TestRoute from "./TestRoute.jsx";

//<h2>R3F Devtool</h2>
function App() {
  return (
  <BrowserRouter>
  <Routes>
    <Route path='/' element={<SharedLayout />}>
      {/* index will route to the same path it is nested in */}
    <Route index element={<HomePage/>}/>
    <Route path='/search' element={<Search/>}/>
    <Route path='/test' element={<TestRoute/>}/>
    {/* if not added the extension does not render, needs to be resolved*/}
    <Route path='*'/>
    </Route>
  </Routes>
  </BrowserRouter> 
  )

}


export default App;