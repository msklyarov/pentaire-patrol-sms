import axios from 'axios';
import ActionTypes from '../constants/actionTypes';

export default (data) => ({
  type: ActionTypes.SMS_SEND.name,
  payload: axios
    .post('/api/sendSms', data)
    .then(response => response.data),
});
