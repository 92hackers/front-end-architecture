import React from 'react';
import ReactDom from 'react-dom';
import { applyRouterMiddleware, Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { useScroll } from 'react-router-scroll';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { userActions } from './actions';

import { store } from './config';
import { default as router } from './routes'

const token = localStorage.getItem('user_token')
if (token) {
  store.default.dispatch(userActions.signInSession(token))
}

// tap event plugin initialization.
injectTapEventPlugin();         // todo: 急需做 Authorization.
const scrollBehavior = () => [0, 0]

ReactDom.render((
  <Provider store={store.default}>
    <Router
      routes={router}
      render={applyRouterMiddleware(useScroll(scrollBehavior))}
      history={browserHistory}
    />
  </Provider>
), document.getElementById('app'));
