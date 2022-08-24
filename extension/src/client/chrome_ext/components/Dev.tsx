import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';
import HomePage from './HomePage';
import Search from "./page1/Search";
import SharedLayout_pop from './SharedLayout';
import TestRoute from './TestRoute';
import '../../../../../styles/global.css';
import Collapse from "@kunukn/react-collapse";
import LoadInfo from './page2/LoadInfo';

/*
NOTE for SearchBar: 
- user searches in search bar 
- object list updates and re-renders based on user's query
  to only show relevant query results (objects)
*/

/*
* user clicks object in object list
* panel popup below object list of LoadInfo component
* // use redis database (in-memory) to store objects on the scene

* 1. add user click functionality to object list
* 2. once user clicks send props of object ID (or any other object identifier) passed to LoadList
* 3. onClick of object list grab event.target to load specific object info
*/


function Dev() {
  return (
 
    <div>
      <Search/>
      <LoadInfo/>
    </div>
   

    
  
  )

}


export default Dev;