import { useNavigate } from "react-router-dom";

export default function HomeButton({}) {
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate("")}>
      <img
        className="w-20 h-20 ml-4 mt-2"
        src="src\images\logo_met_tekst.png"
      ></img>
    </button>
  );
}
