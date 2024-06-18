import Banner from "../../components/Banner/Banner.jsx";
import ProductBoxShoppingCart from "../../components/ProductBoxShoppingCart/ProductBoxShoppingCart.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function ShoppingCart() {
  const navigate = useNavigate();
  const jwt = sessionStorage.getItem("JWT");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (jwt == null) {
      navigate("/login");
    }
    getShoppingCartContent();
  }, []);

  const getShoppingCartContent = () => {
    axios
      .get(`http://localhost:8080/api/v1/shoppingcarts`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + window.sessionStorage.getItem("JWT"),
        },
      })
      .then((response) => {
        setProducts(response.data.shoppingCartProducts);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="w-1/3 flex flex-col justify-center">
      <Banner bannerText="In uw winkelmandje" />
      <ul className="mt-12 flex flex-col gap-4">
        {products !== null &&
          products.map((product) => (
            <ProductBoxShoppingCart key={product.uuid} product={product} />
          ))}
      </ul>
    </div>
  );
}
