import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';

const Payments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMethod, setSelectedMethod] = useState('All');
  const [sortCriteria, setSortCriteria] = useState('date');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchPayments = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch('http://localhost:5000/api/payments');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setPayments(data);
      } catch (error) {
        console.error('Error fetching payments:', error);
        setError(`Failed to fetch payments: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  const sortedPayments = [...payments].sort((a, b) => {
    if (sortCriteria === 'amount') {
      return b.amount - a.amount;
    } else {
      return new Date(b.payment_date) - new Date(a.payment_date);
    }
  });

  const filteredPayments = selectedMethod === 'All'
    ? sortedPayments
    : sortedPayments.filter(payment => payment.payment_method === selectedMethod);

  const totalPages = Math.ceil(filteredPayments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedPayments = filteredPayments.slice(startIndex, startIndex + itemsPerPage);

  const handleShowDetails = (payment) => {
    setSelectedPayment(payment);
  };

  const handleCloseModal = () => {
    setSelectedPayment(null);
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4 text-center">All Payments</h1>

      {loading && <p className="text-center">Loading...</p>}
      {error && <div className="alert alert-danger text-center" role="alert">{error}</div>}

      {!loading && !error && (
        <>
          <div className="mb-4 text-center">
            <label htmlFor="paymentMethod" className="form-label">Filter by Payment Method:</label>
            <select
              id="paymentMethod"
              className="form-select d-inline-block w-auto"
              value={selectedMethod}
              onChange={(e) => setSelectedMethod(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Credit Card">Credit Card</option>
              <option value="PayPal">PayPal</option>
              <option value="Bank Transfer">Bank Transfer</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="sortCriteria" className="form-label">Sort by:</label>
            <select
              id="sortCriteria"
              className="form-select"
              value={sortCriteria}
              onChange={(e) => setSortCriteria(e.target.value)}
            >
              <option value="date">Date</option>
              <option value="amount">Amount</option>
            </select>
          </div>
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Payment ID</th>
                  <th>Amount</th>
                  <th>Payment Method</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {paginatedPayments.length > 0 ? (
                  paginatedPayments.map(payment => (
                    <tr key={payment._id}>
                      <td>{payment._id}</td>
                      <td>${payment.amount.toFixed(2)}</td>
                      <td>{payment.payment_method}</td>
                      <td className={getStatusClass(payment.payment_status)}>{payment.payment_status}</td>
                      <td>{new Date(payment.payment_date).toLocaleDateString()}</td>
                      <td>
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => handleShowDetails(payment)}
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center">No payments available.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="d-flex justify-content-center mt-4">
            <nav aria-label="Page navigation">
              <ul className="pagination">
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

      {/* Modal for displaying payment details */}
      <Modal show={!!selectedPayment} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Payment Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedPayment && (
            <>
              <p><strong>Payment ID:</strong> {selectedPayment._id}</p>
              <p><strong>Order ID:</strong> {selectedPayment.order_id}</p> {/* Added Order ID */}
              <p><strong>Amount:</strong> ${selectedPayment.amount.toFixed(2)}</p>
              <p><strong>Payment Method:</strong> {selectedPayment.payment_method}</p>
              <p><strong>Status:</strong> {selectedPayment.payment_status}</p>
              <p><strong>Date:</strong> {new Date(selectedPayment.payment_date).toLocaleDateString()}</p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

// Helper function to get table row class based on payment status
const getStatusClass = (status) => {
  switch (status) {
    case 'Completed':
      return 'text-success';
    case 'Pending':
      return 'text-warning';
    case 'Failed':
      return 'text-danger';
    default:
      return '';
  }
};

export default Payments;
