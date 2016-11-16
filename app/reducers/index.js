import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import notification from './notification';
import user from './user';
import pendingCounter from './pendingCounter';
import geoResources from './geoResources';
import payeeInfo from './payeeInfo';
import onlineTest from './onlineTest';
import timetable from './timetable';
import utility from './utility'
import application from './application'

const allReducers = combineReducers({
  pendingCounter,
  user,
  notification,
  form: formReducer,
  geoResources,
  payeeInfo,
  onlineTest,
  timetable,
  utility,
  application,
});

export default allReducers
