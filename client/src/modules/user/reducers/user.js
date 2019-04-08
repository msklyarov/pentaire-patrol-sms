import ActionTypes from '../constants/actionTypes';

export default (state = { loggedIn: false }, action) => {
  switch (action.type) {
    case ActionTypes.LOGON.FULFILLED:
      return { loggedIn: true };
    case ActionTypes.LOGON.REJECTED:
    case ActionTypes.LOGOUT:
      return { loggedIn: false };
    default:
      return state;
  }
};
