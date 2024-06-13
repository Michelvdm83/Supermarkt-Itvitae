import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./SearchBar.css";

export default function SearchBar( {setSearchResults} ) {
    const navigate = useNavigate();

    const [text, setText] = useState("");

    function search() {
        axios.get('http://localhost:8080/api/v1/products/searchbar?contains=' + text)
        .then(response => {
            setSearchResults(response.data);
            navigate("/zoeken");
        })
    }

    return (
        <div className="searchbar">
            <input 
            type="text"
            placeholder="Zoeken..."
            value={text}
            onChange={(event) => setText(event.target.value)}
            />
            <button className="searchbar-button" onClick={search}>Zoek</button>
        </div>
    )
}