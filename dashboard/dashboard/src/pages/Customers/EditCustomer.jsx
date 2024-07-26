import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Box, Typography, MenuItem } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';

const EditCustomer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [editCustomer, setEditCustomer] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    status: 'active',
  });

  useEffect(() => {
    fetchCustomer();
  }, []);

  const fetchCustomer = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/customers/${id}`);
      setEditCustomer(response.data);
    } catch (error) {
      console.error('Error fetching customer:', error);
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/api/customers/${id}`, editCustomer);
      navigate('/');
    } catch (error) {
      console.error('Error updating customer:', error);
    }
  };

  return (
    <Box sx={{ backgroundColor: 'white', padding: '20px' }}>
      <Typography variant="h4" component="h1">Edit Customer</Typography>
      
      <TextField
        fullWidth
        variant="outlined"
        label="Name"
        value={editCustomer.name}
        onChange={(e) => setEditCustomer({ ...editCustomer, name: e.target.value })}
        margin="normal"
      />
      <TextField
        fullWidth
        variant="outlined"
        label="Email"
        value={editCustomer.email}
        onChange={(e) => setEditCustomer({ ...editCustomer, email: e.target.value })}
        margin="normal"
      />
      <TextField
        fullWidth
        variant="outlined"
        label="Phone Number"
        value={editCustomer.phoneNumber}
        onChange={(e) => setEditCustomer({ ...editCustomer, phoneNumber: e.target.value })}
        margin="normal"
      />
      <TextField
        fullWidth
        select
        variant="outlined"
        label="Status"
        value={editCustomer.status}
        onChange={(e) => setEditCustomer({ ...editCustomer, status: e.target.value })}
        margin="normal"
      >
        <MenuItem value="active">Active</MenuItem>
        <MenuItem value="inactive">Inactive</MenuItem>
      </TextField>
      <Button variant="contained" color="primary" onClick={handleUpdate}>
        Update Customer
      </Button>
      <Button variant="outlined" color="secondary" onClick={() => navigate('/')}>
        Cancel
      </Button>
    </Box>
  );
};

export default EditCustomer;
