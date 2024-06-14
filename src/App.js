import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/homePage.tsx';
import LoginForm from './components/loginForm.tsx';
import RegisterForm from './components/registerForm.tsx';
import { AuthProvider } from './context/authContext.tsx';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
