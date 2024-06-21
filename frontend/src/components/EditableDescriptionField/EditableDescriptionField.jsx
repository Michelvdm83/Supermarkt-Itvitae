import axios from "axios";
import { useState } from "react";

export default function EditableDescriptionField({ product, setProduct }) {
  const [text, setText] = useState(product.description);
  const [editingText, setEditingText] = useState(false);
  const [buttonText, setButtonText] = useState("edit");

  function handleClick() {
    if (editingText) {
      if (text.trim() === "") {
        alert("omschrijving van een product mag niet leeg zijn");
        return;
      }
      axios
        .patch(
          "http://localhost:8080/api/v1/products/update/" +
            product.name +
            "?updateSales=" +
            false,
          {
            description: text,
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
    setEditingText(!editingText);
    setButtonText(buttonText === "edit" ? "save" : "edit");
  }

  return (
    <div className="flex">
      <input
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
        disabled={!editingText}
      />
      <button onClick={handleClick}>{buttonText}</button>
    </div>
  );
}
