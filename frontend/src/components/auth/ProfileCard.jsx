import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { User, Mail, Calendar, Settings, LogOut } from 'lucide-react';

const ProfileCard = () => {
  const { user, logout } = useAuth();

  if (!user) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 text-center">
        <div className="w-20 h-20 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
          <User className="w-10 h-10 text-gray-400" />
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">Not Signed In</h3>
        <p className="text-gray-600 mb-6">Sign in to access your profile</p>
        <a
          href="/login"
          className="inline-block bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition"
        >
          Sign In
        </a>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-primary to-accent p-6 text-white">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
            <User className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">{user.name}</h2>
            <p className="text-white/80">News Enthusiast</p>
          </div>
        </div>
      </div>

      {/* Profile Details */}
      <div className="p-6 space-y-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <Mail className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium">{user.email}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Calendar className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Member Since</p>
              <p className="font-medium">December 2024</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 pt-4 border-t">
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">42</p>
            <p className="text-sm text-gray-600">Articles Read</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">18</p>
            <p className="text-sm text-gray-600">Topics Followed</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">7</p>
            <p className="text-sm text-gray-600">Comments</p>
          </div>
        </div>

        {/* Actions */}
        <div className="pt-6 border-t space-y-3">
          <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition">
            <Settings className="w-5 h-5" />
            <span>Account Settings</span>
          </button>
          
          <button
            onClick={logout}
            className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition"
          >
            <LogOut className="w-5 h-5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
