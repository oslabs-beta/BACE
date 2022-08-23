import React from 'react';
import ObjList from "./ObjList"
import SearchBar from "./SearchBar"
import '../../../../../styles/search.css'
import 'bootstrap/dist/css/bootstrap.css';




function Search() {
  return (
    <div id="container">
      <SearchBar />
      <ObjList />
    </div>
  )
}

export default Search;