import * as notification from './notification';
import * as user from './user';
import * as dataIsReady from './dataIsReady';

export const notificationActions = notification;
export const userActions = user;
export const dataIsReadyActions = dataIsReady;

export default {
  notificationActions,
  userActions,
  dataIsReadyActions,
};
