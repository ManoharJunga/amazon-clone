import DashBoard from './pages/Dashboard'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Header from './components/Header';

function App() {

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" exact={true} element={<DashBoard/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
