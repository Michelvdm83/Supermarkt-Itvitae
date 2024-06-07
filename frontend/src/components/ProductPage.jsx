import { useState } from "react";
import { useEffect } from "react";

export default function ProductPage() {
  const [product, setProduct] = useState([]);

  useEffect(getProduct, []);

  function getProduct() {
    fetch("http://localhost:8080/api/v1/products/Kaas")
      .then((response) => response.json())
      .then((body) => setProduct(body))
      .catch((error) => console.log(error));
  }

  function productPrice(productToCheck) {
    return productToCheck.salesPrice > 0
      ? productToCheck.salesPrice
      : productToCheck.price;
  }

  return (
    <>
      <ul>
        <li>{product.name}</li>
        <li>{productPrice(product)}</li>
      </ul>
    </>
  );
}
