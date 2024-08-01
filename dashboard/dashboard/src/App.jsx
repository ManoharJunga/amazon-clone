import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import SideNavBar from './components/SideNavBar';
import Header from './components/Header';
import DashBoard from './pages/Dashboard';
import Customers from './pages/Customers';
import CreateCustomer from './pages/Customers/CreateCustomer';
import EditCustomer from './pages/Customers/EditCustomer';
import ProductTable from './pages/Products/ProductTable';
import CreateProduct from './pages/Products/CreateProduct';
import EditProduct from './pages/Products/EditProduct';
import Calendar from './pages/Calendar';
import Orders from './pages/Orders';
import Payments from './pages/Payments';
import CategoryManager from './pages/CategoryManager';

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <SideNavBar />
        <div className="main-content">
          <Header />
          <div className="content-area">
            <Routes>
              <Route path="/" exact={true} element={<DashBoard />} />
              <Route path="/customer" exact={true} element={<Customers />} />
              <Route path="/createCustomer" element={<CreateCustomer />} />
              <Route path="/editCustomer/:id" element={<EditCustomer />} />
              <Route path='/products' element={<ProductTable />} />
              <Route path="/products/create" element={<CreateProduct />} />
              <Route path='/products/edit/:id' element={<EditProduct />} />
              <Route path='/calendar' element={<Calendar />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/payments" element={<Payments />} />
              <Route path="/categorymanager" element={<CategoryManager />} />
              {/* Add more routes as needed */}
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
