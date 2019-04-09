import axios from 'axios';
import ActionTypes from '../constants/actionTypes';
import { pentairePatrolAuth } from '../../../utils/constants';

export default data => ({
  type: ActionTypes.SMS_SEND.name,
  payload: axios
    .post('/api/sendSms', data, {
      headers: {
        Authorization: `Basic ${localStorage.getItem(pentairePatrolAuth)}`,
      },
    })
    .then(response => response.data),
});
