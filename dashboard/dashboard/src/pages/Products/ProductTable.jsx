import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Box, Button, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products');
      if (Array.isArray(response.data)) {
        setProducts(response.data);
      } else {
        setError('Invalid data format received from server');
      }
    } catch (error) {
      console.error('Error fetching products', error);
      setError('Error fetching products');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product', error);
      setError('Error deleting product');
    }
  };

  return (
    <Box sx={{ backgroundColor: 'white', padding: '20px' }}>
      <Typography variant="h4" component="h1">Products</Typography>
      {error && <Typography color="error">{error}</Typography>}

      <Button variant="contained" color="primary" component={Link} to="/products/createProduct" sx={{ marginBottom: '20px' }}>
        Create Product
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Stock</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(products) && products.length > 0 ? (
              products.map((product) => (
                <TableRow key={product._id}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.description}</TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell><img src={`/uploads/${product.imagePath}`} alt={product.name} width="50" /></TableCell>
                  <TableCell>
                    <Button variant="contained" color="primary" component={Link} to={`/products/edit/${product._id}`} sx={{ marginRight: '10px' }}>
                      Edit
                    </Button>
                    <Button variant="contained" color="secondary" onClick={() => handleDelete(product._id)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan="7">No products available</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ProductTable;
