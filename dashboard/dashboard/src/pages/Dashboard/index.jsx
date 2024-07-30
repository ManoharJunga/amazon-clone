import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import RevenueChart from '../../components/RevenueChart';
import { Card, Container, Row, Col, Dropdown } from 'react-bootstrap';
import { ShoppingCart, Payment, Group } from '@mui/icons-material';
import { Link } from 'react-router-dom';

function DashBoard() {
  const [orders, setOrders] = useState([]);
  const [payments, setPayments] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeFilter, setTimeFilter] = useState('Month'); // Default to Month

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const [ordersResponse, paymentsResponse, customersResponse] = await Promise.all([
          fetch('http://localhost:5000/api/orders/'),
          fetch('http://localhost:5000/api/payments/'),
          fetch('http://localhost:5000/api/customers/')
        ]);

        if (!ordersResponse.ok || !paymentsResponse.ok || !customersResponse.ok) {
          throw new Error('Error fetching data');
        }

        const [ordersData, paymentsData, customersData] = await Promise.all([
          ordersResponse.json(),
          paymentsResponse.json(),
          customersResponse.json()
        ]);

        setOrders(ordersData);
        setPayments(paymentsData);
        setCustomers(customersData);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  if (error) {
    return <div className="alert alert-danger text-center" role="alert">{error}</div>;
  }

  return (
    <Container className="mt-4">
      <Row>
        <Col md={4} className="mb-4">
          <Link to="/orders" style={{ textDecoration: 'none' }}>
            <Card>
              <Card.Body>
                <div className="d-flex align-items-center">
                  <ShoppingCart sx={{ color: '#0044ff', fontSize: 30, marginRight: 2 }} />
                  <div>
                    <Card.Title>Total Orders</Card.Title>
                    <Card.Text>{orders.length}</Card.Text>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Link>
        </Col>
        <Col md={4} className="mb-4">
          <Link to="/payments" style={{ textDecoration: 'none' }}>
            <Card>
              <Card.Body>
                <div className="d-flex align-items-center">
                  <Payment sx={{ color: '#0044ff', fontSize: 30, marginRight: 2 }} />
                  <div>
                    <Card.Title>Total Payments</Card.Title>
                    <Card.Text>{payments.length}</Card.Text>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Link>
        </Col>
        <Col md={4} className="mb-4">
          <Link to="/customer" style={{ textDecoration: 'none' }}>
            <Card>
              <Card.Body>
                <div className="d-flex align-items-center">
                  <Group sx={{ color: '#0044ff', fontSize: 30, marginRight: 2 }} />
                  <div>
                    <Card.Title>Total Customers</Card.Title>
                    <Card.Text>{customers.length}</Card.Text>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Link>
        </Col>
      </Row>
      <Row>
        <Col md={12} className="mb-4">
          <Dropdown>
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
              Filter by {timeFilter}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setTimeFilter('Day')}>Day</Dropdown.Item>
              <Dropdown.Item onClick={() => setTimeFilter('Month')}>Month</Dropdown.Item>
              <Dropdown.Item onClick={() => setTimeFilter('Year')}>Year</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <RevenueChart filter={timeFilter} />
        </Col>
      </Row>
    </Container>
  );
}

export default DashBoard;
