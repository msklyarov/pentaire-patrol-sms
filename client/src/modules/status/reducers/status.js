import ActionTypes from '../constants/actionTypes';

export default (state = [], action) => {
  switch (action.type) {
    case ActionTypes.STATUS_FETCH.FULFILLED:
      return action.payload;
    case ActionTypes.STATUS_CLEAR:
      return [];
    default:
      return state;
  }
};
