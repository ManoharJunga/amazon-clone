import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import Home from './Pages/Home'
import MenPage from './CategoriesPages/MenPage'
import WomenPage from './CategoriesPages/WomenPage'
import KidsPage from './CategoriesPages/KidsPage'
import BeautyPage from './CategoriesPages/BeautyPage'
import JewelleryPage from './CategoriesPages/JewelleryPage'
import SportsPage from './CategoriesPages/SportsPage'
function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/men" element={<MenPage />} />
        <Route path="/women" element={<WomenPage />} />
        <Route path="/kids" element={<KidsPage />} />
        <Route path="/beauty" element={<BeautyPage />} />
        <Route path="/jewellery" element={<JewelleryPage />} />
        <Route path="/sports" element={<SportsPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
