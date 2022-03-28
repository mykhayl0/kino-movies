import { SET_GENRES } from './actions';

export const setGenres = (genres) => {
  return {
    type: SET_GENRES,
    payload: genres,
  };
};
