import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Form, Spinner, Table } from 'react-bootstrap';
import ExportButton from '../../components/ExportButton.jsx';
import { Visibility, Print as PrintIcon, Search as SearchIcon } from '@mui/icons-material';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { CSVLink } from 'react-csv';

import { ExcelRenderer } from 'react-excel-renderer';

// Pagination Component
const Pagination = ({ currentPage, totalPages, onPageChange, onItemsPerPageChange }) => (
  <div className="d-flex justify-content-between align-items-center mt-4">
    <div>
      <Form.Select 
        aria-label="Items per page" 
        onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
        style={{ maxWidth: '120px' }}
      >
        <option value={10}>10 per page</option>
        <option value={25}>25 per page</option>
        <option value={50}>50 per page</option>
      </Form.Select>
    </div>
    <nav aria-label="Page navigation">
      <ul className="pagination pagination-sm">
        <li className="page-item">
          <button
            className="page-link"
            onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
        </li>
        {[...Array(totalPages).keys()].map(number => (
          <li key={number} className={`page-item ${number + 1 === currentPage ? 'active' : ''}`}>
            <button
              className="page-link"
              onClick={() => onPageChange(number + 1)}
            >
              {number + 1}
            </button>
          </li>
        ))}
        <li className="page-item">
          <button
            className="page-link"
            onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  </div>
);

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState([null, null]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedOrders, setSelectedOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:5000/api/orders/');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        setError('Failed to fetch orders');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const getStatusClass = (status) => {
    switch (status) {
      case 'Pending': return 'text-warning';
      case 'Shipped': return 'text-info';
      case 'Delivered': return 'text-success';
      default: return 'text-muted';
    }
  };

  const handleSort = (key) => {
    const direction = sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    setSortConfig({ key, direction });
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const response = await fetch(`http://localhost:5000/api/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!response.ok) throw new Error('Network response was not ok');
      setOrders(orders.map(order => order._id === orderId ? { ...order, status: newStatus } : order));
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleBulkStatusChange = async (newStatus) => {
    try {
      const response = await fetch(`http://localhost:5000/api/orders/bulk-update`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderIds: selectedOrders, status: newStatus }),
      });
      if (!response.ok) throw new Error('Network response was not ok');
      setOrders(orders.map(order => 
        selectedOrders.includes(order._id) ? { ...order, status: newStatus } : order
      ));
      setSelectedOrders([]);
    } catch (error) {
      console.error('Error updating statuses:', error);
    }
  };

  const sortedOrders = [...orders].sort((a, b) => {
    if (sortConfig.key) {
      if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const filteredOrders = sortedOrders
    .filter(order => 
      (statusFilter === 'All' || order.status === statusFilter) &&
      (order.orderNumber.includes(searchQuery) || order.shipping_address.includes(searchQuery)) &&
      (dateRange[0] ? new Date(order.date) >= new Date(dateRange[0]) : true) &&
      (dateRange[1] ? new Date(order.date) <= new Date(dateRange[1]) : true)
    );

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedOrders = filteredOrders.slice(startIndex, startIndex + itemsPerPage);

  const printPDF = (order) => {
    const doc = new jsPDF();
    doc.text(`Order Number: ${order.orderNumber}`, 10, 10);
    doc.text(`Status: ${order.status}`, 10, 20);
    doc.text(`Date: ${new Date(order.date).toLocaleDateString()}`, 10, 30);
    doc.text(`Total Amount: $${order.total_amount.toFixed(2)}`, 10, 40);
    doc.text(`Shipping Address: ${order.shipping_address}`, 10, 50);
    doc.autoTable({
      head: [['Product ID', 'Quantity']],
      body: order.products.map(product => [product.product_id, product.quantity]),
      startY: 60,
    });
    doc.save(`Order_${order.orderNumber}.pdf`);
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4 text-center">Order Dashboard</h1>

      {loading && <div className="text-center"><Spinner animation="border" /></div>}
      {error && <div className="alert alert-danger text-center" role="alert">{error}</div>}

      {!loading && !error && (
        <>
          <div className="mb-4 d-flex flex-column flex-sm-row justify-content-between align-items-center">
            <div className="mb-3 mb-sm-0">
              <label htmlFor="statusFilter" className="form-label">Filter by Status:</label>
              <select
                id="statusFilter"
                className="form-select"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All</option>
                <option value="Pending">Pending</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
            <div className="mb-3 mb-sm-0">
              <label htmlFor="dateRange" className="form-label">Date Range:</label>
              <Form.Control 
                type="date"
                value={dateRange[0] || ''}
                onChange={(e) => setDateRange([e.target.value, dateRange[1]])}
              />
              <Form.Control 
                type="date"
                value={dateRange[1] || ''}
                onChange={(e) => setDateRange([dateRange[0], e.target.value])}
                style={{ marginTop: '0.5rem' }}
              />
            </div>
            <div className="mb-3 mb-sm-0 d-flex align-items-center">
              <Form.Control 
                type="text"
                placeholder="Search by Order Number or Address"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button 
                variant="outline-primary" 
                className="ms-2" 
                onClick={() => setSearchQuery('')}
              >
                <SearchIcon />
              </Button>
            </div>
          </div>

          <div className="mb-3 d-flex justify-content-end">
            <ExportButton
              data={filteredOrders}
              filename="orders.csv"
              type="csv"
            />
            <CSVLink
              data={filteredOrders}
              filename={"orders.csv"}
              className="btn btn-outline-primary ms-2"
            >
              Export CSV
            </CSVLink>
          </div>

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Order Number</th>
                <th>Status</th>
                <th>Date</th>
                <th>Total Amount</th>
                <th>Shipping Address</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedOrders.map((order, index) => (
                <tr key={order._id}>
                  <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                  <td>{order.orderNumber}</td>
                  <td className={getStatusClass(order.status)}>{order.status}</td>
                  <td>{new Date(order.date).toLocaleDateString()}</td>
                  <td>${order.total_amount.toFixed(2)}</td>
                  <td>{order.shipping_address}</td>
                  <td>
                    <Button 
                      variant="outline-primary" 
                      className="me-2"
                      onClick={() => printPDF(order)}
                    >
                      <PrintIcon />
                    </Button>
                    <Button 
                      variant="outline-info"
                      onClick={() => setSelectedOrder(order)}
                    >
                      <Visibility />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            onItemsPerPageChange={setItemsPerPage}
          />

          <Modal show={selectedOrder !== null} onHide={() => setSelectedOrder(null)}>
            <Modal.Header closeButton>
              <Modal.Title>Order Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {selectedOrder && (
                <div>
                  <h4>Order Number: {selectedOrder.orderNumber}</h4>
                  <p>Status: {selectedOrder.status}</p>
                  <p>Date: {new Date(selectedOrder.date).toLocaleDateString()}</p>
                  <p>Total Amount: ${selectedOrder.total_amount.toFixed(2)}</p>
                  <p>Shipping Address: {selectedOrder.shipping_address}</p>
                  <h5>Products</h5>
                  <Table striped bordered>
                    <thead>
                      <tr>
                        <th>Product ID</th>
                        <th>Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedOrder.products.map(product => (
                        <tr key={product.product_id}>
                          <td>{product.product_id}</td>
                          <td>{product.quantity}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setSelectedOrder(null)}>Close</Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
    </div>
  );
};

export default Orders;
