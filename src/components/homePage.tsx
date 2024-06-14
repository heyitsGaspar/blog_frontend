// HomePage.jsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from '../components/navbar.tsx';
import LoginForm from '../components/loginForm.tsx';
import RegisterForm from '../components/registerForm.tsx';

const HomePage = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
        <h1 className="text-4xl font-bold mb-6">Welcome to Our Blog</h1>
        <p className="text-lg mb-6">Discover amazing content and join our community of writers and readers.</p>
      </div>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
      </Routes>
    </>
  );
};

export default HomePage;
