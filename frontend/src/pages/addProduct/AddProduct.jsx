import { useState } from "react";

export default function AddProduct() {
  const USERNAME_STORAGE_LOCATION = "USERNAME";
  const TOKEN_STORAGE_LOCATION = "JWT";
  const ROLE_STORAGE_LOCATION = "ROLE";

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [salesPrice, setSalesPrice] = useState(0);
  const [category, setCategory] = useState("");

  function handleSubmit() {
    console.log("Click");
  }

  return (
    <>
      {sessionStorage.getItem(ROLE_STORAGE_LOCATION) !== "manager" && (
        <div className="my-16 text-2xl">
          <p>U bent niet gemachtigd om deze pagina te bekijken.</p>
        </div>
      )}
      {sessionStorage.getItem(ROLE_STORAGE_LOCATION) === "manager" && (
        <div className="flex flex-col items-center my-8 text-lg">
          <p>Een product toevoegen:</p>

          <div className="flex flex-col items-end">
            <div className="flex my-2">
              <p className="mx-2">Naam</p>
              <input
                className="border-4 rounded-md focus:outline-none invalid:border-red-700 valid:border-green-700"
                type="text"
                minLength={3}
                required
                placeholder="product naam"
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                  console.log(name);
                }}
                autoComplete="false"
                key="name"
              />
            </div>

            <div className="flex my-2">
              <p className="mx-2">Omschrijving</p>
              <input
                className="border-4 rounded-md focus:outline-none invalid:border-red-700 valid:border-green-700"
                type="text"
                minLength={5}
                required
                placeholder="product omschrijving"
                value={description}
                onChange={(event) => {
                  setDescription(event.target.value);
                  console.log(description);
                }}
                autoComplete="false"
                key="description"
              />
            </div>

            <div className="flex my-2">
              <p className="mx-2">Prijs in €</p>
              <input
                className="border-4 rounded-md focus:outline-none invalid:border-red-700 valid:border-green-700"
                type="number"
                required
                min={0}
                step={0.01}
                placeholder="product prijs"
                value={price}
                onChange={(event) => {
                  setPrice(event.target.value);
                  console.log(price);
                }}
                autoComplete="false"
                key="price"
              />
            </div>

            <div className="flex my-2">
              <p className="mx-2">(optioneel) Aanbiedingsprijs in €</p>
              <input
                className="border-4 rounded-md focus:outline-none invalid:border-red-700 valid:border-green-700"
                type="number"
                min={0}
                step={0.01}
                placeholder="aanbiedingsprijs"
                value={salesPrice}
                onChange={(event) => {
                  setSalesPrice(event.target.value);
                  console.log(salesPrice);
                }}
                autoComplete="false"
                key="salesPrice"
              />
            </div>
          </div>

          <button
            className="bg-gray-400 rounded my-2 p-1"
            onClick={() => handleSubmit()}
          >
            Opslaan
          </button>
        </div>
      )}
    </>
  );
}
