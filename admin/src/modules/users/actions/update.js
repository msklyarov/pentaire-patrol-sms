import axios from 'axios';
import ActionTypes from '../constants/actionTypes';
import { pentairePatrolAdminAuth } from '../../../utils/constants';

export default (id, name, password, smsLeft) => ({
  type: ActionTypes.USER_UPDATE.name,
  payload: axios
    .put(
      `/admin-api/users/${id}`,
      { name, password, smsLeft },
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
