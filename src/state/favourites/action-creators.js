import { ADD_FAVOURITE, REMOVE_FAVOURITE } from './actions';

export const addFavourite = function(movieId) {
  return {
    type: ADD_FAVOURITE,
    payload: { movieId },
  }
};

export const removeFavourite = function(movieId) {
  return {
    type: REMOVE_FAVOURITE,
    payload: { movieId },
  }
};
