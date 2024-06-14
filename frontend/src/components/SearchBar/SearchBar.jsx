import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function SearchBar({ setSearchResults }) {
  const navigate = useNavigate();

  const [text, setText] = useState("");

  function search() {
    axios
      .get("http://localhost:8080/api/v1/products/searchbar?contains=" + text)
      .then((response) => {
        setSearchResults(response.data);
        navigate("/zoeken");
      });
  }

  return (
    <div className="border-nn-green min-w-fit border-2 rounded-2xl">
      <input
        className="ml-4"
        type="text"
        placeholder="Zoeken..."
        value={text}
        onChange={(event) => setText(event.target.value)}
      />
      <button
        className="bg-nn-green rounded-2xl h-7 w-12 justify-center items-center"
        onClick={search}
      >
        Zoek
      </button>
    </div>
  );
}
