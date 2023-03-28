import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [moviesList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchMovieHandler() {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("https://swapi.dev/api/film/");

      if (!response.ok) {
        console.log("Fetching is error");
        throw new Error("Something went  wrong");
      }

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
    } catch (error) {
      console.log("catch err");
      setError(error.message);
    }
    setIsLoading(false);
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && moviesList.length > 0 && (
          <MoviesList movies={moviesList} />
        )}
        {!isLoading && moviesList.length === 0 && !error && (
          <p>Found Not Movies.</p>
        )}
        {isLoading && <p>Now Loading...</p>}
        {!isLoading && error && <p>{error}</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
