import uuidv4 from 'uuid/v4';

import { pentairePatrolAdminToken } from './constants';

export default () => {
  let sessionToken = localStorage.getItem(pentairePatrolAdminToken);

  if (!sessionToken) {
    sessionToken = uuidv4();
    localStorage.setItem(pentairePatrolAdminToken, sessionToken);
  }

  return sessionToken;
};
