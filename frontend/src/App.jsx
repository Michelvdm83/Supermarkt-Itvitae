import { Routes, Route, useNavigate } from "react-router-dom";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import Sales from "./pages/Sales/Sales";
import ProductPage from "./pages/ProductPage";
import "./index.css";
import Login from "./pages/login/Login";
import { useState, useEffect } from "react";
import ProductSearch from "./pages/productsearch/ProductSearch";
import Account from "./pages/account/Account";
import CategoryPage from "./pages/Category/CategoryPage";
import Home from "./pages/home/Home";
import ShoppingCart from "./pages/shoppingcart/ShoppingCart.jsx";
import ProductsByCategory from "./pages/ProductsByCategory/ProductsByCategory.jsx";
import axios from "axios";
import Register from "./pages/customerregistration/Register.jsx";
import AddProduct from "./pages/addProduct/AddProduct";

export default function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [shoppingcartItems, setShoppingcartItems] = useState([]);

  const navigate = useNavigate();

  const getShoppingCart = () => {
    if (sessionStorage.getItem("ROLE") == "customer") {
      axios
        .get("http://localhost:8080/api/v1/shoppingcarts", {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + window.sessionStorage.getItem("JWT"),
          },
        })
        .then((data) => {
          if (data.data === "") {
            setShoppingcartItems([]);
          } else {
            setShoppingcartItems(data.data.shoppingCartProducts);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    getShoppingCart();
  }, []);

  return (
    <div className="flex items-center justify-center flex-col">
      <NavigationBar
        shoppingcartItems={shoppingcartItems}
        setSearchResults={setSearchResults}
      />
      <Routes>
        <Route
          path="/login"
          element={<Login role="customer" getShoppingCart={getShoppingCart} />}
        />
        <Route path="/login-manager" element={<Login role="manager" />} />
        <Route path="/sales" element={<Sales />} />
        <Route path="/products" element={<CategoryPage />} />
        <Route path="/" element={<Home />} />
        <Route
          path="products/:productName"
          element={<ProductPage setShoppingcartItems={setShoppingcartItems} />}
        />
        <Route
          path="/search"
          element={<ProductSearch searchResults={searchResults} />}
        />
        <Route path="category/:categoryName" element={<ProductsByCategory />} />
        <Route path="/account" element={<Account />} />
        <Route
          path="/shoppingcart"
          element={<ShoppingCart getShoppingCart={getShoppingCart} />}
        />
        <Route path="/register" element={<Register />} />
        <Route path="/add-product" element={<AddProduct />} />
      </Routes>
    </div>
  );
}
