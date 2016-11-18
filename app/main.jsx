import React from 'react';
import ReactDom from 'react-dom';
import { applyRouterMiddleware, Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { useScroll } from 'react-router-scroll';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { syncHistoryWithStore } from 'react-router-redux'
import { userActions } from './actions';

import { store } from './config';
import { default as router } from './routes'

const realStore = store.default
const token = localStorage.getItem('user_token')
if (token) {
  realStore.dispatch(userActions.signInSession(token))
}

// tap event plugin initialization.
injectTapEventPlugin();         // todo: 急需做 Authorization.
const scrollBehavior = () => [0, 0]

const history = syncHistoryWithStore(browserHistory, realStore)

ReactDom.render((
  <Provider store={realStore}>
    <Router
      routes={router}
      render={applyRouterMiddleware(useScroll(scrollBehavior))}
      history={history}
    />
  </Provider>
), document.getElementById('app'));
