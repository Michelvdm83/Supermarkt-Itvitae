import Banner from "../../components/Banner/Banner.jsx";
import ProductBox from "../../components/ProductBox/ProductBox.jsx";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [topSales, setTopSales] = useState([]);

  function fetchTopSales() {
    axios
      .get("http://localhost:8080/api/v1/products/bestsales")
      .then((response) => {
        setTopSales(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    fetchTopSales();
  }, []);

  return (
    <div className="w-1/3 flex flex-col justify-center">
      <Banner bannerText="In de aanbieding" />
      <ul className="mt-12 flex flex-col gap-4">
        {topSales.map((product) => (
          <ProductBox key={product.name} product={product} />
        ))}
      </ul>
    </div>
  );
}
