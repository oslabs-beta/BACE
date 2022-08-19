import { Link } from 'react-router-dom';
import React from 'react';

const Navbar = () => {
  return (
    <nav className='navbar'>
      <Link to='/'>Home Page</Link>
      <Link to='/search'>Search Obj</Link>
    </nav>
  );
};
export default Navbar;