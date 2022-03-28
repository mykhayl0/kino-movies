// MovieTile controls the display of each movie.

import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { addToLocalStorage, removeFromLocalStorage } from '../helpers/localStorage';
import { addFavourite, removeFavourite } from '../state/favourites/action-creators';

import favouriteButtonNoFill from "../assets/favourite-button-no-fill.svg";
import favouriteButtonFill from "../assets/favourite-button-fill.svg";
import noPoster from '../assets/no-poster.svg';
import ExpandedMovieTileMobile from './ExpandedMovieTileMobile';
import ExpandedMovieTileDesktop from './ExpandedMovieTileDesktop';
import TMDBImage from './TMDBImage';
import classNames from 'classnames';

import MatchMedia from '../components/MatchMedia';

import './MovieTile.styles.scss';
import useTMDBImage from '../hooks/useTMDBImage';

export default function MovieTile({ movie, ...props }){
  // Access the redux dispatch function.
  const dispatch = useDispatch();
  // Access the redux store state favourites. 
  const favourites = useSelector((state) => state.favourites);
  // If favourites contains the movie.id, then it's a favourite.
  const isFavourite = favourites.includes(movie.id);
  // Generate the poster path URL.
  const posterURL = useTMDBImage({ type: 'poster', entity:movie});

  let favouriteButtonSVG;

  // If the movie isFavourite, then display the filled in favourite button.
  if(isFavourite){
    favouriteButtonSVG = favouriteButtonFill;
    // Otherwise display the no fill favourite button.
  }else{
    favouriteButtonSVG = favouriteButtonNoFill;
  }

  // Control whether the movie is a favourite or isnt based on the user actions.
  const toggleFavouriteMovie = (event) => {
    // Prevent the user click of the favourite button from also affecting other clickable elements in the same environment.
    event.stopPropagation();
    // If it's a favourite, then remove it from redux store + local storage when the user clicks on an already favourited button.
    if(isFavourite){
      dispatch(removeFavourite(movie.id));
      removeFromLocalStorage(movie.id);
      // Otherwise, add the movie to favourites in local storage + redux store when the user clicks on an empty favourite button.
    }else{
      dispatch(addFavourite(movie.id));
      addToLocalStorage(movie.id);
    }
  };

  // Control the state of the tile, whether it's expanded or not.
  const [expandedTile, setExpandedTile] = useState(false);

  // Open the expanded tile.
  const expandedTileHandler = () => {
    setExpandedTile(true);
  };

  // Close the expanded tile.
  const closeExpandedTileHandler = () => {
    setExpandedTile(false);
  };

  return (
    <>
    {/* Use the MatchMedia conponent to control when the ExpandedMovieTileMobile is rendered. */}
      <MatchMedia mediaQuery="(max-width: 899px)">
        <ExpandedMovieTileMobile open={expandedTile} movie={movie} onClose={closeExpandedTileHandler}/>
      </MatchMedia>

      {/* Use the MatchMedia component to control when the ExpandedMovieTileDesktop is rendered. */}
      <MatchMedia mediaQuery="(min-width: 900px)">
        <ExpandedMovieTileDesktop open={expandedTile} movie={movie} onClose={closeExpandedTileHandler}/>
      </MatchMedia>

      {/* When the movie tile is clicked, then call the expandedTileHandler() */}
      <div className={classNames('movie-tile', props.className)} onClick={expandedTileHandler}>
        <div className="poster-rating-div">
          {/* Generate the movie rating if it's above zero, otherwise show a no rating message. */}
          <span className="rating-span">{movie.vote_average > 0 ? movie.vote_average : "No Rating"}</span>
          {/* When the favourite button is clicked, then call the toggleFavouriteMovie() */}
          <button className="favourite-button" onClick={toggleFavouriteMovie}>
            {/* If isFavourite, then add a className of is-favourite, otherwise do nothing. */}
            <img className={isFavourite ? 'is-favourite' : undefined} src={favouriteButtonSVG} alt="Favourite button"/>
          </button>

          {/* Generate the poster of the movie using the TMDBImage component. */}
          {!posterURL.includes('/original/null') ? <TMDBImage className="poster" type="poster" entity={movie}/> : <img src={noPoster} />}
        </div>
        <div>
          {/* Generate the movie title. */}
          <h3 className="movie-title">{movie.title}</h3>
        </div>
      </div>
    </>
  );
}