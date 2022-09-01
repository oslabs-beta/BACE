import { Link, Outlet } from 'react-router-dom';
import NavBar from './NavBar';
import React from 'react';

const SharedLayout = () => {
  return (
    <>
      <NavBar />
      {/* Allows for all routes to receive NavBar */}
      <Outlet />
    </>
  );
};
export default SharedLayout;