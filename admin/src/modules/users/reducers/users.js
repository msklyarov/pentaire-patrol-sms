import ActionTypes from '../constants/actionTypes';

export default (state = [], action) => {
  switch (action.type) {
    case ActionTypes.USERS_FETCH.FULFILLED:
    case ActionTypes.USER_ADD.FULFILLED:
    case ActionTypes.USER_UPDATE.FULFILLED:
    case ActionTypes.USER_DELETE.FULFILLED:
      return action.payload;
    case ActionTypes.USERS_CLEAR:
      return [];
    default:
      return state;
  }
};
