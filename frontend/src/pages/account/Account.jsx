import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Account() {
  const [pageData, setPageData] = useState({});
  const [mostBought, setMostBought] = useState([]);
  const navigate = useNavigate();

  const USERNAME_STORAGE_LOCATION = "USERNAME";
  const TOKEN_STORAGE_LOCATION = "JWT";
  const ROLE_STORAGE_LOCATION = "ROLE";

  useEffect(() => {
    if (sessionStorage.getItem("JWT") === null) {
      return;
    }
    axios
      .get("http://localhost:8080/api/v1/customers/page-info", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + sessionStorage.getItem("JWT"),
        },
      })
      .then((response) => {
        setMostBought(response.data.mostBoughtProducts);
        setPageData(response.data.customerInfo);
      });
  }, []);

  function logout() {
    sessionStorage.removeItem(USERNAME_STORAGE_LOCATION);
    sessionStorage.removeItem(TOKEN_STORAGE_LOCATION);
    sessionStorage.removeItem(ROLE_STORAGE_LOCATION);
    navigate("/");
  }

  return (
    <div>
      {pageData && <div>{pageData.name}</div>}
      {pageData && <div>{pageData.email}</div>}
      {mostBought &&
        mostBought.map((product) => (
          <div key={product.productname}>
            {product.quantity}x {product.productname}
          </div>
        ))}
      <button className=" bg-gray-400 rounded m-1 p-1" onClick={logout}>
        logout
      </button>
    </div>
  );
}
