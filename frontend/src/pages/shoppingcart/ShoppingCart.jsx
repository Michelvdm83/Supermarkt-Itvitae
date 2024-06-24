import Banner from "../../components/Banner/Banner.jsx";
import ProductBoxShoppingCart from "../../components/ProductBoxShoppingCart/ProductBoxShoppingCart.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function ShoppingCart({ getShoppingCart }) {
  const navigate = useNavigate();
  const jwt = sessionStorage.getItem("JWT");
  const role = sessionStorage.getItem("ROLE");
  const [products, setProducts] = useState([]);
  const [cartId, setCartId] = useState("");

  useEffect(() => {
    if (jwt == null) {
      navigate("/login");
    } else if (role !== "customer") {
      navigate("/");
    } else {
      getShoppingCartContent();
    }
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
        if (response.data === "") {
          setCartId("");
          setProducts([]);
        } else {
          setCartId(response.data.shoppingCartId);
          setProducts(response.data.shoppingCartProducts);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function checkout() {
    axios
      .patch(
        "http://localhost:8080/api/v1/shoppingcarts/checkout",
        {},
        {
          headers: {
            Authorization: "Bearer " + jwt,
          },
        }
      )
      .then(() => {
        setCartId("");
        setProducts([]);
        getShoppingCart();
      })
      .catch((error) => {
        alert("Betaling is niet gelukt");
      });
  }

  return (
    <div className="w-1/3 flex flex-col justify-center">
      <Banner bannerText="In uw winkelmandje" />
      <ul className="flex flex-col gap-4 mt-12">
        {products !== null &&
          products.map((product) => (
            <ProductBoxShoppingCart
              key={product.uuid}
              product={product}
              setProducts={setProducts}
              cartId={cartId}
              getShoppingCart={getShoppingCart}
            />
          ))}
      </ul>
      {products.length > 0 && (
        <div className=" self-center">
          <button
            onClick={checkout}
            className="text-white bg-nn-green mt-6 rounded-2xl font-extrabold h-10 w-24 justify-center items-center"
          >
            Afrekenen
          </button>
        </div>
      )}
    </div>
  );
}
