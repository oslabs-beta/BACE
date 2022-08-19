import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './HomePage.jsx'
import Search from "./Search.jsx";
import React from 'react';

//<h2>R3F Devtool</h2>
function App() {
  return (
  <BrowserRouter>
  <Routes>
    <Route path='/' element={<SharedLayout />}>
      {/* index will route to the same path it is nested in */}
    <Route index element={<HomePage/>}/>
    <Route path='/search' element={<Search/>}/>
    {/* Catch all routes incase of error */}
    <Route path='*' element={<h2>404 Page Not Found</h2>}/>
    </Route>
  </Routes>
  </BrowserRouter> 
  )

}


export default App;