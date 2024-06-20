import axios from "axios";
import { useEffect, useState } from "react";
import ProductBox from "../../components/ProductBox/ProductBox";
import Banner from "../../components/Banner/Banner";
import { useParams } from "react-router-dom";

export default function ProductsByCategory() {
  const [productsOfCategory, setProductsOfCategory] = useState([]);
  const { categoryName } = useParams();

  function fetchAllProductsOfCategory() {
    axios
      .get(`http://localhost:8080/api/v1/products/category/${categoryName}`)
      .then((response) => {
        setProductsOfCategory(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    fetchAllProductsOfCategory();
  }, []);

  return (
    <div className="w-1/3 flex flex-col justify-center">
      <Banner bannerText={"In de categorie " + categoryName + ":"} />
      <ul className=" flex flex-col gap-4">
        {productsOfCategory.map((product) => (
          <ProductBox key={product.name} product={product} />
        ))}
      </ul>
    </div>
  );
}
