import React, { useState, useEffect, useCallback } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [moviesList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMovieHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("https://swapi.dev/api/films/");

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
  }, []);

  useEffect(() => {
    fetchMovieHandler();
  }, [fetchMovieHandler]);

  let content = <p>Now Loading...</p>;

  if (error) content = <p>{error}</p>;
  if (!isLoading && moviesList.length === 0 && !error)
    content = <p>Found Not Movies.</p>;
  if (!isLoading && moviesList.length > 0)
    content = <MoviesList movies={moviesList} />;

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
