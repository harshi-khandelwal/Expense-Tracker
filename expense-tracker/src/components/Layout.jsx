// src/components/Layout.jsx
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
  <Navbar />
  <div className="pt-24 px-4 bg-gray-100 dark:bg-gray-900"> 
    <Outlet />
  </div>
  <Footer />
</div>

  );
};

export default Layout;
