import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [moviesList, setMovieList] = useState([]);

  async function fetchMovieHandler() {
    const response = await fetch("https://swapi.dev/api/films/");
    const data = await response.json();
    const transFormedMovie = data.results.map((movie) => {
      return {
        id: movie.episode_id,
        title: movie.title,
        openingText: movie.opening_crawl,
        relreaseDate: movie.relrease_date,
      };
    });
    setMovieList(transFormedMovie);
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
