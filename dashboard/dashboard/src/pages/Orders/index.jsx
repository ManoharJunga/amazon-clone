import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Form } from 'react-bootstrap';
import ExportButton from '../../components/ExportButton.jsx';
import { Visibility, Print as PrintIcon } from '@mui/icons-material';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });
  const [selectedOrder, setSelectedOrder] = useState(null);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:5000/api/orders/');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const getStatusClass = (status) => {
    switch (status) {
      case 'Pending':
        return 'text-warning';
      case 'Shipped':
        return 'text-info';
      case 'Delivered':
        return 'text-success';
      default:
        return 'text-muted';
    }
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const response = await fetch(`http://localhost:5000/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      setOrders(orders.map(order =>
        order._id === orderId ? { ...order, status: newStatus } : order
      ));
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const sortedOrders = [...orders].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const filteredOrders = statusFilter === 'All'
    ? sortedOrders
    : sortedOrders.filter(order => order.status === statusFilter);

  // Pagination logic
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

      {loading && <p className="text-center">Loading...</p>}
      {error && <div className="alert alert-danger text-center" role="alert">{error}</div>}

      {!loading && !error && (
        <>
          <div className="mb-4 d-flex justify-content-between align-items-center">
            <div>
              <Form.Group controlId="statusFilter">
                <Form.Label>Filter by Status:</Form.Label>
                <Form.Control
                  as="select"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="All">All</option>
                  <option value="Pending">Pending</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                </Form.Control>
              </Form.Group>
            </div>
            <div>
              <ExportButton orders={filteredOrders} />
            </div>
          </div>

          <div className="table-responsive">
            <table className="table table-striped table-sm">
              <thead>
                <tr>
                  <th onClick={() => handleSort('orderNumber')}>
                    Order Number {sortConfig.key === 'orderNumber' && (sortConfig.direction === 'asc' ? '▲' : '▼')}
                  </th>
                  <th onClick={() => handleSort('status')}>
                    Status {sortConfig.key === 'status' && (sortConfig.direction === 'asc' ? '▲' : '▼')}
                  </th>
                  <th onClick={() => handleSort('date')}>
                    Date {sortConfig.key === 'date' && (sortConfig.direction === 'asc' ? '▲' : '▼')}
                  </th>
                  <th onClick={() => handleSort('total_amount')}>
                    Total Amount {sortConfig.key === 'total_amount' && (sortConfig.direction === 'asc' ? '▲' : '▼')}
                  </th>
                  <th onClick={() => handleSort('shipping_address')}>
                    Shipping Address {sortConfig.key === 'shipping_address' && (sortConfig.direction === 'asc' ? '▲' : '▼')}
                  </th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedOrders.length > 0 ? (
                  paginatedOrders.map(order => (
                    <tr key={order._id}>
                      <td>{order.orderNumber}</td>
                      <td className={getStatusClass(order.status)}>
                        {order.status}
                      </td>
                      <td>{new Date(order.date).toLocaleDateString()}</td>
                      <td>${order.total_amount.toFixed(2)}</td>
                      <td>{order.shipping_address}</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <Form.Select
                            value={order.status}
                            onChange={(e) => handleStatusChange(order._id, e.target.value)}
                            style={{ width: '150px', marginRight: '10px' }}
                          >
                            <option value="Pending">Pending</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                          </Form.Select>
                          <Button
                            variant="outline-primary"
                            onClick={() => setSelectedOrder(order)}
                            style={{ marginRight: '0.5rem' }}
                          >
                            <Visibility sx={{ fontSize: 20, color: 'black' }} />
                          </Button>
                          <Button
                            variant="outline-secondary"
                            onClick={() => printPDF(order)}
                          >
                            <PrintIcon sx={{ fontSize: 20 }} />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center">No orders available.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="d-flex justify-content-center mt-4">
            <nav aria-label="Page navigation">
              <ul className="pagination pagination-sm">
                <li className="page-item">
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                </li>
                {[...Array(totalPages).keys()].map(number => (
                  <li key={number} className={`page-item ${number + 1 === currentPage ? 'active' : ''}`}>
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage(number + 1)}
                    >
                      {number + 1}
                    </button>
                  </li>
                ))}
                <li className="page-item">
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </>
      )}

      <Modal show={!!selectedOrder} onHide={() => setSelectedOrder(null)}>
        <Modal.Header closeButton>
          <Modal.Title>Order Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedOrder && (
            <>
              <h5>Order Number: {selectedOrder.orderNumber}</h5>
              <p><strong>Status:</strong> {selectedOrder.status}</p>
              <p><strong>Date:</strong> {new Date(selectedOrder.date).toLocaleDateString()}</p>
              <p><strong>Total Amount:</strong> ${selectedOrder.total_amount.toFixed(2)}</p>
              <p><strong>Shipping Address:</strong> {selectedOrder.shipping_address}</p>
              <h6>Products:</h6>
              <ul>
                {selectedOrder.products.map((product, index) => (
                  <li key={index}>
                    <div>Product ID: {product.product_id}</div>
                    <div>Quantity: {product.quantity}</div>
                  </li>
                ))}
              </ul>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setSelectedOrder(null)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Orders;