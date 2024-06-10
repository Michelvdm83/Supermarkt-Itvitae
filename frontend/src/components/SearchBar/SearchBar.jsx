import { useState } from 'react';
import axios from 'axios';
import "./SearchBar.css";

export default function SearchBar() {

    const [text, setText] = useState("");

    function search() {
        console.log('search called');
        axios.get('http://localhost:8080/api/v1/products/searchbar?contains=' + text)
        .then(response => {
            console.log(response);
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