import create from '../../../utils/createReduxPromiseActionType';
const actionTypes = {
  SMS_SEND: create('SMS_SEND'),
  SMS_STOP: create('SMS_STOP'),
};

export default actionTypes;
