import { combineReducers } from 'redux'
import notification from './notification';
import user from './user';
import pendingCounter from './pendingCounter';
import dashboardDisplay from './dashboardDisplay';

const allReducers = combineReducers({
  pendingCounter,
  user,
  notification,
  dashboardDisplay
});

export default allReducers
