import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import EditablePriceField from "../components/EditablePriceField/EditablePriceField";
import EditableDescriptionField from "../components/EditableDescriptionField/EditableDescriptionField";

export default function ProductPage({ setShoppingcartItems }) {
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const { productName } = useParams();

  const role = sessionStorage.getItem("ROLE");

  useEffect(getProduct, []);

  function getProduct() {
    fetch(`http://localhost:8080/api/v1/products/${productName}`)
      .then((response) => response.json())
      .then((body) => {
        setProduct(body);
      })
      .catch((error) => console.log(error));
  }

  function getPrice() {
    if (product.salesPrice != null) {
      return (
        <>
          <p className="text-nn-pink font-bold text-xl">
            {NLEuro.format(product.salesPrice)}
          </p>
          <p className="line-through">{NLEuro.format(product.price)}</p>
        </>
      );
    } else {
      return (
        <>
          <p className="font-medium">{NLEuro.format(product.price)}</p>
        </>
      );
    }
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
        .then((data) => {
          setQuantity(1);
          setShoppingcartItems(data.data.shoppingCartProducts);
          showProductHasBeenAdded();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  function deleteProduct() {
    axios
      .delete("http://localhost:8080/api/v1/products/remove/" + product.name, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + sessionStorage.getItem("JWT"),
        },
      })
      .then((response) => setProduct({}))
      .catch((error) => alert("Product kon niet verwijderd worden"));
  }

  const NLEuro = new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
  });

  let buttonCSS =
    "text-white rounded-2xl font-extrabold h-10 mr-2 p-2 flex justify-center items-center ";
  buttonCSS += product.salesPrice ? "bg-nn-pink" : "bg-nn-green";

  return (
    <div className="flex gap-8 border-2 rounded-2xl shadow-xl mt-20 w-1/3 h-80 ">
      <div className="flex flex-col size-40 gap-8 mt-10 ml-12">
        <p className="text-lg font-medium">{product.name}</p>
        {role !== "manager" && <p>{product.description}</p>}
        {role === "manager" && product.description && (
          <EditableDescriptionField
            className=" bg-gray-100 rounded-2xl mr-4 size-10 "
            product={product}
            setProduct={setProduct}
          />
        )}
        <div className="flex flex-col items-end mb-8 mx-8 ">
          {role !== "manager" && <div className="mr-10 ">{getPrice()}</div>}
          {role === "manager" && product.price && (
            <EditablePriceField
              className=" bg-gray-100 rounded-2xl mr-4 size-10 "
              fieldName="price"
              product={product}
              setProduct={setProduct}
            />
          )}
          {role === "customer" && (
            <div className="flex">
              <input
                className=" bg-gray-100 rounded-2xl mr-4 size-10 text-center"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              ></input>
              <button className={buttonCSS} onClick={addProductToCart}>
                Voeg toe
              </button>
            </div>
          )}

          {role === "manager" && product.price && (
            <EditablePriceField
              className=" bg-gray-100 rounded-2xl mr-4 size-10 "
              fieldName="salesPrice"
              product={product}
              setProduct={setProduct}
            />
          )}

          {role === "manager" && product.name && (
            <button onClick={deleteProduct}>delete product</button>
          )}
        </div>
      </div>
    </div>
  );
}
