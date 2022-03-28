import { createStore, combineReducers } from 'redux';

import configReducer from './config/reducer';
import favouritesReducer from './favourites/reducer';
import genresReducer from './genres/reducer';
import { getFavouriteMovies } from '../helpers/localStorage';

const reducer = combineReducers({
  config: configReducer,
  favourites: favouritesReducer,
  genres: genresReducer,
});

const store = createStore(
  reducer,
  {
    favourites: getFavouriteMovies(),
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
