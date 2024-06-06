import { useState } from 'react';

export default function SearchBar() {
    const [text, setText] = useState("");
    return (
        <div className="searchbar">
            <input 
            type="text"
            placeholder="Zoeken..."
            value={text}
            onChange={(event) => setText(event.target.value)}
            />
            <button onClick={() => console.log(text)}>Zoek</button>
        </div>
    )
}