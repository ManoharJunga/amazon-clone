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

  const filteredOrders = statusFilter === 'All'
    ? orders
    : orders.filter(order => order.status === statusFilter);

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Order Dashboard</h1>

      {loading && <p>Loading...</p>}
      {error && <div className="alert alert-danger" role="alert">{error}</div>}

      {!loading && !error && (
        <>
          <div className="mb-3">
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
          <ul className="list-group">
            {filteredOrders.length > 0 ? (
              filteredOrders.map(order => (
                <li key={order._id} className="list-group-item border rounded mb-3">
                  <h5>Order Number: {order.orderNumber}</h5>
                  <p>Status: {order.status}</p>
                  <p>Date: {new Date(order.date).toLocaleDateString()}</p>
                  <p>Total Amount: ${order.total_amount.toFixed(2)}</p>
                  <p>Shipping Address: {order.shipping_address}</p>
                  <ul className="list-group">
                    {order.products.map((product, index) => (
                      <li key={index} className="list-group-item">
                        Product ID: {product.product_id}, Quantity: {product.quantity}
                      </li>
                    ))}
                  </ul>
                </li>
              ))
            ) : (
              <p>No orders available.</p>
            )}
          </ul>
        </>
      )}
    </div>
  );
};

export default Orders;
