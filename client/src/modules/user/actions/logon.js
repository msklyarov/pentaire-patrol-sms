import axios from 'axios';
import ActionTypes from '../constants/actionTypes';

export default (username, password) => {
  console.log('Authorization', `Basic ${btoa(username + ':' + password)}`)

  return ({
  type: ActionTypes.LOGON.name,
  payload: axios
    .post('/api/login', {}, {
      headers: { Authorization: `Basic YWRtaW46YWRtaW4=` }
    })
    .then(response => response.data),
})};
