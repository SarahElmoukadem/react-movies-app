import React, { useState,useEffect, useCallback } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading,setIsLoading] = useState(false);
  const [error,setError] = useState(null);

  // Fetch
  // const showMoviesHandler = () => {
  //    fetch('https://swapi.dev/api/films/')
  //   .then(response => {return response.json()})
  //   .then(
  //     (data) => {
  //       const transformedMovie =  data.results.map(movieData => {
  //         return {
  //           id:movieData.episode_id,
  //           title:movieData.title,
  //           openingText:movieData.opening_crawl,
  //           releaseDate:movieData.release_date
  //         }

  //       })

  //       setMovies(transformedMovie)
  //     })
  // }

  // async - await
  const showMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try{

      const response = await fetch('https://swapi.dev/api/films/')

if(!response.ok) {
  throw new Error('My error Message');
}

      const data = await response.json()
  
      const transformedMovie = data.results.map(movieData => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date
        }
  
      })
      
          setMovies(transformedMovie)
          setIsLoading(false);

    } catch(error) {
      setError(error.message);
    }

  }, [])
  
  useEffect(() => {
    showMoviesHandler()
  }, [showMoviesHandler])


  return (
    <React.Fragment>
      <section>
        <button onClick={showMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && movies.length > 0  && <MoviesList movies={movies} />}
        {!isLoading && movies.length === 0  && <p>No Movies Found</p>}
        {!isLoading && error &&  <p>Wait Content Please Loading.... </p>}
        {isLoading && error &&  <p>Error.... </p>}
       
      </section>
    </React.Fragment>
  );
}

export default App;
