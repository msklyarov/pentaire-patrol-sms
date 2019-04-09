import axios from 'axios';
import ActionTypes from '../constants/actionTypes';
import { pentairePatrolAuth } from '../../../utils/constants';

export default () => ({
  type: ActionTypes.STATUS_FETCH.name,
  payload: axios
    .post(
      '/api/getStatus',
      {},
      {
        headers: {
          Authorization: `Basic ${localStorage.getItem(pentairePatrolAuth)}`,
        },
      },
    )
    .then(response => response.data),
});
