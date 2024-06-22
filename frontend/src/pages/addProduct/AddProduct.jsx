import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
  const USERNAME_STORAGE_LOCATION = "USERNAME";
  const TOKEN_STORAGE_LOCATION = "JWT";
  const ROLE_STORAGE_LOCATION = "ROLE";
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0.01);
  const [salesPrice, setSalesPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState();

  const inputfieldCSS =
    "border-2 pl-2 border-nn-green min-w-fit rounded-2xl focus:outline-none valid:bg-nn-green-faded";

  useEffect(getCategories, []);

  function getCategories() {
    fetch(`http://localhost:8080/api/v1/categories`)
      .then((response) => response.json())
      .then((body) => {
        setCategories(body);
        setCategory(body[0]);
      })
      .catch((error) => console.log(error));
  }

  function handleSubmit() {
    let tempSalesPrice = salesPrice;
    if (tempSalesPrice === 0) {
      tempSalesPrice = null;
    }
    const product = {
      name: name,
      description: description,
      price: +price.toFixed(2),
      salesPrice: tempSalesPrice ? +tempSalesPrice.toFixed(2) : tempSalesPrice,
      category: category,
    };

    fetch("http://localhost:8080/api/v1/products/addNew", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer " + sessionStorage.getItem(TOKEN_STORAGE_LOCATION),
      },
      body: JSON.stringify(product),
    })
      .then((response) => response.json())
      .then((body) => navigate("/products/" + body.name))
      .catch((error) => alert("Product kon niet worden toegevoegd"));
  }

  function checkValues() {
    if (name.length < 3) {
      return false;
    }
    if (description.length < 5) {
      return false;
    }
    if (price < 0.01 || price === NaN) {
      return false;
    }
    if (salesPrice < 0 || salesPrice === NaN) {
      return false;
    }
    if (salesPrice >= price) {
      return false;
    }
    return true;
  }

  return (
    <>
      {sessionStorage.getItem(ROLE_STORAGE_LOCATION) !== "manager" ? (
        <div className="my-16 text-2xl">
          <p>U bent niet gemachtigd om deze pagina te bekijken.</p>
        </div>
      ) : (
        <div className="flex flex-col border-2 rounded-2xl shadow-xl p-4 items-center my-8 text-lg">
          <p className="text-lg font-medium bg-nn-green mb-4 h-8 px-2 rounded-2xl">
            Nieuw product
          </p>

          <div className="flex flex-col items-end">
            <div className="flex my-2">
              <p className="mx-2">Naam</p>
              <input
                className={inputfieldCSS}
                type="text"
                minLength={3}
                required
                placeholder="Productnaam"
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                }}
                autoComplete="false"
                key="name"
              />
            </div>

            <div className="flex my-2">
              <p className="mx-2">Omschrijving</p>
              <input
                className={inputfieldCSS}
                type="text"
                minLength={5}
                required
                placeholder="Omschrijving"
                value={description}
                onChange={(event) => {
                  setDescription(event.target.value);
                }}
                autoComplete="false"
                key="description"
              />
            </div>

            <div className="flex my-2">
              <p className="mx-2">Prijs in €</p>
              <input
                className={inputfieldCSS}
                type="number"
                required
                min={0.01}
                step={0.01}
                placeholder="product prijs"
                value={price}
                onChange={(event) => {
                  setPrice(
                    event.target.value ? parseFloat(event.target.value) : 0
                  );
                }}
                autoComplete="false"
                key="price"
              />
            </div>

            <div className="flex my-2">
              <p className="mx-2">(optioneel) Aanbiedingsprijs in €</p>
              <input
                className={inputfieldCSS}
                type="number"
                min={0}
                step={0.01}
                placeholder="aanbiedingsprijs"
                value={salesPrice}
                onChange={(event) => {
                  setSalesPrice(
                    event.target.value ? parseFloat(event.target.value) : 0
                  );
                }}
                autoComplete="false"
                key="salesPrice"
              />
            </div>

            <div className="flex my-2">
              <p className="mx-2">Categorie</p>
              <select
                onChange={(event) => {
                  setCategory(event.target.value);
                }}
                name="category"
                id="category"
                className="w-56 mb-4 border-2 rounded-2xl px-2 border-nn-green"
              >
                {categories &&
                  categories.map((catagoryOption) => (
                    <option key={catagoryOption} value={catagoryOption}>
                      {catagoryOption.charAt(0) +
                        catagoryOption.slice(1).toLowerCase()}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          {checkValues() ? (
            <button
              className="bg-nn-green shadow-xl rounded-2xl px-2 h-8 font-semibold justify-center items-center"
              onClick={() => handleSubmit()}
            >
              Opslaan
            </button>
          ) : (
            <p className="bg-nn-green shadow-xl rounded-2xl px-2 h-8 font-semibold justify-center items-center">
              Opslaan
            </p>
          )}
        </div>
      )}
    </>
  );
}
