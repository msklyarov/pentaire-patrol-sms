import axios from 'axios';
import ActionTypes from '../constants/actionTypes';
import { pentairePatrolAdminAuth } from '../../../utils/constants';

export default () => ({
  type: ActionTypes.USERS_FETCH.name,
  payload: axios
    .post(
      '/admin-api/users',
      {},
      {
        headers: {
          Authorization: `Basic ${localStorage.getItem(
            pentairePatrolAdminAuth,
          )}`,
        },
      },
    )
    .then(response => response.data),
});
