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
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  function deleteProduct() {
    if (!confirm(product.name + " verwijderen uit assortiment?")) {
      return;
    }
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
    "text-white rounded-2xl w-24 font-extrabold h-10 mr-2 p-2 flex justify-center items-center ";
  buttonCSS += product.salesPrice ? "bg-nn-pink" : "bg-nn-green";

  return (
    <div className="flex flex-wrap justify-center border-2 w-2/5 h-96 gap-4 rounded-2xl shadow-xl mt-20 ">
      <div className="flex flex-col w-2/4 mt-8 gap-4">
        <p className="text-lg font-medium">{product.name}</p>
        {role !== "manager" && <p>{product.description}</p>}
        {role === "manager" && product.description && (
          <EditableDescriptionField
            className=" bg-gray-100 rounded-2xl mr-4 size-10 "
            product={product}
            setProduct={setProduct}
          />
        )}
      </div>
      <div className="flex flex-col justify-between my-8">
        <div className="flex justify-end">
          {role === "manager" && product.name && (
            <button
              className="text-white bg-red-500 rounded-2xl font-extrabold p-2 flex justify-center items-center"
              onClick={deleteProduct}
            >
              Delete Product
            </button>
          )}
        </div>
        <div className="flex">
          <div className="flex flex-col items-end">
            {role === "manager" && product.price && (
              <EditablePriceField
                className=""
                fieldName="price"
                product={product}
                setProduct={setProduct}
              />
            )}
            {role === "manager" && product.price && (
              <EditablePriceField
                fieldName="salesPrice"
                product={product}
                setProduct={setProduct}
              />
            )}
          </div>
        </div>
        <div className="flex gap-4 items-center">
          {role !== "manager" && <div className="">{getPrice()}</div>}
          {role === "customer" && (
            <div className="flex ">
              <input
                className="bg-gray-100 w-10 rounded-2xl text-center"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.round(e.target.value))}
              ></input>
              <button className={buttonCSS} onClick={addProductToCart}>
                Voeg toe
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
