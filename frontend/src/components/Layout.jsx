import React from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Header from './common/Header';
import Navbar from './common/Navbar';
import Footer from './common/Footer';

const Layout = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Navbar />
      
      {/* Auth Status Bar */}
      <div className="bg-gray-50 border-b">
        <div className="container mx-auto px-4 py-2">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              {user ? (
                <span>Welcome back, <strong className="text-primary">{user.name}</strong>!</span>
              ) : (
                <span>Welcome to The Herald Imminence</span>
              )}
            </div>
            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  <a href="/profile" className="text-sm text-primary hover:underline">
                    My Profile
                  </a>
                  <a href="/dashboard" className="text-sm text-primary hover:underline">
                    Dashboard
                  </a>
                  <button
                    onClick={logout}
                    className="text-sm text-red-600 hover:underline"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <a href="/login" className="text-sm text-primary hover:underline">
                    Sign In
                  </a>
                  <a 
                    href="/register" 
                    className="text-sm bg-primary text-white px-4 py-1 rounded hover:bg-primary/90 transition"
                  >
                    Sign Up
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
