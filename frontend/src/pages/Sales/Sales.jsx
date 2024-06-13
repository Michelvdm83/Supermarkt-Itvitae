import { useState, useEffect } from "react";
import axios from "axios";
import Banner from "../../components/Banner/Banner.jsx";
import ProductBox from "../../components/ProductBox/ProductBox.jsx";

export default function Sales() {
  const [sales, setSales] = useState([]);

  function fetchSales() {
    axios
      .get("http://localhost:8080/api/v1/products/sales")
      .then((response) => {
        console.log(response.data);
        setSales(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    fetchSales();
  }, []);

  return (
    <div className="w-1/3 flex flex-col content-center justify-center">
      <Banner bannerText="In de aanbieding" />
      <ul className="mt-12 flex flex-col gap-4">
        {sales.map((product) => (
          <ProductBox key={product.name} product={product} />
        ))}
      </ul>
    </div>
  );
}
