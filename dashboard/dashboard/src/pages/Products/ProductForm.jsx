import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductForm = ({ selectedProduct, fetchProducts }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    image: null
  });

  useEffect(() => {
    if (selectedProduct) {
      setFormData({
        name: selectedProduct.name,
        description: selectedProduct.description,
        price: selectedProduct.price,
        category: selectedProduct.category,
        stock: selectedProduct.stock,
        image: null // Reset image
      });
    }
  }, [selectedProduct]);

  const handleChange = (e) => {
    if (e.target.name === 'image') {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('name', formData.name);
    form.append('description', formData.description);
    form.append('price', formData.price);
    form.append('category', formData.category);
    form.append('stock', formData.stock);
    if (formData.image) {
      form.append('image', formData.image);
    }

    try {
      if (selectedProduct) {
        await axios.put(`http://localhost:5000/api/products/${selectedProduct._id}`, form);
      } else {
        await axios.post('http://localhost:5000/api/products', form);
      }
      fetchProducts();
      setFormData({
        name: '',
        description: '',
        price: '',
        category: '',
        stock: '',
        image: null
      });
    } catch (error) {
      console.error('Error saving product', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{selectedProduct ? 'Edit Product' : 'Add Product'}</h2>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
        required
      />
      <input
        type="text"
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
      />
      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={handleChange}
        placeholder="Price"
        required
      />
      <input
        type="text"
        name="category"
        value={formData.category}
        onChange={handleChange}
        placeholder="Category"
      />
      <input
        type="number"
        name="stock"
        value={formData.stock}
        onChange={handleChange}
        placeholder="Stock"
        required
      />
      <input
        type="file"
        name="image"
        onChange={handleChange}
        accept=".jpg,.jpeg,.png"
      />
      <button type="submit">{selectedProduct ? 'Update' : 'Add'} Product</button>
    </form>
  );
};

export default ProductForm;
