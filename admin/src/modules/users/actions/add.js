import axios from 'axios';
import ActionTypes from '../constants/actionTypes';
import { pentairePatrolAdminAuth } from '../../../utils/constants';

export default (name, password, smsLeft) => ({
  type: ActionTypes.USER_ADD.name,
  payload: axios
    .post(
      '/admin-api/users/add',
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
