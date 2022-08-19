import { Link, Outlet } from 'react-router-dom';
import NavBar from './NavBar.jsx';
import React from 'react';

const SharedLayout = () => {
  return (
    <>
      <NavBar />
      {/* Allows for all routes to recive NavBar */}
      <Outlet />
    </>
  );
};
export default SharedLayout;