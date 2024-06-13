import './App.css'
import { Routes, Route, useNavigate } from 'react-router-dom'
import NavigationBar from './components/NavigationBar/NavigationBar';
import { useState } from 'react';
import ProductSearch from './pages/productsearch/ProductSearch';

function App() {

  const navigate = useNavigate();

  const [searchResults, setSearchResults] = useState([]);

  return (
    <div className="container">
      <NavigationBar setSearchResults={setSearchResults} />
      <Routes>
        <Route path='/zoeken' element={<ProductSearch searchResults={searchResults} />} />
      </Routes>
    </div>
  )
}

export default App
