import axios from 'axios';
import ActionTypes from '../constants/actionTypes';
import { pentairePatrolAdminAuth } from '../../../utils/constants';
import getSessionToken from '../../../utils/getSessionToken';

export default (username, password) => {
  const sessionToken = getSessionToken();

  return {
    type: ActionTypes.LOGON.name,
    payload: axios
      .post('/admin-auth/login', { username, password, sessionToken })
      .then(response => {
        if (response.data.loggedIn) {
          localStorage.setItem(
            pentairePatrolAdminAuth,
            btoa(`${username}:${password}`),
          );
          return { ...response.data, username };
        }

        localStorage.removeItem(pentairePatrolAdminAuth);
        return response.data;
      }),
  };
};
