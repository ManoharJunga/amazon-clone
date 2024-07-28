import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const getHeaderBgColor = (status) => {
    switch (status) {
      case 'Pending':
        return '#ffc107'; // Bootstrap warning color
      case 'Shipped':
        return '#17a2b8'; // Bootstrap info color
      case 'Delivered':
        return '#28a745'; // Bootstrap success color
      default:
        return '#f8f9fa'; // Bootstrap light color
    }
  };

  const filteredOrders = statusFilter === 'All'
    ? orders
    : orders.filter(order => order.status === statusFilter);

  return (
    <div className="container mt-4">
      <h1 className="mb-4 text-center">Order Dashboard</h1>

      {loading && <p className="text-center">Loading...</p>}
      {error && <div className="alert alert-danger" role="alert">{error}</div>}

      {!loading && !error && (
        <>
          <div className="mb-4">
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
          <div className="row">
            {filteredOrders.length > 0 ? (
              filteredOrders.map(order => (
                <div key={order._id} className="col-md-6 col-lg-4 mb-4">
                  <div className="card border-0 shadow-sm">
                    <div
                      className="card-header text-white"
                      style={{ backgroundColor: getHeaderBgColor(order.status) }}
                    >
                      <h5 className="mb-0">Order Number: {order.orderNumber}</h5>
                    </div>
                    <div className="card-body">
                      <p className="card-text"><strong>Status:</strong> {order.status}</p>
                      <p className="card-text"><strong>Date:</strong> {new Date(order.date).toLocaleDateString()}</p>
                      <p className="card-text"><strong>Total Amount:</strong> ${order.total_amount.toFixed(2)}</p>
                      <p className="card-text"><strong>Shipping Address:</strong> {order.shipping_address}</p>
                      <h6 className="mt-3">Products:</h6>
                      <ul className="list-group">
                        {order.products.map((product, index) => (
                          <li key={index} className="list-group-item">
                            Product ID: {product.product_id}, Quantity: {product.quantity}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center">No orders available.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Orders;
