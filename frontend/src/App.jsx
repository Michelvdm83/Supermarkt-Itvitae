import { Routes, Route, useNavigate } from "react-router-dom";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import Sales from "./pages/Sales/Sales";
import ProductPage from "./pages/ProductPage";
import "./index.css";
import "./App.css";
import Login from "./pages/login/Login";
import { useState } from "react";
import ProductSearch from "./pages/productsearch/ProductSearch";
import Account from "./pages/account/Account";
import CategoryPage from "./pages/Category/CategoryPage";
import Home from "./pages/home/Home";
import ShoppingCart from "./pages/shoppingcart/ShoppingCart.jsx";

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
        <Route path="/products" element={<CategoryPage />} />
        <Route path="/" element={<Home />} />
        <Route path="products/:productName" element={<ProductPage />} />
        {/* apostrophes cant be ignored in the backend
        for now the ProductPage URL must contain apostrophes to find "Pinda's" */}
        <Route
          path="/zoeken"
          element={<ProductSearch searchResults={searchResults} />}
        />
        <Route path="/account" element={<Account />} />
        <Route path="/shoppingcart" element={<ShoppingCart />} />
      </Routes>
    </div>
  );
}
