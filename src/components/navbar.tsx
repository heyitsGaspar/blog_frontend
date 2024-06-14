import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/authContext.tsx';
const profileIcon = require('../assets/icons/userProfile.png'); // Importa el ícono de perfil
const Navbar = () => {
  const { isAuthenticated, handleLogout } = useAuth();

  return (
    <nav className="bg-white shadow p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold text-blue-900">
          <Link to="/">Blog-Poste</Link>
        </div>
        <div className="flex items-center">
          {isAuthenticated ? (
            <>
              <div className="mr-4 text-blue-900 font-semibold">Welcome, User</div>
              <button
                onClick={handleLogout}
                className="bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Logout
              </button>
              <Link to="/profile">
                <img
                  src={profileIcon}
                  alt="Profile"
                  className="ml-4 w-10 h-10 rounded-full"
                />
              </Link>
            </>
          ) : (
            <>
              <Link to="/login">
                <button className="bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                  Iniciar sesión
                </button>
              </Link>
              <Link to="/register">
                <button className="ml-4 bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                  Registrarse
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
