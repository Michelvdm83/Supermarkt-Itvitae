import { useNavigate } from "react-router-dom"

export default function NavigationBarItem( { title, page }) {

    const navigate = useNavigate();

    return (
        <button onClick={() => navigate("/" + page)}>{title}</button>
    )
}