import axios from 'axios';
import ActionTypes from '../constants/actionTypes';
import { pentairePatrolAuth } from '../../../utils/constants';

export default username => ({
  type: ActionTypes.SETTINGS_FETCH.name,
  payload: axios
    .post(
      '/api/getUserSettings',
      { username },
      {
        headers: {
          Authorization: `Basic ${localStorage.getItem(pentairePatrolAuth)}`,
        },
      },
    )
    .then(response => response.data),
});
