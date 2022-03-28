// Control the expanded movie tile on desktop devices. 

import './ExpandedMovieTileDesktop.styles.scss';
import { addFavourite, removeFavourite } from '../state/favourites/action-creators';
import { addToLocalStorage, removeFromLocalStorage } from '../helpers/localStorage';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useTMDBImage from '../hooks/useTMDBImage';

import favouriteButtonFill from "../assets/favourite-button-fill.svg";
import favouriteButtonNoFill from "../assets/favourite-button-no-fill.svg";
import Overlay from './Overlay';
import TMDBImage from './TMDBImage';
import xIcon from '../assets/x-circle.svg';
import noPoster from '../assets/no-poster.svg';

export default function ExpandedMovieTileDesktop({ open, movie, onClose }) {
  // Access the redux store state for a list of genre ids and their values. 
  const genres = useSelector((state) => state.genres);

  // Call the redux store hook.
  const dispatch = useDispatch();
  // Read the state of favourites inside the redux store. 
  const favourites = useSelector((state) => state.favourites);
  // Check if the favourites is a favourite by checking includes. 
  const isFavourite = favourites.includes(movie.id);
  // Get the URL of the poster. 
  const posterURL = useTMDBImage({ type: 'poster', entity:movie});

  let favouriteButtonSVG;

  // If the movie isFavourite, then set the svg fill to fill, otherwise set the svg fill to no fill.
  if(isFavourite){
    favouriteButtonSVG = favouriteButtonFill;
  }else{
    favouriteButtonSVG = favouriteButtonNoFill;
  }

  // Control when the user clicks on the favourite button.
  const toggleFavouriteMovie = (event) => {
    // Prevent the click from propogating inside its environment when the user clicks the favourite button.
    event.stopPropagation();

    // If the movie isFavourite and the user clicks the favourite button. the remove it from redux store and local storage.
    if(isFavourite){
      dispatch(removeFavourite(movie.id));
      removeFromLocalStorage(movie.id);
    }else{
      // Otherwise, add it to local storage and redux store if the user wants to favourite a movie.
      dispatch(addFavourite(movie.id));
      addToLocalStorage(movie.id);
    }
  };
  
  let genreNames;

  // Check if the movie.genres is set.
  if (movie.genres) {
    // If it's set, then map through the config/genres list, and grab the name of the genre. 
    genreNames = movie.genres.map((genre) => genre.name);
  } else {
    // Otherwise, map the genre ids from the movie. 
    genreNames = movie.genre_ids.map(
      // For every id, match it with the id inside the config/genres list.
      (id) => {
        const movieGenre = genres.find((genre) => {
          return genre.id === id;
        });
        
        // Return a genre with its name.
        return movieGenre.name;
      }
    );
  }

  let overview;

  // Check if the movie overview is greater than zero length.
  if (movie.overview.length > 0) {
    // If so, split the overview by space, only select the first 30 words, and join the new list with spaces. 
    overview = movie.overview
      .split(' ')
      .splice(0, 30)
      .join(' ');
    // If the new overview length does not equal the original overview length, join the list with ... at the end. 
    if (overview.length !== movie.overview.length) {
      overview += '...';
    }
    // Otherwise, if the length of the overview is 0, then advise there's no synopsis yet. 
  } else {
    overview = "This movie does not have a synopsis yet."
  }

  // Run useEffect when open is passed.
  useEffect(() => {
    // If prop open is passed, then add a class to the body of no overflow.
    if(open){
      document.body.classList.add('no-overflow-expanded-desktop');
    }else{
      // Otherwise remove the class from the body of no overflow.
      document.body.classList.remove('no-overflow-expanded-desktop');
    }
  },[open]);

  // Run when page initializes. 
  useEffect(() => {
    return () => {
      // Remove the class of no overflow from the body. Prevents any overflow on first load. 
      document.body.classList.remove('no-overflow-expanded-desktop');
    };
  }, []);

  // If the param is not open, then don't do anything.
  if(!open) {
    return null;
  }

  // Overlay component controls whether the overlay is working or not. 
  return (
    <Overlay className='overlay-expanded-desktop'>
      <div className='expanded-tile-desktop'>
        <img className='close-expanded-desktop' src={xIcon} alt="Close panel." onClick={onClose}/>
        <div className='inner-content'>
          <div className='poster-favourite'>
            {/* If the posterURL contains "null", then the image does not exist. Replace it with a placeholder image. */}
            {!posterURL.includes('original/null') ? <TMDBImage className="expanded-poster" type="poster" entity={movie}/> : <img src={noPoster}/> }
            <button className="expanded-favourite-button-desktop" onClick={toggleFavouriteMovie}>
              <img className={isFavourite ? 'is-favourite' : undefined} src={favouriteButtonSVG} alt="Favourite button"/>
            </button>
          </div>

          <div className='expanded-content-wrapper'>

            <div className='expanded-movie-info'>
              <h1 className='expanded-movie-title-desktop'>{movie.title}</h1>

              <div className='expanded-genre-list'>
                {/* Join the genre list with a comma */}
                <p className='genre'>{genreNames.join(', ')}</p>
                <p className='released'>Released: <span className='desktop-yellow-accent'>{movie.release_date}</span></p>
              </div>

              <div className='expanded-synopsis'>
                <h2>Synopsis</h2>
                <p className='synopsis-text'>{overview}</p>
              </div>

              <div className='expanded-pills'>
                <p className='expanded-rating'>IMDB <span className='desktop-yellow-accent'>{movie.vote_average}/10</span></p>

                {/* Send the user to the singles page for more movie info. */}
                <Link to={`/movie/${movie.id}`} className='more-info-desktop'>
                  Find Out More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Overlay>
  );
}