import { Link } from 'react-router-dom';
import React from 'react';

const NavBar = () => {
  return (
    <nav className='navbar'>
      <ul>
        <li><Link to='/'>Home Page</Link></li>
        <li><Link to='/search'>Search Obj</Link></li>
        <li><Link to='/test'>Test Route</Link></li>
      </ul> 
    </nav>
  );
};
export default NavBar;