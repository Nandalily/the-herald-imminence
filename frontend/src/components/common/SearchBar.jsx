import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setQuery('');
    }
  };

  const handleClear = () => {
    setQuery('');
  };

  const popularSearches = ['Technology', 'Politics', 'Health', 'Business', 'Science'];

  return (
    <div className="relative max-w-xl w-full">
      <form onSubmit={handleSearch} className="relative">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            placeholder="Search articles, topics, authors..."
            className="pl-10 pr-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            aria-label="Search news articles"
          />
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              aria-label="Clear search"
            >
              <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            </button>
          )}
        </div>
        <button
          type="submit"
          className="absolute right-1 top-1/2 transform -translate-y-1/2 hidden md:block"
          aria-label="Submit search"
        >
          <div className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition">
            Search
          </div>
        </button>
      </form>

      {/* Search Suggestions */}
      {isFocused && query && (
        <div className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200">
          <div className="p-4">
            <p className="text-sm text-gray-500 mb-2">Quick suggestions:</p>
            <div className="space-y-2">
              {popularSearches
                .filter(term => term.toLowerCase().includes(query.toLowerCase()))
                .map((term, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setQuery(term);
                      navigate(`/search?q=${encodeURIComponent(term)}`);
                    }}
                    className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded flex items-center space-x-2"
                  >
                    <Search className="h-4 w-4 text-gray-400" />
                    <span>{term}</span>
                  </button>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* Popular Searches */}
      {isFocused && !query && (
        <div className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200">
          <div className="p-4">
            <p className="text-sm font-medium text-gray-700 mb-3">Popular Searches</p>
            <div className="flex flex-wrap gap-2">
              {popularSearches.map((term, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setQuery(term);
                    navigate(`/search?q=${encodeURIComponent(term)}`);
                  }}
                  className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full text-sm transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
