import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, Routes, Route } from 'react-router-dom';
import Navbar from '../components/navbar.tsx';
import LoginForm from '../components/loginForm.tsx';
import RegisterForm from '../components/registerForm.tsx';
import PostDetailPage from '../components/postDetails.tsx';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Asegúrate de que esto coincida con el elemento raíz de tu aplicación

interface Post {
  id: string; // Cambia el tipo de id a string si usas UUID
  title: string;
  content: string;
  image_url?: string;
  createdAt: string;
  User?: {
    username: string;
  };
}

const HomePage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get<Post[]>('https://apiblogplatform-production.up.railway.app/post');
        console.log(response.data); // Verifica los datos recibidos
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleClickOutsideModal = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).classList.contains('modal-overlay')) {
      closeModal();
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
        <h1 className="text-4xl font-bold mb-6">Welcome to Our Blog</h1>
        <p className="text-lg mb-6">Discover amazing content and join our community of writers and readers.</p>
        <div className="w-full max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link key={post.id} to={`/post/${post.id}`}>
              <div className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer transform transition duration-300 hover:scale-105">
                {post.image_url && <img src={post.image_url} alt={post.title} className="w-full h-48 object-cover" />}
                <div className="p-4">
                  <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
                  <p className="text-gray-700 mb-4">{post.content}</p>
                  {post.User && <p className="text-sm text-gray-500">By {post.User.username}</p>}
                  <p className="text-sm text-gray-500">{new Date(post.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/post/:id" element={<PostDetailPage />} />
      </Routes>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Add Comment"
        className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto mt-20 relative"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center modal-overlay"
        onClick={handleClickOutsideModal}
      >
        <h2 className="text-2xl mb-4">En construcción</h2>
        <p>Esta función está en desarrollo. ¡Vuelve pronto!</p>
        <div className="flex justify-end mt-4">
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
            onClick={closeModal}
          >
            Cancelar
          </button>
        </div>
      </Modal>
    </>
  );
};

export default HomePage;
