import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AddProductButton from "../components/AddProductButton/AddProductButton";

export default function ProductPage() {
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const { productName } = useParams();

  const role = sessionStorage.getItem("ROLE");

  useEffect(getProduct, []);

  function getProduct() {
    fetch(`http://localhost:8080/api/v1/products/${productName}`)
      .then((response) => response.json())
      .then((body) => setProduct(body))
      .catch((error) => console.log(error));
  }

  function productPrice(productToCheck) {
    return productToCheck.salesPrice
      ? productToCheck.salesPrice
      : productToCheck.price;
  }
  const addProductToCart = () => {
    if (quantity <= 0) {
      alert("Het produkt aantal mag niet 0 of lager zijn.");
    } else {
      axios
        .post(
          "http://localhost:8080/api/v1/shoppingcarts",
          {
            productName: product.name,
            quantity: quantity,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + window.sessionStorage.getItem("JWT"),
            },
          }
        )
        .then(() => {
          setQuantity(1);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const NLEuro = new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
  });

  let buttonCSS =
    "text-white rounded-2xl font-extrabold h-10  mr-2 p-2 flex justify-center items-center ";
  buttonCSS += product.salesPrice ? "bg-nn-pink" : "bg-nn-green";

  return (
    <>
      <p>{product.name}</p>
      <p>{NLEuro.format(productPrice(product))}</p>
      <p>{product.category}</p>
      <p>{product.description}</p>
      {role === "customer" && (
        <>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          ></input>
          <button className={buttonCSS} onClick={addProductToCart}>
            Voeg toe
          </button>
        </>
      )}
    </>
  );
}
