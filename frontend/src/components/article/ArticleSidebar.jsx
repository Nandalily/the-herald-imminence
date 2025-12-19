import React from 'react';
import { TrendingUp, BookOpen, Users, BarChart } from 'lucide-react';

const ArticleSidebar = ({ stats, author }) => {
  const relatedArticles = [
    { id: 2, title: 'The Future of Telemedicine', readTime: 5 },
    { id: 3, title: 'AI Ethics in Healthcare', readTime: 7 },
    { id: 4, title: 'Digital Health Startups to Watch', readTime: 4 },
  ];

  return (
    <div className="space-y-6">
      {/* Author Card */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-16 h-16 rounded-full overflow-hidden">
            <img 
              src={author.avatar} 
              alt={author.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="font-bold text-lg">{author.name}</h3>
            <p className="text-gray-600 text-sm">{author.bio}</p>
          </div>
        </div>
        <button className="w-full py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition">
          Follow Author
        </button>
      </div>

      {/* Article Stats */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="font-bold text-lg mb-4 flex items-center">
          <BarChart className="mr-2" size={20} />
          Article Stats
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Views</span>
            <span className="font-semibold">{stats.views.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Likes</span>
            <span className="font-semibold">{stats.likes}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Shares</span>
            <span className="font-semibold">{stats.shares}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Comments</span>
            <span className="font-semibold">{stats.comments}</span>
          </div>
        </div>
      </div>

      {/* Related Articles */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="font-bold text-lg mb-4 flex items-center">
          <BookOpen className="mr-2" size={20} />
          Related Articles
        </h3>
        <div className="space-y-4">
          {relatedArticles.map((article) => (
            <div key={article.id} className="pb-4 border-b border-gray-100 last:border-0 last:pb-0">
              <h4 className="font-semibold hover:text-primary cursor-pointer">
                {article.title}
              </h4>
              <div className="flex items-center justify-between mt-2">
                <span className="text-sm text-gray-500">{article.readTime} min read</span>
                <button className="text-primary text-sm hover:underline">
                  Read →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trending Topics */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="font-bold text-lg mb-4 flex items-center">
          <TrendingUp className="mr-2" size={20} />
          Trending Topics
        </h3>
        <div className="flex flex-wrap gap-2">
          {['Artificial Intelligence', 'Digital Health', 'Machine Learning', 'Healthcare Tech'].map((topic) => (
            <span 
              key={topic}
              className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm hover:bg-blue-100 cursor-pointer transition"
            >
              {topic}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArticleSidebar;
