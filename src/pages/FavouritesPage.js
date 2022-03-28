// Renders the favourites page, along with all the favourited movies.

import { fetchAPI } from '../helpers/tmdb';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import MovieTile from '../components/MovieTile';
import Spinner from '../components/Spinner';

import "./FavouritesPage.styles.scss";

export default function FavouritesPage(){
  // Set the state of all queried movies.
  const [moviesList, setMoviesList] = useState([]);
  // Set the state of the loading animation.
  const [loading, setLoading] = useState(false);
  // Load the favourites from redux store state.
  const favourites = useSelector((state) => state.favourites);

  // Render the fetchFavourites(), re-render when favourites updates.
  useEffect(function() {
    // Fetch the favourited movies, asynchronously.
    const fetchFavourites = async function(){
      // Display the loading animation while the API does its thing.
      setLoading(true);
      // Return an empty array, if the redux store state is empty.
      const promisesList = [];

      // Run a for loop, that returns the movie information for each favourited title.
      for (const movieId of favourites){
        const promise = fetchAPI(`movie/${movieId}`);
        // Apply the fetched movie objects into the promisesList array.
        promisesList.push(promise);
      }

      // Wait for all the favourite movies to be fetched. 
      const fetchedMovies = await Promise.all(promisesList);

      // Set the state of the moviesList with the generated fetchedMovies.
      setMoviesList(fetchedMovies);
      // Toggle the loading animation.
      setLoading(false);
    };
    
    // Run fetchFavourites();
    fetchFavourites();
  }, [favourites]);

  let content; 

  // If the API is returning information, then render the Spinner component animation.
  if(loading){
    content = <Spinner>Loading <span className='loading-cat'>favourites...</span></Spinner>;
    // Otherwise, if the list of movies is greater than zero, run a map loop using the MovieTile component to render each one on the page.
  }else if(moviesList.length > 0){
    <div>
      {content = moviesList.map((movie) => <MovieTile className="favourites-page-movie-tile" key={movie.id} movie={movie}/>)};
    </div>
  }else{
    // Otherwise, let the user know there are no saved favourite movies.
    content = (
      <>
        <p className='no-favourites'>Hmm, looks you don't have any favourite movies.</p>
        {/* Allow the user to return to the home page using a Link component. */}
        <Link className='return-home' to="/">Return to the home page.</Link>
      </>
    );
  }

  return (
    <>
      <div className='favourites-header'>
        <h3><span className='small-text'>my</span>K<span className='accent-yellow'>i</span>no Favourites</h3>
      </div>
      {/* Render either the loading spinner, the favourited tiles, or a message that there are no favourites. */}
      <div className='favourites-movies-list'>
        {content}
      </div>
    </>
  );
}