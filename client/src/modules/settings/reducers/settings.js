import ActionTypes from '../constants/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.SETTINGS_FETCH.FULFILLED:
      return action.payload;
    case ActionTypes.SETTINGS_CLEAR:
      return {};
    default:
      return state;
  }
};
