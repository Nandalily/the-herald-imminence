import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { History } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', label: 'Home', icon: null },
    { path: '/topics', label: 'Topics', icon: null },
    { path: '/articles', label: 'Articles', icon: null },
    { path: '/dashboard', label: 'Dashboard', icon: null },
    { path: '/reading-history', label: 'History', icon: <History size={16} /> },
  ];

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex space-x-6 py-3">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-1 ${
                location.pathname === item.path
                  ? 'bg-primary text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {item.icon && <span>{item.icon}</span>}
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
