import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, IconButton, Typography, Card, CardContent, Box, Checkbox } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import GroupIcon from '@mui/icons-material/Group';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomers, setSelectedCustomers] = useState([]);

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
    const confirmed = window.confirm('Are you sure you want to delete this customer?');
    if (confirmed) {
      try {
        await axios.delete(`http://localhost:5000/api/customers/${id}`);
        fetchCustomers();
        toast.success('Customer deleted successfully!');
      } catch (error) {
        console.error('Error deleting customer:', error);
        toast.error('Error deleting customer. Please try again.');
      }
    }
  };

  const handleBulkDelete = async () => {
    const confirmed = window.confirm('Are you sure you want to delete the selected customers?');
    if (confirmed) {
      try {
        for (const id of selectedCustomers) {
          await axios.delete(`http://localhost:5000/api/customers/${id}`);
        }
        fetchCustomers();
        setSelectedCustomers([]);
        toast.success('Selected customers deleted successfully!');
      } catch (error) {
        console.error('Error deleting customers:', error);
        toast.error('Error deleting customers. Please try again.');
      }
    }
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      const allCustomerIds = customers.map(customer => customer._id);
      setSelectedCustomers(allCustomerIds);
    } else {
      setSelectedCustomers([]);
    }
  };

  const handleSelect = (event, id) => {
    if (event.target.checked) {
      setSelectedCustomers([...selectedCustomers, id]);
    } else {
      setSelectedCustomers(selectedCustomers.filter(customerId => customerId !== id));
    }
  };

  return (
    <Box sx={{ backgroundColor: 'white', padding: '20px' }}>
      <ToastContainer />
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
      <Button variant="contained" color="secondary" onClick={handleBulkDelete} disabled={selectedCustomers.length === 0} sx={{ marginLeft: 2 }}>
        Delete Selected
      </Button>

      <TableContainer sx={{ marginTop: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Checkbox
                  indeterminate={selectedCustomers.length > 0 && selectedCustomers.length < customers.length}
                  checked={customers.length > 0 && selectedCustomers.length === customers.length}
                  onChange={handleSelectAll}
                />
              </TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((customer) => (
              <TableRow key={customer._id}>
                <TableCell>
                  <Checkbox
                    checked={selectedCustomers.includes(customer._id)}
                    onChange={(event) => handleSelect(event, customer._id)}
                  />
                </TableCell>
                <TableCell>{customer.name}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{customer.phoneNumber}</TableCell>
                <TableCell>{customer.status}</TableCell>
                <TableCell>
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
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Customers;
