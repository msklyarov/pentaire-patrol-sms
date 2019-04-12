import create from '../../../utils/createReduxPromiseActionType';
const actionTypes = {
  USERS_FETCH: create('USERS_FETCH'),
  USERS_CLEAR: 'USERS_CLEAR',
  USER_ADD: create('USER_ADD'),
  USER_UPDATE: create('USER_UPDATE'),
  USER_DELETE: create('USER_DELETE'),
};

export default actionTypes;
