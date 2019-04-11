import axios from 'axios';
import ActionTypes from '../constants/actionTypes';
import { pentairePatrolAuth } from '../../../utils/constants';
import getSessionToken from '../../../utils/getSessionToken';

export default (username, password) => {
  const sessionToken = getSessionToken();

  return {
    type: ActionTypes.LOGON.name,
    payload: axios
      .post('/api/login', { username, password, sessionToken })
      .then(response => {
        if (response.data.loggedIn) {
          localStorage.setItem(
            pentairePatrolAuth,
            btoa(`${username}:${password}`),
          );
          return { ...response.data, username };
        }

        localStorage.removeItem(pentairePatrolAuth);
        return response.data;
      }),
  };
};
