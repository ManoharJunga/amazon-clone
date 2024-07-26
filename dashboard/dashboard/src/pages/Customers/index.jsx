import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, IconButton, Typography, Card, CardContent, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import GroupIcon from '@mui/icons-material/Group';

const Customers = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/customers/');
      setCustomers(response.data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/customers/${id}`);
      fetchCustomers();
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  };

  return (
    <Box sx={{ backgroundColor: 'white', padding: '20px' }}>
      <Typography variant="h4" component="h1">Customer Management</Typography>
      
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 2 }}>
        <Card sx={{ display: 'flex', alignItems: 'center', padding: 2, borderRadius: 2 }}>
          <GroupIcon sx={{ marginRight: 2, fontSize: 40 }} />
          <CardContent>
            <Typography variant="h6">Total Customers:</Typography>
            <Typography variant="h4">{customers.length}</Typography>
          </CardContent>
        </Card>
      </Box>

      <Button variant="contained" color="primary" component={Link} to="/createCustomer">
        Create Customer
      </Button>

      <Table striped bordered hover sx={{ backgroundColor: 'white', marginTop: 2 }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer._id}>
              <td>{customer.name}</td>
              <td>{customer.email}</td>
              <td>{customer.phoneNumber}</td>
              <td>{customer.status}</td>
              <td>
                <IconButton
                  color="primary"
                  component={Link}
                  to={`/editCustomer/${customer._id}`}
                  sx={{ marginRight: 1 }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  color="secondary"
                  onClick={() => handleDelete(customer._id)}
                >
                  <DeleteIcon />
                </IconButton>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Box>
  );
};

export default Customers;
