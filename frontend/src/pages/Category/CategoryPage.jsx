import { useEffect, useState } from "react";
import CategoryBox from "./CategoryBox";

export default function CategoryPage() {
  const [categories, setCategories] = useState();

  useEffect(getCategories, []);

  function getCategories() {
    fetch(`http://localhost:8080/api/v1/categories`)
      .then((response) => response.json())
      .then((body) => setCategories(body))
      .catch((error) => console.log(error));
  }

  return (
    <>
      <div className="flex flex-row mt-16 flex-wrap">
        {categories &&
          categories.map((category) => (
            <CategoryBox name={category} key={category} />
          ))}
      </div>
    </>
  );
}
