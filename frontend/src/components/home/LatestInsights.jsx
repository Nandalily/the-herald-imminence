import React from 'react';
import { Link } from 'react-router-dom';

const LatestInsights = () => {
  const articles = [
    { id: 1, title: 'AI Revolution in Healthcare', excerpt: 'How artificial intelligence is transforming patient care...', author: 'Dr. Sarah Chen', date: '2 hours ago', category: 'Technology' },
    { id: 2, title: 'Global Economic Outlook 2024', excerpt: 'Experts predict economic trends for the coming year...', author: 'Michael Torres', date: '5 hours ago', category: 'Business' },
    { id: 3, title: 'Climate Summit Agreements', excerpt: 'Key outcomes from the international climate conference...', author: 'Elena Rodriguez', date: '1 day ago', category: 'Science' },
    { id: 4, title: 'New Tech Startup Ecosystem', excerpt: 'Emerging startups shaping the future of technology...', author: 'Alex Johnson', date: '2 days ago', category: 'Technology' },
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Latest Insights</h2>
          <Link to="/articles" className="text-primary hover:underline font-semibold">
            View All →
          </Link>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {articles.map((article) => (
            <article key={article.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                    {article.category}
                  </span>
                  <span className="text-gray-500 text-sm">{article.date}</span>
                </div>
                <h3 className="text-xl font-bold mb-3">
                  <Link to={`/articles/${article.id}`} className="hover:text-primary transition">
                    {article.title}
                  </Link>
                </h3>
                <p className="text-gray-600 mb-4">{article.excerpt}</p>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">By {article.author}</span>
                  <Link 
                    to={`/articles/${article.id}`}
                    className="text-primary hover:underline font-medium"
                  >
                    Read Full Article →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestInsights;
