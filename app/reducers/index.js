import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'     // store form values in redux.
import { routerReducer } from 'react-router-redux'      // combine router and redux store.

import notification from './notification';
import user from './user';
import pendingCounter from './pendingCounter';
import geoData from './geoData';
import payeeInfo from './payeeInfo';
import onlineTest from './onlineTest';
import timetable from './timetable';
import utility from './utility'
import application from './application'

const allReducers = combineReducers({
  routing: routerReducer,
  form: formReducer,
  pendingCounter,
  user,
  notification,
  geoData,
  payeeInfo,
  onlineTest,
  timetable,
  utility,
  application,
});

export default allReducers
