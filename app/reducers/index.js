import { combineReducers } from 'redux'
import notification from './notification';
import user from './user';
import dataIsReady from './dataIsReady';
import dashboardDisplay from './dashboardDisplay.js';

const allReducers = combineReducers({
  dataIsReady,
  user,
  notification,
  dashboardDisplay
});

export default allReducers
