import { createStore, applyMiddleware } from 'redux'
import { apiMiddleware } from 'redux-api-middleware'

import allReducers from '../reducers'

const createStoreWithMiddleware = applyMiddleware(apiMiddleware)(createStore)

export const store = createStoreWithMiddleware(allReducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
