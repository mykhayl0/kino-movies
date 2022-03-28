// SingleMoviePage.js outputs all relevant content for a single movie.

import { fetchAPI } from '../helpers/tmdb';
import { FormattedNumber } from 'react-intl';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { addFavourite, removeFavourite } from '../state/favourites/action-creators';
import { addToLocalStorage, removeFromLocalStorage } from '../helpers/localStorage';

import Spinner from '../components/Spinner';
import TMDBImage from '../components/TMDBImage';
import useTMDBImage from '../hooks/useTMDBImage';

import favouriteButtonNoFill from "../assets/favourite-button-no-fill.svg";
import favouriteButtonFill from "../assets/favourite-button-fill.svg";
import noHeadshot from '../assets/no-headshot.svg';
import noBanner from '../assets/no-banner.svg';

import './SingleMoviePage.styles.scss';

export default function SingleMoviePage() {
  const { id } = useParams(); /* Resolve the browser path name. */
  const [loading, setLoading] = useState(true); /* Know whether the page is in the process of loading content. */
  const [movie, setMovie] = useState(null); /* Know which movie to display on the single page. */
  const backdropUrl = useTMDBImage(movie ? { entity: movie, type: 'backdrop' } : undefined); /* Process the backdrop into a URL using the useTMDBImage hook. */
  const dispatch = useDispatch(); /* Retrieve the redux store */
  const favourites = useSelector((state) => state.favourites);  /* Access the favourites state in the redux store  */
  const isFavourite = favourites.includes(Number(id)); /* Check if the movie is a favourite or not. */

  let favouriteButtonSVG;

  // If the movie isFavourite, then set the favouriteButtonSVG to be filled in, otherwise, it has no color fill.
  if(isFavourite){
    favouriteButtonSVG = favouriteButtonFill;
  }else{
    favouriteButtonSVG = favouriteButtonNoFill;
  }

  let banner;

  // If the backdropUrl does not include "null", then set the banner variable to the TMDB path. Otherwise, display a placeholder background image.
  if(!backdropUrl.includes('original/null')){
    banner = `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${backdropUrl})`
  }else{
    banner = `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${noBanner})`
  }

  // When the favourite button is clicked, either remove the movie id from favourites in local storage + redux store, or add the movie id to local storage + redux store.
  const toggleFavouriteMovie = (event) => {
    if(isFavourite){
      dispatch(removeFavourite(movie.id));
      removeFromLocalStorage(movie.id);
    }else{
      dispatch(addFavourite(movie.id));
      addToLocalStorage(movie.id);
    }
  };

  // Anytime the movie id changes, reload fetchMovie(). 
  useEffect(() => {
    // fetchMovie will make a call to the API, asyncronously.
    const fetchMovie = async () => {
      // While the API is responding, toggle the loading animation.
      setLoading(true);
      // Fetch the movie that useParams has retrieved, store it in a variable.
      const fetchedMovie = await fetchAPI(`movie/${id}`, new URLSearchParams({
        append_to_response: 'credits',
      }));

      // If everything went okey dokey, then pass fetchedMovie into the setMovie function.
      if (fetchedMovie.success !== false) {
        setMovie(fetchedMovie);
      }
      // As the API finishes its call, toggle the loading animation.
      setLoading(false);
    };

    // Run fetchMovie. 
    fetchMovie();
  }, [id]);

  // If loading is true, return the Spinner (loading animation) component.
  if (loading) {
    return <Spinner/>;
  }

  // If the movie does not exist, send the user to the not found page.
  if (movie === null) {
    return null;
  }

  return (
    <>
      <div className='single-header'>
        <h3>Find Out<span className='single-accent-yellow'> More</span></h3>
      </div>
      <div
        className='single-wide-poster-div'
        style={{
          backgroundImage: banner
        }}
      >
        <div className='favourite-single-desktop'>
          <p className='single-movie-title'>{movie.title}</p>
          {/* onClick to call the toggleFavouriteMovie function. */}
          <button className="favourite-button-single" onClick={toggleFavouriteMovie}>
            {/* If isFavourite, add the is-favourite class, otherwise do nothing. */}
              <img className={isFavourite ? 'is-favourite' : undefined} src={favouriteButtonSVG} alt="Favourite button"/>
          </button>
        </div>

        <div className='single-movie-content-wrapper'>
          <div className='single-movie-genres'>
            {/* Loop through movie.genres using map(), return all the genre names. */}
            {movie.genres.map((genre) => {
              return <div key={genre.id} className='single-genre'>{genre.name}</div>;
            })}
          </div>

          <p className='single-release-date-wrapper'>
            <span className='single-red-accent'>Release Date</span>
            {/* Output the movie release date */}
            <span className='single-release-date'>{movie.release_date}</span>
          </p>
        </div>
      </div>

      <div className='single-body-info'>
        <div className='single-cast-members'>
          <h3>Top Stars</h3>
          {/* For every person in movie.credits.cast, loop through the first three using map(), and designate them as a person param. */}
          {movie.credits.cast.slice(0, 3).map((person) => {
            return (
              <div key={person.id} className='cast-div'>
                <span className='single-cast-name'>{person.name}</span>
                {/* If the person.profile_path is not null, output their headshot. Otherwise, output a placeholder image. */}
                {person.profile_path !== null ? <TMDBImage className='single-cast-image' type="profile" entity={person}/> : <img className='single-cast-image 'src={noHeadshot}/>}
              </div>
            );
          })}
        </div>

        <div className='single-info-wrapper'>
          <div className='single-tagline'>
            <h2>{movie.tagline.length > 0 ? movie.tagline : "No tagline available."}</h2>
          </div>
          <div className='single-plot'>
            <h3>Movie Plot</h3>
            {/* Conditional statement, if the movie overview is longer than 0, output the overview. Otherwise tell the user there's no plot available. */}
            <p className='single-plot-container'>{movie.overview.length > 0 ? movie.overview : "No plot available. Come back closer to the release date."}</p>
            </div>

            <div className='single-stats'>
              {/* Output the movie rating */}
            <p className='single-rating'>IMDB Rating {movie.vote_average}/10</p>
            <p className='single-budget'>
              {/* Utilizing the React Intl components, FormattedNumber takes in the movie.budget and makes it pretty. Ie. 2000000 -> $2MIL */}
              Budget {' '}
              <FormattedNumber
                // eslint-disable-next-line react/style-prop-object
                style="currency"
                currency="USD"
                currencyDisplay="narrowSymbol"
                notation="compact"
                
                value={movie.budget}
              />
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
