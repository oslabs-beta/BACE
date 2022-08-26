import { Link } from 'react-router-dom';
import React from 'react';

const NavBar = () => {
  return (
    <nav className='navbar'>
        <section><Link to='/'>Home Page</Link></section>
        <section><Link to='/search'>Search Obj</Link></section>
        <section><Link to='/load'>Load Info</Link></section>
        <section><Link to='/test'>Test Route</Link></section>
    </nav>
  );
};
export default NavBar;