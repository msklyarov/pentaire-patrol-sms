import axios from 'axios';
import ActionTypes from '../constants/actionTypes';

export default () => ({
  type: ActionTypes.SMS_STOP.name,
  payload: axios.get('/api/stopSms').then(response => response.data),
});
