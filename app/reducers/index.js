import { combineReducers } from 'redux'
import addToken from './addToken.js';
import dashboardDisplay from './dashboardDisplay.js';

const allReducers = combineReducers({
  addToken,
  dashboardDisplay
});

export default allReducers
