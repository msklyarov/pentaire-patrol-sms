import axios from 'axios';
import ActionTypes from '../constants/actionTypes';
import { pentairePatrolAuth } from '../../../utils/constants';

export default (username, data) => ({
  type: ActionTypes.SMS_SEND.name,
  payload: axios
    .post(
      '/api/sendSms',
      { username, data },
      {
        headers: {
          Authorization: `Basic ${localStorage.getItem(pentairePatrolAuth)}`,
        },
      },
    )
    .then(response => response.data),
});
