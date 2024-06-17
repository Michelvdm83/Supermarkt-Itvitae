import axios from "axios";
import { useEffect, useState } from "react";

export default function Account() {
  const [pageData, setPageData] = useState({});
  const [mostBought, setMostBought] = useState([]);

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
        console.log(response.data);
        setMostBought(response.data.mostBoughtProducts);
        setPageData(response.data);
      });
  }, []);
  return (
    <div>
      {pageData && <div>{pageData.name}</div>}
      {pageData && <div>{pageData.email}</div>}
      {pageData &&
        mostBought.map((product) => (
          <div key={product.name}>{product.name}</div>
        ))}
    </div>
  );
}
