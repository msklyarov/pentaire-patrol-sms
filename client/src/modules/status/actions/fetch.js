import axios from 'axios';
import ActionTypes from '../constants/actionTypes';

export default () => ({
  type: ActionTypes.STATUS_FETCH.name,
  payload: axios.get('/api/getStatus').then(response => response.data),
});
