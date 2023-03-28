import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [moviesList, setMovieList] = useState([]);

  function fetchMovieHandler() {
    fetch("https://swapi.dev/api/films/")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // console.log(data.results.length);
        const transFormedMovie = data.results.map((movie) => {
          return {
            id: movie.episode_id,
            title: movie.title,
            openingText: movie.opening_crawl,
            relreaseDate: movie.relrease_date,
          };
        });
        setMovieList(transFormedMovie);
      });
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={moviesList} />
      </section>
    </React.Fragment>
  );
}

export default App;
