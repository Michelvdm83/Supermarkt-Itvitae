import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function ProductPage() {
  const [product, setProduct] = useState({});
  const { productName } = useParams();

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

  const NLEuro = new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
  });

  return (
    <>
      <p>{product.name}</p>
      <p>{NLEuro.format(productPrice(product))}</p>
      <p>{product.category}</p>
      <p>{product.description}</p>
      <p>
        <button class=" bottom-auto">Add to cart</button>
      </p>
    </>
  );
}
