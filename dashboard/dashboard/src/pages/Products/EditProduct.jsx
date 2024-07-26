import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Box, Typography, MenuItem } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

const EditProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    imagePath: '',
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/api/products/${id}`, product);
      navigate('/products'); // Redirect to the products page after update
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <Box sx={{ backgroundColor: 'white', padding: '20px' }}>
      <Typography variant="h4" component="h1">Edit Product</Typography>
      
      <TextField
        fullWidth
        variant="outlined"
        label="Name"
        placeholder="Enter product name"
        value={product.name}
        onChange={(e) => setProduct({ ...product, name: e.target.value })}
        margin="normal"
      />
      <TextField
        fullWidth
        variant="outlined"
        label="Description"
        placeholder="Enter product description"
        value={product.description}
        onChange={(e) => setProduct({ ...product, description: e.target.value })}
        margin="normal"
      />
      <TextField
        fullWidth
        variant="outlined"
        label="Price"
        placeholder="Enter product price"
        value={product.price}
        onChange={(e) => setProduct({ ...product, price: e.target.value })}
        margin="normal"
      />
      <TextField
        fullWidth
        variant="outlined"
        label="Category"
        placeholder="Enter product category"
        value={product.category}
        onChange={(e) => setProduct({ ...product, category: e.target.value })}
        margin="normal"
      />
      <TextField
        fullWidth
        variant="outlined"
        label="Stock"
        placeholder="Enter product stock"
        value={product.stock}
        onChange={(e) => setProduct({ ...product, stock: e.target.value })}
        margin="normal"
      />
      <TextField
        fullWidth
        variant="outlined"
        label="Image Path"
        placeholder="Enter image path"
        value={product.imagePath}
        onChange={(e) => setProduct({ ...product, imagePath: e.target.value })}
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleUpdate}>
        Update Product
      </Button>
    </Box>
  );
};

export default EditProduct;
