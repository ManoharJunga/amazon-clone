// src/components/ProductUploadForm.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductUploadForm = ({ productId, onProductUpdated }) => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    images: []
  });

  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    if (productId) {
      // Fetch the existing product details if productId is provided
      axios.get(`http://localhost:5000/api/products/${productId}`)
        .then(response => {
          const { data } = response;
          setProduct({
            name: data.name,
            description: data.description,
            price: data.price,
            category: data.category._id,
            stock: data.stock,
            images: data.images
          });
        })
        .catch(error => console.error('Error fetching product:', error));
    }
  }, [productId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    setFileList(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('price', product.price);
    formData.append('category', product.category);
    formData.append('stock', product.stock);

    for (let i = 0; i < fileList.length; i++) {
      formData.append('images', fileList[i]);
    }

    try {
      if (productId) {
        // Update existing product
        await axios.put(`http://localhost:5000/api/products/${productId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
      } else {
        // Create new product
        await axios.post('http://localhost:5000/api/products', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
      }

      // Notify parent component about the update
      if (onProductUpdated) {
        onProductUpdated();
      }
    } catch (error) {
      console.error('Error uploading product:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">{productId ? 'Update Product' : 'Upload Product'}</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Product Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            name="description"
            value={product.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Price</label>
          <input
            type="number"
            className="form-control"
            name="price"
            value={product.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Category</label>
          <input
            type="text"
            className="form-control"
            name="category"
            value={product.category}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Stock</label>
          <input
            type="number"
            className="form-control"
            name="stock"
            value={product.stock}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Images</label>
          <input
            type="file"
            className="form-control"
            multiple
            onChange={handleFileChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">{productId ? 'Update Product' : 'Upload Product'}</button>
      </form>
    </div>
  );
};

export default ProductUploadForm;
