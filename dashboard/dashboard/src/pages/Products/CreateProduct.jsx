import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Box, Typography, IconButton, Grid, Paper, Avatar, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import AddBoxIcon from '@mui/icons-material/AddBox';

const CreateProduct = () => {
  const navigate = useNavigate();
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
  });
  const [categories, setCategories] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
    }
  };

  const handleCreate = async () => {
    const formData = new FormData();
    formData.append('name', newProduct.name);
    formData.append('description', newProduct.description);
    formData.append('price', newProduct.price);
    formData.append('category', newProduct.category);
    formData.append('stock', newProduct.stock);
    if (selectedFile) {
      formData.append('image', selectedFile);
    }

    try {
      await axios.post('http://localhost:5000/api/products/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      navigate('/products'); // Redirect to the products page after creation
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  return (
    <Paper elevation={3} sx={{ padding: 4, maxWidth: 600, margin: 'auto', mt: 4 }}>
      <Grid container direction="column" alignItems="center" spacing={2}>
        <Grid item>
          <Avatar sx={{ bgcolor: 'primary.main', mb: 1 }}>
            <AddBoxIcon />
          </Avatar>
          <Typography variant="h4" component="h1">Create Product</Typography>
        </Grid>

        <Grid item container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              label="Name"
              placeholder="Enter product name"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              label="Description"
              placeholder="Enter product description"
              value={newProduct.description}
              onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
              multiline
              rows={4}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              variant="outlined"
              label="Price"
              placeholder="Enter product price"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              variant="outlined"
              select
              label="Category"
              value={newProduct.category}
              onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
            >
              {categories.map((category) => (
                <MenuItem key={category._id} value={category._id}>
                  {category.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              variant="outlined"
              label="Stock"
              placeholder="Enter product stock"
              value={newProduct.stock}
              onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="raised-button-file"
              type="file"
              onChange={handleFileChange}
            />
            <label htmlFor="raised-button-file">
              <IconButton color="primary" aria-label="upload picture" component="span">
                <PhotoCamera />
              </IconButton>
              <Button variant="contained" component="span">
                Upload Image
              </Button>
            </label>
          </Grid>
          {preview && (
            <Grid item xs={12}>
              <Typography variant="body1">Image Preview:</Typography>
              <Box sx={{ textAlign: 'center' }}>
                <img src={preview} alt="Selected" style={{ maxHeight: '200px', maxWidth: '100%' }} />
              </Box>
            </Grid>
          )}
        </Grid>

        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreate}
            sx={{ marginTop: 2 }}
            fullWidth
          >
            Create Product
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default CreateProduct;
