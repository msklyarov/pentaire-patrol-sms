import axios from 'axios';
import ActionTypes from '../constants/actionTypes';
import { pentairePatrolAdminAuth } from '../../../utils/constants';

export default id => ({
  type: ActionTypes.USER_DELETE.name,
  payload: axios
    .delete(`/admin-api/users/${id}`, {
      headers: {
        Authorization: `Basic ${localStorage.getItem(pentairePatrolAdminAuth)}`,
      },
    })
    .then(response => response.data),
});
