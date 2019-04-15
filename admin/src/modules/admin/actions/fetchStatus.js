import axios from 'axios';
import ActionTypes from '../constants/actionTypes';
import getSessionToken from '../../../utils/getSessionToken';

export default () => {
  const sessionToken = getSessionToken();

  return {
    type: ActionTypes.FETCH_LOGIN_STATUS.name,
    payload: axios
      .post('/admin-auth/getLoginStatus', { sessionToken })
      .then(response => response.data),
  };
};
