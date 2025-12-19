import React from 'react';
import { Link } from 'react-router-dom';

const FeaturedTopics = () => {
  const topics = [
    { id: 1, name: 'Technology', count: 42, color: 'bg-blue-100 text-blue-800' },
    { id: 2, name: 'Politics', count: 38, color: 'bg-red-100 text-red-800' },
    { id: 3, name: 'Business', count: 35, color: 'bg-green-100 text-green-800' },
    { id: 4, name: 'Health', count: 28, color: 'bg-purple-100 text-purple-800' },
    { id: 5, name: 'Science', count: 24, color: 'bg-yellow-100 text-yellow-800' },
    { id: 6, name: 'Entertainment', count: 31, color: 'bg-pink-100 text-pink-800' },
  ];

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">Featured Topics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topics.map((topic) => (
            <Link 
              key={topic.id} 
              to={`/topics`}
              className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold">{topic.name}</h3>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${topic.color}`}>
                  {topic.count} articles
                </span>
              </div>
              <p className="text-gray-600 mt-3">
                Latest updates and analysis on {topic.name.toLowerCase()}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedTopics;
