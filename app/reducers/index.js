import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import notification from './notification';
import user from './user';
import pendingCounter from './pendingCounter';
import dashboardDisplay from './dashboardDisplay';
import geoResources from './geoResources';
import payeeInfo from './payeeInfo';

const allReducers = combineReducers({
  pendingCounter,
  user,
  notification,
  dashboardDisplay,
  form: formReducer,
  geoResources,
  payeeInfo,
});

export default allReducers
