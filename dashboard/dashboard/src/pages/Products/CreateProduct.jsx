import React, { useState } from 'react';
import axios from 'axios';

const CreateProduct = ({ fetchProducts }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('category', category);
    formData.append('stock', stock);
    if (image) {
      formData.append('image', image);
    }

    try {
      await axios.post('http://localhost:5000/api/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      fetchProducts();
      setName('');
      setDescription('');
      setPrice('');
      setCategory('');
      setStock('');
      setImage(null);
      setError('');
    } catch (error) {
      setError('Error creating product');
      console.error('Error creating product', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Product</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
      <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required />
      <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" required />
      <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category" required />
      <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} placeholder="Stock" required />
      <input type="file" onChange={(e) => setImage(e.target.files[0])} accept="image/*" />
      <button type="submit">Create</button>
    </form>
  );
};

export default CreateProduct;
