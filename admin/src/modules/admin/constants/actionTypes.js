import create from '../../../utils/createReduxPromiseActionType';
const actionTypes = {
  FETCH_LOGIN_STATUS: create('FETCH_LOGIN_STATUS'),
  LOGON: create('LOGON'),
  LOGOUT: 'LOGOUT',
};

export default actionTypes;
