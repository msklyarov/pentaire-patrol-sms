import ActionTypes from '../constants/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.SMS_SEND.FULFILLED:
      return action.payload;
    case ActionTypes.SMS_STOP.FULFILLED:
      return {};
    default:
      return state;
  }
};
