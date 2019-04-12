import axios from 'axios';
import ActionTypes from '../constants/actionTypes';
// import { pentairePatrolAuth } from '../../../utils/constants';

export default id => ({
  type: ActionTypes.USER_DELETE.name,
  payload: axios
    .delete(
      `/admin-api/users/${id}`,
      {},
      // {
      //   headers: {
      //     Authorization: `Basic ${localStorage.getItem(pentairePatrolAuth)}`,
      //   },
      // },
    )
    .then(response => response.data),
});
