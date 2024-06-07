import { useNavigate } from "react-router-dom";
import "./NavigationBarItem.css";

export default function NavigationBarItem( { title, page }) {

    const navigate = useNavigate();

    return (
        <button className="navigationbar-item" onClick={() => navigate("/" + page)}>{title}</button>
    )
}