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
    <div className="w-1/3 flex flex-col justify-center gap-8">
      <Banner bannerText="In de aanbieding" />
      <ul className=" flex flex-col gap-4">
        {sales.map((product) => {
          if (product.category === currentCategory) {
            return <ProductBox key={product.name} product={product} />;
          } else {
            currentCategory = product.category;
            return (
              <>
                <Banner bannerText={product.category} />
                <ProductBox key={product.name} product={product} />
              </>
            );
          }
        })}
      </ul>
    </div>
  );
}
