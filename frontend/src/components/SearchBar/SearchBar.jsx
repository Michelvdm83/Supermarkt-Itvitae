import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function SearchBar({ setSearchResults }) {
  const navigate = useNavigate();

  const [text, setText] = useState("");
  const [namesList, setNamesList] = useState([]);

  function search() {
    axios
      .get("http://localhost:8080/api/v1/products/searchbar?contains=" + text)
      .then((response) => {
        setSearchResults(response.data);
        navigate("/search");
      });
  }

  let allowSearch = true;
  function updateList(event) {
    if (event.target.value.length >= 2 && allowSearch) {
      axios
        .get("http://localhost:8080/api/v1/products/names?contains=" + text)
        .then((response) => {
          setNamesList(response.data);
          allowSearch = false;
          setTimeout(() => {
            allowSearch = true;
          }, 300);
        });
    }
  }

  function goToProduct(event) {
    if (
      event.nativeEvent.inputType == "insertReplacementText" ||
      event.nativeEvent.inputType == null
    ) {
      navigate("/products/" + event.target.value);
      navigate(0);
      setText("");
      setNamesList([]);
    } else {
      setText(event.target.value);
    }
  }

  return (
    <div className="border-nn-green min-w-fit border-2 rounded-2xl">
      <input
        className="ml-4 focus:outline-none"
        onKeyDown={(e) => (e.key === `Enter` ? search() : "")}
        onKeyUp={(event) => updateList(event)}
        type="text"
        placeholder="Zoeken..."
        value={text}
        onChange={(event) => goToProduct(event)}
        list="products"
        //onInput={(event) => goToProduct(event)}
      />
      <datalist id="products">
        {namesList.map((name) => (
          <option key={name}>{name}</option>
        ))}
      </datalist>
      <button
        className="bg-nn-green rounded-2xl h-7 w-12 justify-center items-center"
        onClick={search}
      >
        Zoek
      </button>
    </div>
  );
}
