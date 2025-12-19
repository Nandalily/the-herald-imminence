import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './common/Header';
import Footer from './common/Footer';
import Navbar from './common/Navbar';

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
