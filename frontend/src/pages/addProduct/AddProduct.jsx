export default function AddProduct() {
  const USERNAME_STORAGE_LOCATION = "USERNAME";
  const TOKEN_STORAGE_LOCATION = "JWT";
  const ROLE_STORAGE_LOCATION = "ROLE";

  return (
    <>
      {sessionStorage.getItem(ROLE_STORAGE_LOCATION) !== "manager" && (
        <div className="my-16 text-2xl">
          <p>U bent niet gemachtigd om deze pagina te bekijken.</p>
        </div>
      )}
      {sessionStorage.getItem(ROLE_STORAGE_LOCATION) === "manager" && (
        <div className="flex flex-col">
          <p>Een product toevoegen:</p>
          <div className="my-2">
            <input
              className="border-2 focus:outline-none invalid:border-red-700 valid:border-green-700"
              type="text"
              placeholder="product naam"
              onChange={(event) => event}
              required
              autoComplete="false"
              key="mail"
            />
            <button className="mx-2" onClick={() => console.log("click")}>
              Opslaan
            </button>
          </div>

          <div className="my-2">
            <input
              className="border-2 focus:outline-none invalid:border-red-700 valid:border-green-700"
              type="text"
              placeholder="product beschrijving"
              onChange={(event) => event}
              required
              autoComplete="false"
              key="description"
            />
            <button className="mx-2" onClick={() => console.log("click")}>
              Opslaan
            </button>
          </div>
        </div>
      )}
    </>
  );
}
