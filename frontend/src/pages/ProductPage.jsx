import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function ProductPage() {
  const [product, setProduct] = useState({});
  const { productName } = useParams();
  const [quantity, setQuantity] = useState(1);

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
      console.log("succes");
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

  const log = (quantity) => {
    console.log(quantity);
  };

  return (
    <>
      <p>{product.name}</p>
      <p>{NLEuro.format(productPrice(product))}</p>
      <p>{product.category}</p>
      <p>{product.description}</p>
      <p>
        <input
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        ></input>
      </p>
      <p>
        <button onClick={addProductToCart} className="bottom-auto">
          Add to cart
        </button>
      </p>
    </>
  );
}
