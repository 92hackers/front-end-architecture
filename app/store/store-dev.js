import { createStore, applyMiddleware } from 'redux'
import { apiMiddleware } from 'redux-api-middleware'

import allReducers from '../reducers'

const createStoreWithMiddleware = applyMiddleware(apiMiddleware)(createStore)

/* eslint no-underscore-dangle: 0 */
const store = createStoreWithMiddleware(allReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default store
