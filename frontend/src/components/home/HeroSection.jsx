import React from 'react';

const HeroSection = () => {
  return (
    <div className="relative bg-gradient-to-r from-primary to-accent text-white py-16 px-4">
      <div className="container mx-auto text-center">
        <h1 className="text-5xl font-bold mb-4">Stay Informed with The Herald Imminence</h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Your trusted source for breaking news, in-depth analysis, and insightful commentary
        </p>
        <div className="flex justify-center space-x-4">
          <button className="bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
            Explore Topics
          </button>
          <button className="border-2 border-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition">
            Latest News
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
