import { SET_CONFIG } from './actions';

export const setConfig = function(payload) {
  return {
    type: SET_CONFIG,
    payload,
  };
};
