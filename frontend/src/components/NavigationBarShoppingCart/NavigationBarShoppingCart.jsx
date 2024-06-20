import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function NavigationBarShoppingCart({ title, page, shoppingcartItems }) {
  const navigate = useNavigate();

  return (
    <button
      className=" text-nn-green text-xl font-medium "
      onClick={() => navigate("/" + page)}
    >
      {title + " (" + shoppingcartItems.length + ")"}
    </button>
  );
}
