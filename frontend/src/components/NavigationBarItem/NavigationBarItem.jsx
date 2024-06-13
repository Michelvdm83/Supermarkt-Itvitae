import { useNavigate } from "react-router-dom";

export default function NavigationBarItem({ title, page }) {
  const navigate = useNavigate();

  return (
    <button
      className="border-nn-orange px-2 border-2 rounded-2xl"
      onClick={() => navigate("/" + page)}
    >
      {title}
    </button>
  );
}
