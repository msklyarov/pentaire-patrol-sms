import axios from 'axios';
import ActionTypes from '../constants/actionTypes';
import { pentairePatrolAuth } from '../../../utils/constants';

export default (username, password) => {
  return {
    type: ActionTypes.LOGON.name,
    payload: axios.post('/api/login', { username, password }).then(response => {
      if (response.data.loggedIn) {
        localStorage.setItem(
          pentairePatrolAuth,
          btoa(`${username}:${password}`),
        );
      } else {
        localStorage.removeItem(pentairePatrolAuth);
      }

      return response.data;
    }),
  };
};
