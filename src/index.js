import React, { useState } from "react";
import ReactDom from "react-dom";
import axios from "axios";

import "./styles.css";

function App() {
  const [book, setBook] = useState("");
  const [result, setResult] = useState([]);
  const [apiKey, setApiKey] = useState(
    "AIzaSyARtJvyjBDV6MUDXGx6ExmeSPA89V-Z2JE"
  );

  function handleChange(event) {
    const book = event.target.value;
    setBook(book);
  }

  function handleSubmit(event) {
    event.preventDefault();

    axios
      .get(
        "https://www.googleapis.com/books/v1/volumes?q=" +
          book +
          "&key=" +
          apiKey +
          "&maxResults=40"
      )
      .then((data) => {
        console.log(data.data.items);
        setResult(data.data.items);
      });

    console.log(book);
  }
  return (
    <div class="container">
      <h1>Book Search App</h1>
      <form onSubmit={handleSubmit}>
        <div class="form-group">
          <input
            type="text"
            onChange={handleChange}
            className="form-control mt-10"
            placeholder="Search for Books"
            autoComplete="off"
          />
        </div>
        <button type="Submit" className="btn btn-danger">
          Search
        </button>
      </form>

      {result.map((book) => (
        <a target="blank" href={book.volumeInfo.previewLink}>
          <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.title} />
        </a>
      ))}
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDom.render(<App />, rootElement);
