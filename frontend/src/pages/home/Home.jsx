import Banner from "../../components/Banner/Banner.jsx";
import { useState, useEffect } from "react";
import axios from "axios";
import SmallProductBox from "../../components/ProductBox/SmallProductbox.jsx";

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
    <div className="mt-40 gap-8 flex flex-col w-4/5">
      <Banner bannerText="Beste deals" />
      <ul className="gap-4 flex flex-wrap w-full justify-center ">
        {topSales.map((product) => (
          <SmallProductBox key={product.name} product={product} />
        ))}
      </ul>
    </div>
  );
}
