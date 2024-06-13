import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold mb-6">Welcome to Our Blog</h1>
      <p className="text-lg mb-6">
        Discover amazing content and join our community of writers and readers.
      </p>
      <div className="flex space-x-4">
        <Link to="/register" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
          Register
        </Link>
        <Link to="/login" className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded">
          Login
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
