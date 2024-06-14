import React, { useState } from 'react';
import axios from 'axios';

const AddPostForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image: null
  });

  const handleChange = (e) => {
    if (e.target.name === 'image') {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const postData = new FormData();
    postData.append('title', formData.title);
    postData.append('content', formData.content);
    if (formData.image) {
      postData.append('image', formData.image);
    }

    try {
      const response = await axios.post('https://apiblogplatform-production.up.railway.app/post', postData);
      console.log('Post added successfully:', response.data);
      onClose(); // Cierra el modal después de agregar el post
    } catch (error) {
      console.error('Error adding post:', error);
    }

    setFormData({ title: '', content: '', image: null });
  };

  const handleModalClick = (e) => {
    // Si el clic ocurre dentro del modal, no hacemos nada
    if (e.target.closest('.modal-content')) return;
    // Si el clic ocurre fuera del modal, cerramos el modal
    onClose();
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 z-50" onClick={handleModalClick}>
      <div className="bg-white rounded-lg p-8 max-w-md w-full modal-content" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-2xl font-bold mb-6">Agregar Post</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Título"
            required
            className="px-4 py-2 border border-gray-300 rounded-md"
          />
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Contenido"
            required
            className="px-4 py-2 border border-gray-300 rounded-md"
          />
          <input
            type="file"
            name="image"
            onChange={handleChange}
            accept="image/*"
            required
            className="px-4 py-2 border border-gray-300 rounded-md"
          />
          {formData.image && (
            <img
              src={URL.createObjectURL(formData.image)}
              alt="Preview"
              className="max-w-full h-auto mt-2" // Añade 'h-auto' para mantener la proporción de la imagen
              style={{ maxHeight: '200px' }} // Establece un máximo de altura para la imagen de vista previa
            />
          )}
          <div className="flex justify-end">
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Agregar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPostForm;
