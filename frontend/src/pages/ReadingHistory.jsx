import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { History, Clock, BookOpen, TrendingUp, Calendar, Award } from 'lucide-react';

const ReadingHistory = () => {
  const [readingHistory, setReadingHistory] = useState([]);
  const [filter, setFilter] = useState('all'); // 'all', 'completed', 'in-progress'
  const [stats, setStats] = useState({
    totalArticles: 0,
    totalTime: 0,
    completionRate: 0,
    averageProgress: 0
  });

  useEffect(() => {
    loadReadingHistory();
  }, []);

  const loadReadingHistory = () => {
    const history = JSON.parse(localStorage.getItem('readingHistory') || '[]');
    setReadingHistory(history);
    
    // Calculate stats
    if (history.length > 0) {
      const totalTime = history.reduce((acc, item) => acc + item.timeSpent, 0);
      const completed = history.filter(item => item.progress >= 90).length;
      const avgProgress = history.reduce((acc, item) => acc + item.progress, 0) / history.length;
      
      setStats({
        totalArticles: history.length,
        totalTime,
        completionRate: Math.round((completed / history.length) * 100),
        averageProgress: Math.round(avgProgress)
      });
    }
  };

  const clearHistory = () => {
    if (window.confirm('Are you sure you want to clear your reading history?')) {
      localStorage.removeItem('readingHistory');
      loadReadingHistory();
    }
  };

  const filteredHistory = readingHistory.filter(item => {
    if (filter === 'completed') return item.progress >= 90;
    if (filter === 'in-progress') return item.progress < 90;
    return true;
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const formatTime = (minutes) => {
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center">
            <History className="mr-3" />
            Reading History
          </h1>
          <p className="text-gray-600">Track your reading journey and progress</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Articles</p>
                <p className="text-2xl font-bold">{stats.totalArticles}</p>
              </div>
              <BookOpen className="text-primary" size={24} />
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Time</p>
                <p className="text-2xl font-bold">{formatTime(stats.totalTime)}</p>
              </div>
              <Clock className="text-green-500" size={24} />
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Completion Rate</p>
                <p className="text-2xl font-bold">{stats.completionRate}%</p>
              </div>
              <Award className="text-yellow-500" size={24} />
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Avg. Progress</p>
                <p className="text-2xl font-bold">{stats.averageProgress}%</p>
              </div>
              <TrendingUp className="text-blue-500" size={24} />
            </div>
          </div>
        </div>

        {/* Filters and Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <div className="flex space-x-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg transition ${
                filter === 'all' 
                  ? 'bg-primary text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Articles
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`px-4 py-2 rounded-lg transition ${
                filter === 'completed' 
                  ? 'bg-green-100 text-green-700 border border-green-300' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Completed
            </button>
            <button
              onClick={() => setFilter('in-progress')}
              className={`px-4 py-2 rounded-lg transition ${
                filter === 'in-progress' 
                  ? 'bg-blue-100 text-blue-700 border border-blue-300' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              In Progress
            </button>
          </div>
          
          <div className="flex space-x-3">
            <button
              onClick={loadReadingHistory}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
            >
              Refresh
            </button>
            <button
              onClick={clearHistory}
              className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition"
            >
              Clear History
            </button>
          </div>
        </div>

        {/* Reading History List */}
        {filteredHistory.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <History size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold mb-2">No Reading History Yet</h3>
            <p className="text-gray-600 mb-6">Start reading articles to track your progress here.</p>
            <Link
              to="/articles"
              className="inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition"
            >
              Browse Articles
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Article</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Progress</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Time Spent</th>
                    <th className="px6 py-4 text-left text-sm font-semibold text-gray-700">Last Read</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredHistory.map((item) => (
                    <tr key={item.articleId} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4">
                        <div>
                          <Link
                            to={`/articles/${item.articleId}`}
                            className="font-medium text-gray-900 hover:text-primary"
                          >
                            {item.articleTitle}
                          </Link>
                          <div className="flex items-center mt-1">
                            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                              {item.category}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <span className="font-medium">{item.progress}%</span>
                          <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${
                                item.progress >= 90 ? 'bg-green-500' : 
                                item.progress >= 50 ? 'bg-blue-500' : 'bg-yellow-500'
                              }`}
                              style={{ width: `${item.progress}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <Clock size={14} className="mr-2 text-gray-400" />
                          <span>{formatTime(item.timeSpent)}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <Calendar size={14} className="mr-2 text-gray-400" />
                          <span>{formatDate(item.lastRead)}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <Link
                            to={`/articles/${item.articleId}`}
                            className="px-3 py-1 bg-primary text-white text-sm rounded hover:bg-primary/90 transition"
                          >
                            {item.progress >= 90 ? 'Review' : 'Continue'}
                          </Link>
                          <button
                            onClick={() => {
                              const updatedHistory = readingHistory.filter(
                                h => h.articleId !== item.articleId
                              );
                              localStorage.setItem('readingHistory', JSON.stringify(updatedHistory));
                              loadReadingHistory();
                            }}
                            className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded hover:bg-gray-200 transition"
                          >
                            Remove
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Insights Section */}
        {readingHistory.length > 0 && (
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="font-bold text-lg mb-4">Reading Patterns</h3>
              <div className="space-y-4">
                {(() => {
                  const categories = {};
                  readingHistory.forEach(item => {
                    categories[item.category] = (categories[item.category] || 0) + 1;
                  });
                  
                  const mostRead = Object.entries(categories)
                    .sort((a, b) => b[1] - a[1])
                    .slice(0, 3);
                  
                  return mostRead.map(([category, count]) => (
                    <div key={category} className="flex items-center justify-between">
                      <span className="text-gray-700">{category}</span>
                      <div className="flex items-center space-x-3">
                        <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary rounded-full"
                            style={{ 
                              width: `${(count / readingHistory.length) * 100}%` 
                            }}
                          />
                        </div>
                        <span className="font-semibold">{count} articles</span>
                      </div>
                    </div>
                  ));
                })()}
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="font-bold text-lg mb-4">Weekly Goal</h3>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-32 h-32 rounded-full border-8 border-primary/20 mb-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold">{stats.completionRate}%</p>
                    <p className="text-sm text-gray-600">Completion Rate</p>
                  </div>
                </div>
                <p className="text-gray-600">
                  You've completed {readingHistory.filter(item => item.progress >= 90).length} out of {readingHistory.length} articles.
                </p>
                <button className="mt-4 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition">
                  Set Reading Goal
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReadingHistory;
