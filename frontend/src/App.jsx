import { Routes, Route, useNavigate } from "react-router-dom";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import Sales from "./pages/Sales/Sales";
import ProductPage from "./pages/ProductPage";
import "./index.css";
import "./App.css";
import Login from "./pages/login/Login";
import { useState } from "react";
import ProductSearch from "./pages/productsearch/ProductSearch";

export default function App() {
  const navigate = useNavigate();

  const [searchResults, setSearchResults] = useState([]);

  return (
    <div className="flex items-center justify-center flex-col">
      <NavigationBar setSearchResults={setSearchResults} />
      <Routes>
        <Route path="/login" element={<Login role="customer" />} />
        <Route path="/login-manager" element={<Login role="manager" />} />
        <Route path="/sales" element={<Sales />} />
        <Route path="products/:productName" element={<ProductPage />} />
        <Route path="/login" element={<Login role="customer" />} />
        {/* apostrophes cant be ignored in the backend
        for now the ProductPage URL must contain apostrophes to find "Pinda's" */}
        <Route
          path="/zoeken"
          element={<ProductSearch searchResults={searchResults} />}
        />
      </Routes>
    </div>
  );
}
