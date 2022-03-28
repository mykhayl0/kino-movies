import { ADD_FAVOURITE, REMOVE_FAVOURITE } from './actions';

export default function favouritesReducer(favourites = [], action) {
  switch (action.type) {
    case ADD_FAVOURITE: {
      const favouritesCopy = [...favourites];
      favouritesCopy.push(action.payload.movieId);
    return favouritesCopy;
    }

    case REMOVE_FAVOURITE: {
      const favouritesCopy = [...favourites];
      const indexOfMovie = favouritesCopy.indexOf(action.payload.movieId);
      favouritesCopy.splice(indexOfMovie, 1);
      return favouritesCopy; 
    }

    default:
      return favourites;
  }
}
