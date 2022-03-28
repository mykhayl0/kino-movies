// Renders all the MovieTile components.

import { fetchAPI } from '../helpers/tmdb';
import { filters } from '../config/filters';
import { useEffect, useState } from 'react';

import FilterDesktop from '../components/FilterDesktop';
import FilterMobile from '../components/FilterMobile';
import MatchMedia from '../components/MatchMedia';
import MovieTile from '../components/MovieTile';
import Spinner from '../components/Spinner';

import './FavouritesPage.styles.scss';
import './HomePage.styles.scss';

export default function HomePage(){
  // Set the list of movies to display on the HomePage.
  const [moviesList, setMoviesList] = useState([]);
  // Set whether loading animation is enabled/disabled.
  const [loading, setLoading] = useState(false);

  // Set the state of the page filter, to display popular/upcoming/new releases/now playing. Start with index 0, which is popular.
  const [filterValue, setFilterValue] = useState(filters[0]);

  // useEffect will run when the HomePage renders for the first time, re-renders when filterValue changes.
  useEffect(function() {

    // fetchData will call the API, asynchronously.
    const fetchData = async function() {
      // Toggle the loading animation while the API does its thing.
      setLoading(true);
      // Return an object of movies to display.
      const moviesResults = await fetchAPI(`movie/${filterValue.endpoint}`);

      // Display the first 18 movies.
      setMoviesList(moviesResults.results.slice(0, 18));
      // Set the loading animation to false.
      setLoading(false);
    };

    // Run fetchData()
    fetchData();
  }, [filterValue]);

  // Change the filter value, only if the page is not loading.
  const changeFilter = (filter) => {
    if(!loading) {
      setFilterValue(filter)
    }
  };

  let content;
// If the page is loading, display the Spinner component to let the user know the page is loading.
  if(loading){
    content = <Spinner>Loading <span className='loading-cat'>{filterValue.category}...</span></Spinner>;
    // Otherwise, display the movies using the MovieTile component, using map to loop through each one. 
  } else {
    content = <div className='movies-list'>{moviesList.map((movie) => <MovieTile className='homepage-movie-tile' key={movie.id} movie={movie}/>)}</div>;
  }

  return (
    <>
    {/* Using the MatchMedia component, only display the following content if the screen size is below 899px. */}
      <MatchMedia mediaQuery='(max-width: 899px)'>
        <div className='homepage-header'>
          <h3>K<span className='accent-yellow'>i</span>no Home</h3>
        </div>
        {/* Render the FilterMobile component. When it gets clicked, changeFilter value. */}
        <FilterMobile filterValue={filterValue} onFilterClick={changeFilter}/>
      </MatchMedia>

    {/* Using the MatchMedia component, only display the following content if the screen size is at least 900px */}
      <MatchMedia mediaQuery='(min-width: 900px)'>
        {/* Render the FilterDesktop component. When it gets clicked, changeFilter value. */}
        <FilterDesktop className='home-page-filter-desktop' filterValue={filterValue} onFilterClick={changeFilter}/>
      </MatchMedia>

      {/* Display the content (which is either loading animation or all the movie tiles) */}
      {content}
    </>
  );
}