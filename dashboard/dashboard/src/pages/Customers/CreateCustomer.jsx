import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box, Typography, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CreateCustomer = () => {
  const navigate = useNavigate();
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    status: 'active',
  });

  const handleCreate = async () => {
    try {
      await axios.post('http://localhost:5000/api/customers/', newCustomer);
      navigate('/');
    } catch (error) {
      console.error('Error creating customer:', error);
    }
  };

  return (
    <Box sx={{ backgroundColor: 'white', padding: '20px' }}>
      <Typography variant="h4" component="h1">Create Customer</Typography>
      
      <TextField
        fullWidth
        variant="outlined"
        label="Name"
        placeholder="Enter name"
        value={newCustomer.name}
        onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
        margin="normal"
      />
      <TextField
        fullWidth
        variant="outlined"
        label="Email"
        placeholder="Enter email"
        value={newCustomer.email}
        onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
        margin="normal"
      />
      <TextField
        fullWidth
        variant="outlined"
        label="Phone Number"
        placeholder="Enter phone number"
        value={newCustomer.phoneNumber}
        onChange={(e) => setNewCustomer({ ...newCustomer, phoneNumber: e.target.value })}
        margin="normal"
      />
      <TextField
        fullWidth
        select
        variant="outlined"
        label="Status"
        value={newCustomer.status}
        onChange={(e) => setNewCustomer({ ...newCustomer, status: e.target.value })}
        margin="normal"
      >
        <MenuItem value="active">Active</MenuItem>
        <MenuItem value="inactive">Inactive</MenuItem>
      </TextField>
      <Button variant="contained" color="primary" onClick={handleCreate}>
        Create Customer
      </Button>
    </Box>
  );
};

export default CreateCustomer;
