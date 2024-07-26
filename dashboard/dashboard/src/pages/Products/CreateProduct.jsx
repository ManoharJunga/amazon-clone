import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box, Typography, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CreateProduct = () => {
  const navigate = useNavigate();
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    imagePath: '',
  });

  const handleCreate = async () => {
    try {
      await axios.post('http://localhost:5000/api/products/', newProduct);
      navigate('/products'); // Redirect to the products page after creation
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  return (
    <Box sx={{ backgroundColor: 'white', padding: '20px' }}>
      <Typography variant="h4" component="h1">Create Product</Typography>
      
      <TextField
        fullWidth
        variant="outlined"
        label="Name"
        placeholder="Enter product name"
        value={newProduct.name}
        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
        margin="normal"
      />
      <TextField
        fullWidth
        variant="outlined"
        label="Description"
        placeholder="Enter product description"
        value={newProduct.description}
        onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
        margin="normal"
      />
      <TextField
        fullWidth
        variant="outlined"
        label="Price"
        placeholder="Enter product price"
        value={newProduct.price}
        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
        margin="normal"
      />
      <TextField
        fullWidth
        variant="outlined"
        label="Category"
        placeholder="Enter product category"
        value={newProduct.category}
        onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
        margin="normal"
      />
      <TextField
        fullWidth
        variant="outlined"
        label="Stock"
        placeholder="Enter product stock"
        value={newProduct.stock}
        onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
        margin="normal"
      />
      <TextField
        fullWidth
        variant="outlined"
        label="Image Path"
        placeholder="Enter image path"
        value={newProduct.imagePath}
        onChange={(e) => setNewProduct({ ...newProduct, imagePath: e.target.value })}
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleCreate}>
        Create Product
      </Button>
    </Box>
  );
};

export default CreateProduct;
