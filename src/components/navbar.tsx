import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/authContext.tsx';

const profileIcon = require('../assets/icons/userProfile.png'); // Importa el ícono de perfil

const Navbar = () => {
  const { isAuthenticated, handleLogout } = useAuth();
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleClickOutsideModal = (e) => {
    if (e.target.classList.contains('modal-overlay')) {
      closeModal();
    }
  };

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
                onClick={openModal}
                className="bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Add Post
              </button>
              <button
                onClick={handleLogout}
                className="bg-blue-900 ml-4 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
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
      {showModal && (
        <div
          className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75 z-50 modal-overlay"
          onClick={handleClickOutsideModal}
        >
          <div className="bg-white p-6 rounded-lg relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">En construcción</h2>
              <p>Esta función está en desarrollo. Vuelve pronto!</p>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
