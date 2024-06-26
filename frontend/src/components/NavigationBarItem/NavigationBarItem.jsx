import { useNavigate } from "react-router-dom";

export default function NavigationBarItem({ title, page }) {
  const navigate = useNavigate();

  return (
    <button
      className=" text-nn-green text-xl font-medium "
      onClick={() => navigate("/" + page)}
    >
      {title}
    </button>
  );
}
