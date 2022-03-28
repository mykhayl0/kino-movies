import { SET_CONFIG } from './actions';

export default function configReducer(config = {}, action) {
  switch (action.type) {
    case SET_CONFIG:
      return action.payload;

    default:
      return config;
  }
}
