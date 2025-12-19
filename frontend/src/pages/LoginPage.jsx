import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm';

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link to="/" className="flex justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-primary">The Herald Imminence</h1>
            <p className="text-gray-600">Sign in to continue</p>
          </div>
        </Link>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <LoginForm />
        
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Want to browse without signing in?{' '}
            <Link to="/" className="text-primary font-semibold hover:underline">
              Explore as guest
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
