import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface Post {
  id: string;
  title: string;
  content: string;
  image_url?: string;
  createdAt: string;
  User?: {
    username: string;
  };
}

interface Comment {
  id: string;
  content: string;
  createdAt: string;
  User?: {
    username: string;
  };
}

const PostDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        console.log(`Fetching post with id: ${id}`);
        const response = await axios.get<Post>(`https://apiblogplatform-production.up.railway.app/post/${id}`);
        console.log('Post data:', response.data);
        setPost(response.data);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    const fetchComments = async () => {
      try {
        console.log(`Fetching comments for post with id: ${id}`);
        const response = await axios.get<Comment[]>(`https://apiblogplatform-production.up.railway.app/post/${id}/comments`);
        console.log('Comments data:', response.data);
        setComments(response.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchPost();
    fetchComments();
  }, [id]);

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleModalOpen = () => {
    setShowModal(true);
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <div className="bg-white shadow-md rounded-lg overflow-hidden w-full max-w-2xl">
        {post.image_url && <img src={post.image_url} alt={post.title} className="w-full h-64 object-cover" />}
        <div className="p-4">
          <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
          <p className="text-gray-700 mb-4">{post.content}</p>
          {post.User && <p className="text-sm text-gray-500">By {post.User.username}</p>}
          <p className="text-sm text-gray-500">{new Date(post.createdAt).toLocaleDateString()}</p>
        </div>
      </div>
      <div className="w-full max-w-2xl mt-6">
        <h2 className="text-2xl font-bold mb-4">Comments</h2>
        {comments.map((comment) => (
          <div key={comment.id} className="bg-white shadow-md rounded-lg p-4 mb-4">
            <p className="text-gray-700">{comment.content}</p>
            {comment.User && <p className="text-sm text-gray-500">By {comment.User.username}</p>}
            <p className="text-sm text-gray-500">{new Date(comment.createdAt).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
      <button
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded mt-4"
        onClick={handleModalOpen}
      >
        Add Comment
      </button>

      {showModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
          onClick={handleModalClose}
        >
          <div
            className="bg-white p-6 rounded shadow-md"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4">Modal</h2>
            <p>Este servicio aún no está disponible.</p>
            <button
              className="bg-red-500 text-white font-bold py-2 px-4 rounded mt-4"
              onClick={handleModalClose}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostDetailPage;
