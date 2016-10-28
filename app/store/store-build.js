import { createStore, applyMiddleware } from 'redux'
import { apiMiddleware } from 'redux-api-middleware'

import allReducers from '../reducers'

const createStoreWithMiddleware = applyMiddleware(apiMiddleware)(createStore)

const store = createStoreWithMiddleware(allReducers)

export default store
