import React from 'react';
import HeroSection from '../components/home/HeroSection';
import FeaturedTopics from '../components/home/FeaturedTopics';
import LatestInsights from '../components/home/LatestInsights';

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <FeaturedTopics />
      <LatestInsights />
      <section className="py-12 container mx-auto px-4">
        <div className="bg-gradient-to-r from-primary to-accent rounded-2xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Never Miss an Update</h2>
          <p className="text-xl mb-6 max-w-2xl mx-auto">
            Subscribe to our newsletter for daily insights and breaking news
          </p>
          <div className="max-w-md mx-auto flex gap-2">
            <input 
              type="email" 
              placeholder="Your email address"
              className="flex-grow px-4 py-3 rounded-lg text-gray-800"
            />
            <button className="bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
