import { useState, useEffect } from "react";
import axios from "axios";
import Banner from "../../components/Banner/Banner.jsx";
import ProductBox from "../../components/ProductBox/ProductBox.jsx";
import CategoryBanner from "../../components/Banner/Categorybanner.jsx";

export default function Sales() {
  const [sales, setSales] = useState([]);

  function fetchSales() {
    axios
      .get("http://localhost:8080/api/v1/products/sales")
      .then((response) => {
        setSales(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    fetchSales();
  }, []);

  let currentCategory = "";
  return (
    <div className="w-1/3 flex flex-col justify-center">
      <Banner bannerText="In de aanbieding" />
      <ul className=" flex flex-col gap-4">
        {sales.map((product) => {
          if (product.category === currentCategory) {
            return <ProductBox key={product.name} product={product} />;
          } else {
            currentCategory = product.category;
            return (
              <div className="flex flex-col gap-2" key={product.name}>
                <CategoryBanner bannerText={product.category} />
                <ProductBox product={product} />
              </div>
            );
          }
        })}
      </ul>
    </div>
  );
}
