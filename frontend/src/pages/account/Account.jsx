import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Banner from "../../components/Banner/Banner";

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
    const currentRole = sessionStorage.getItem(ROLE_STORAGE_LOCATION);
    axios
      .get("http://localhost:8080/api/v1/" + currentRole + "s/page-info", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + sessionStorage.getItem("JWT"),
        },
      })
      .then((response) => {
        if (currentRole === "customer") {
          setMostBought(response.data.mostBoughtProducts);
          setPageData(response.data.customerInfo);
        } else if (currentRole === "manager") {
          setPageData(response.data);
        }
      });
  }, []);

  function logout() {
    sessionStorage.removeItem(USERNAME_STORAGE_LOCATION);
    sessionStorage.removeItem(TOKEN_STORAGE_LOCATION);
    sessionStorage.removeItem(ROLE_STORAGE_LOCATION);
    navigate("/");
  }

  return (
    <div className="flex-col w-1/2 mt-16  gap-8 flex">
      <div className="flex flex-col gap-8 border-2 rounded-2xl shadow-xl">
        {pageData && (
          <div className="flex justify-center mt-8 text-lg font-medium">
            Welkom, {pageData.name}!
          </div>
        )}
        {pageData && (
          <div className="flex justify-center">{pageData.email}</div>
        )}

        <button
          className="mb-4 mx-4 bg-gray-400 rounded m-1 p-1"
          onClick={logout}
        >
          Uitloggen
        </button>
      </div>
      {sessionStorage.getItem(ROLE_STORAGE_LOCATION) === "customer" && (
        <Banner bannerText="Meest gekocht" />
      )}
      <div className="flex items-stretch justify-between">
        {mostBought &&
          sessionStorage.getItem(ROLE_STORAGE_LOCATION) === "customer" &&
          mostBought.map((product) => (
            <div
              onClick={() => navigate("/products/" + product.productname)}
              key={product.productname}
              className="gap-8 border-2 rounded-2xl shadow-xl w-40 h-28 flex justify-center items-center cursor-pointer"
            >
              {product.quantity}x {product.productname}
            </div>
          ))}
        {sessionStorage.getItem(ROLE_STORAGE_LOCATION) === "manager" && (
          <div className=" my-4">
            <button
              className="bg-nn-green rounded my-2 p-1"
              onClick={() => navigate("/add-product")}
            >
              Voeg een nieuw product toe aan het assortiment
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
