import React from 'react';
import { Bell, Sun, Moon } from 'lucide-react';
import SearchBar from './SearchBar';
import { useAuth } from '../../contexts/AuthContext';

const Header = () => {
  const { user } = useAuth();
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">HI</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">The Herald Imminence</h1>
              <p className="text-xs text-gray-500">Trusted News Source</p>
            </div>
          </div>

          {/* Search Bar - Hidden on small screens */}
          <div className="hidden lg:block flex-grow max-w-xl mx-8">
            <SearchBar />
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5 text-gray-600" />
              ) : (
                <Moon className="h-5 w-5 text-gray-600" />
              )}
            </button>

            {/* Notifications */}
            <button
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5 text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* User Menu */}
            {user ? (
              <div className="flex items-center space-x-3">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-3">
                <p className="text-sm text-gray-600">Welcome to The Herald Imminence</p>
              </div>
            )}
          </div>
        </div>

        {/* Search Bar for mobile */}
        <div className="lg:hidden pb-4">
          <SearchBar />
        </div>
      </div>
    </header>
  );
};

export default Header;
