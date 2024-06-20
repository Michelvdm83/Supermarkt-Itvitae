import axios from "axios";
import { useState } from "react";

export default function EditablePriceField({ fieldName, product, setProduct }) {
  const original =
    fieldName === "price"
      ? Number(product.price).toFixed(2)
      : product.salesPrice === null
      ? ""
      : Number(product.salesPrice).toFixed(2);
  const [priceEdit, setPriceEdit] = useState(original);
  const [editingPrice, setEditingPrice] = useState(false);
  const [priceButtonText, setPriceButtonText] = useState("edit");

  const title = fieldName === "price" ? "prijs" : "aanbiedingsprijs";

  function handleClick() {
    if (editingPrice) {
      let parsedPrice;
      if (fieldName !== "salesPrice" && priceEdit === "") {
        alert("Product moet een prijs hebben");
        setPriceEdit(original);
        return;
      } else if (priceEdit === "") {
        parsedPrice = null;
      } else if (priceEdit <= 0) {
        alert("Prijzen moeten hoger dan €0,00 zijn");
        setPriceEdit(original);
        return;
      } else {
        parsedPrice = new Number(priceEdit);
        parsedPrice = parsedPrice.toFixed(2);
        setPriceEdit(parsedPrice);
      }
      console.log(parsedPrice);

      axios
        .patch(
          "http://localhost:8080/api/v1/products/update/" +
            product.name +
            "?updateSales=" +
            (fieldName === "salesPrice"),
          {
            [fieldName]: parsedPrice,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + sessionStorage.getItem("JWT"),
            },
          }
        )
        .then((response) => setProduct(response.data))
        .catch((error) => alert("Er is iets fout gegaan bij het opslaan"));
    }
    setEditingPrice(!editingPrice);
    setPriceButtonText(priceButtonText === "edit" ? "save" : "edit");
  }

  return (
    <div className="flex gap-4">
      <div>{title}: </div>
      <div>€</div>
      <input
        className="w-12 bg-gray-100 rounded-2xl mr-4 size-10 "
        type="number"
        step={0.01}
        value={priceEdit}
        onChange={(e) => {
          setPriceEdit(e.target.value);
        }}
        disabled={!editingPrice}
      />
      <button onClick={handleClick}>{priceButtonText}</button>
    </div>
  );
}
