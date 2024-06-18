export default function AddProduct() {
  const USERNAME_STORAGE_LOCATION = "USERNAME";
  const TOKEN_STORAGE_LOCATION = "JWT";
  const ROLE_STORAGE_LOCATION = "ROLE";

  return (
    <>
      {sessionStorage.getItem(ROLE_STORAGE_LOCATION) !== "manager" && (
        <div className="my-16 text-2xl">
          <p>U bent niet gemachtigd deze pagina te bekijken.</p>
        </div>
      )}
      {sessionStorage.getItem(ROLE_STORAGE_LOCATION) === "manager" && (
        <div>
          <p>Hallo Manager</p>
        </div>
      )}
    </>
  );
}
