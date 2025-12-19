import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import ProfileCard from '../components/auth/ProfileCard';

const ProfilePage = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800">My Profile</h1>
            <p className="text-gray-600">Manage your account and preferences</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <ProfileCard />
            </div>
            
            <div className="lg:col-span-2 space-y-6">
              {/* Reading History */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold mb-4">Recent Reading History</h3>
                <div className="space-y-4">
                  {[
                    { title: 'AI Revolution in Healthcare', time: '2 hours ago' },
                    { title: 'Global Economic Outlook 2024', time: '5 hours ago' },
                    { title: 'Climate Summit Agreements', time: '1 day ago' },
                  ].map((article, index) => (
                    <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{article.title}</p>
                        <p className="text-sm text-gray-500">{article.time}</p>
                      </div>
                      <button className="text-primary hover:underline text-sm">
                        Read Again
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Saved Articles Preview */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">Saved Articles</h3>
                  <button className="text-primary hover:underline">
                    View All
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {['Tech Trends 2024', 'Health Innovations', 'Space Exploration'].map((title, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-primary transition">
                      <h4 className="font-semibold mb-2">{title}</h4>
                      <p className="text-sm text-gray-600 mb-3">Saved 2 days ago</p>
                      <div className="flex space-x-2">
                        <button className="text-sm text-primary hover:underline">Read</button>
                        <button className="text-sm text-red-600 hover:underline">Remove</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
