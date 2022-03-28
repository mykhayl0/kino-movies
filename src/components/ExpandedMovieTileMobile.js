// Control how expanded movie tiles render on mobile.

import './ExpandedMovieTileMobile.styles.scss';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Overlay from './Overlay';
import xIcon from '../assets/x-circle.svg';

export default function ExpandedMovieTileMobile({ open, movie, onClose }) {
  // Access the redux store state for a list of genre ids and their values. 
  const genres = useSelector((state) => state.genres);

  let genreNames;

  // If the movie has a genre inside the movie.genres, then map each genre by their name. 
  if (movie.genres) {
    genreNames = movie.genres.map((genre) => genre.name);
  } else {
    // Otherwise, map the id of the movie genres, and find it inside the genres object.
    genreNames = movie.genre_ids.map(
      (id) => {
        const movieGenre = genres.find((genre) => {
          return genre.id === id;
        });
        
        // Return the name of the movie.Genre 
        return movieGenre.name;
      }
    );
  }

  let overview;

  // Check if the movie overview is greater than zero. 
  if (movie.overview.length > 0) {
    // Take the overview, and split it by empty space. Then only grab the first 30 items, and join them with a space inbetween.
    overview = movie.overview
      .split(' ')
      .splice(0, 30)
      .join(' ');

      // If the length of the newly generated overview is not the same as the original movie overview length, then add ... at the end. 
    if (overview.length !== movie.overview.length) {
      overview += '...';
    }
    // If these is no movie overview, then return a custom message. 
  } else {
    overview = "This movie does not have a synopsis yet."
  }

  // Run the following anytime open is passed inside the function.
  useEffect(() => {
    if(open){
      // Add the class to the body if open.
      document.body.classList.add('no-overflow-expanded');
    }else{
      // Otherwise remove the class from the body if not open.
      document.body.classList.remove('no-overflow-expanded');
    }
  },[open]);

  // Run the following on startup.
  useEffect(() => {
    return () => {
      // Remove the class from the body to prevent overflow when the tile is not in the expanded state.
      document.body.classList.remove('no-overflow-expanded');
    };
  }, []);

  // If the movie expanded tile is not while stll trying to access it, send the user to the not found page.
  if(!open) {
    return null;
  }

  return (
    // Control when the overlay appears using the Overlay component.
    <Overlay className='overlay-expanded'>
      <div className='expanded-div'>
        <div className='expanded-tile'>
          <div className='top-sec'>
            {/* Join each of the genres with a comma. */}
            <p className='genre'>{genreNames.join(', ')}</p>
            {/* When the user clicks on the x-icon, close the expanded tile. */}
            <img className='close-expanded' src={xIcon} alt="Close panel." onClick={onClose}/>
          </div>

            {/* Display some information about the movie such as the release date and rating. */}
          <div className='movie-info-expanded'>
            <p>Released: <span className='yellow-accent'>{movie.release_date}</span></p>
            <p>Rating: <span className='yellow-accent'>{movie.vote_average}/10</span></p>
          </div>

          <h2>Synopsis</h2>
          <p className='synopsis-text'>{overview}</p>

          {/* Allow the user to see more about the movie on the singles page. */}
          <Link to={`/movie/${movie.id}`} className='more-info'>
            More
          </Link>
        </div>

        <h1 className='movie-title-expanded'>{movie.title}</h1>
      </div>
    </Overlay>
  );
}