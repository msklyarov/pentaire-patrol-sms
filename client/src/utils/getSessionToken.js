import uuidv4 from 'uuid/v4';

import { pentairePatrolToken } from './constants';

export default () => {
  let sessionToken = localStorage.getItem(pentairePatrolToken);

  if (!sessionToken) {
    sessionToken = uuidv4();
    localStorage.setItem(pentairePatrolToken, sessionToken);
  }

  return sessionToken;
};
