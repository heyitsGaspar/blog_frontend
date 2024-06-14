// HomePage.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Route, Routes } from 'react-router-dom';
import Navbar from '../components/navbar.tsx';
import LoginForm from '../components/loginForm.tsx';
import RegisterForm from '../components/registerForm.tsx';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Asegúrate de que esto coincida con el elemento raíz de tu aplicación

interface Comment {
  id: number;
  content: string;
  user_id: string;
  createdAt: string;
}

interface Post {
  id: number;
  title: string;
  content: string;
  image_url?: string;
  createdAt: string;
  User?: {
    username: string;
  };
  Comments?: Comment[];
}

const HomePage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [authToken, setAuthToken] = useState<string | null>(null); // Agrega esto para manejar el token de autorización

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

    const token = localStorage.getItem('authToken'); // Asume que el token de autorización está guardado en localStorage
    setAuthToken(token);

    fetchPosts();
  }, []);

  const openModal = (post: Post) => {
    setSelectedPost(post);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setNewComment("");
  };

  const handleAddComment = async () => {
    if (!newComment || !selectedPost || !authToken) return;
  
    try {
      const response = await axios.post<Comment>(
        `https://apiblogplatform-production.up.railway.app/post/${selectedPost.id}/comments`,
        {
          content: newComment,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`, // Asegúrate de usar 'Bearer' y el token correcto
            'Content-Type': 'application/json'
          }
        }
      );
      console.log(response.data); // Verifica los datos recibidos
      setPosts(posts.map(post => 
        post.id === selectedPost.id ? { ...post, Comments: post.Comments ? [...post.Comments, response.data] : [response.data] } : post
      ));
      closeModal();
    } catch (error) {
      console.error('Error adding comment:', error);
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
            <div key={post.id} className="bg-white shadow-md rounded-lg overflow-hidden">
              {post.image_url && <img src={post.image_url} alt={post.title} className="w-full h-48 object-cover" />}
              <div className="p-4">
                <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
                <p className="text-gray-700 mb-4">{post.content}</p>
                {post.User && <p className="text-sm text-gray-500">By {post.User.username}</p>}
                <p className="text-sm text-gray-500">{new Date(post.createdAt).toLocaleDateString()}</p>
                <div className="mt-4">
                  <h3 className="text-lg font-semibold">Comments:</h3>
                  {post.Comments && post.Comments.map((comment) => (
                    <div key={comment.id} className="mt-2 border-t border-gray-200 pt-2">
                      <p className="text-gray-700">{comment.content}</p>
                      <p className="text-sm text-gray-500">By {comment.user_id}</p> {/* Ajusta esto según sea necesario */}
                      <p className="text-sm text-gray-500">{new Date(comment.createdAt).toLocaleDateString()}</p>
                    </div>
                  ))}
                  <button 
                    className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={() => openModal(post)}
                  >
                    Add Comment
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
      </Routes>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Add Comment"
        className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto mt-20"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <h2 className="text-2xl mb-4">Add Comment</h2>
        <textarea 
          className="w-full p-2 border border-gray-300 rounded mb-4"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          rows={4}
        ></textarea>
        <div className="flex justify-end">
          <button 
            className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
            onClick={closeModal}
          >
            Cancel
          </button>
          <button 
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleAddComment}
          >
            Add Comment
          </button>
        </div>
      </Modal>
    </>
  );
};

export default HomePage;
