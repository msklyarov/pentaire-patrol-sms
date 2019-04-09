import axios from 'axios';
import ActionTypes from '../constants/actionTypes';
import { pentairePatrolAuth } from '../../../utils/constants';

export default () => ({
  type: ActionTypes.SMS_STOP.name,
  payload: axios
    .post(
      '/api/stopSms',
      {},
      {
        headers: {
          Authorization: `Basic ${localStorage.getItem(pentairePatrolAuth)}`,
        },
      },
    )
    .then(response => response.data),
});
