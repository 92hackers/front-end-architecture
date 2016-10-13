import * as notification from './notification';
import * as user from './user';
import * as pendingCounter from './pendingCounter';
import * as dashboardDisplay from './dashboardDisplay';

export const notificationActions = notification;
export const userActions = user;
export const pendingCounterActions = pendingCounter;
export const dashboardActions = dashboardDisplay;

export {
  notificationActions,
  userActions,
  pendingCounterActions,
  dashboardActions
};
