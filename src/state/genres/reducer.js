import { SET_GENRES } from './actions';

export default function genresReducer(genres = [], action) {
  switch (action.type) {
    case SET_GENRES:
      return action.payload;

    default:
      return genres;
  }
}