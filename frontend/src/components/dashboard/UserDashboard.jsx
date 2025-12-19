import React from 'react';
import { Bookmark, Clock, Settings, User } from 'lucide-react';

const UserDashboard = () => {
  const stats = [
    { icon: <Bookmark />, label: 'Saved Articles', value: '24', color: 'bg-blue-500' },
    { icon: <Clock />, label: 'Reading Time', value: '18h', color: 'bg-green-500' },
    { icon: <User />, label: 'Following', value: '12', color: 'bg-purple-500' },
    { icon: <Settings />, label: 'Topics', value: '6', color: 'bg-yellow-500' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center space-x-4">
              <div className={`${stat.color} p-3 rounded-lg text-white`}>
                {stat.icon}
              </div>
              <div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-4">Recent Activity</h3>
          <ul className="space-y-3">
            {['Read "AI Ethics"', 'Saved "Climate Report"', 'Commented on "Tech Trends"', 'Followed "Science"'].map((activity, i) => (
              <li key={i} className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span>{activity}</span>
                <span className="text-gray-500 text-sm ml-auto">2h ago</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-4">Recommended Topics</h3>
          <div className="flex flex-wrap gap-2">
            {['Artificial Intelligence', 'Sustainable Energy', 'Space Exploration', 'Digital Health', 'Fintech', 'Cybersecurity'].map((topic) => (
              <span key={topic} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                {topic}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
