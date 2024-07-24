import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import SideNavBar from './components/SideNavBar';
import Header from './components/Header';
import DashBoard from './pages/Dashboard';

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
              {/* Add more routes as needed */}
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
