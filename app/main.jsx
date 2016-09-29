import React from 'react';
import ReactDom from 'react-dom';
import { applyRouterMiddleware, Router, Route, browserHistory } from 'react-router';
import { Provider, connect } from 'react-redux';
import {createStore} from 'redux';
import { useScroll } from 'react-router-scroll';

import reducers from './reducers';
import addToken from './actions/addToken';

import TSignIn from './teacher-components/TSignIn';
import TSignUp from './teacher-components/TSignUp';
import ActivateEmail from './teacher-components/ActivateEmail';
import DisplayUserStatus from './teacher-components/DisplayUserStatus';
// import TInfo from './teacher-components/TInfo';
import THomepage from './teacher-components/THomepage';
import InputNewEmail from './teacher-components/InputNewEmail';
import ForgetPassword from './teacher-components/ForgetPassword';
import TInputNewPassword from './teacher-components/TInputNewPassword';
import VerifyYourEmail from './teacher-components/VerifyYourEmail';
import TAboutSchool from './teacher-components/TAboutSchool';
import TAboutJob from './teacher-components/TAboutJob';
import StepToSignUp from './teacher-components/StepToSignUp';
import ScheduleCourse from './teacher-components/ScheduleCourse';
import OnlineTest from './teacher-components/online-test/OnlineTest';

import App from './containers/App';

import NotFound from './universal/NotFound';

// tap event plugin initialization.
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

let store = createStore(reducers);

// authorization
const userToken = localStorage.getItem("user_token");

var storedToken = store.getState().addToken.token;
if (!!userToken && !storedToken) {
  store.dispatch(addToken("Bearer " + userToken));
}

console.log(store.getState());

const scrollBehavior = (prevRouterProps, { routes }) => {
  return [0,0];
};

const routes = {
  path: "/",
  component: App,
  childRoutes: [
    { path: "sign-up", component: TSignUp },
    { path: "sign-in", component: TSignIn },
    { path: "teacher-homepage",         //    add  router to dashboard components.
      component: THomepage
    },
    { path: "teacher-online-test", component: OnlineTest },
    { path: "active-email", component: ActivateEmail },
    { path: "input-new-email", component: InputNewEmail },
    { path: "forget-password", component: ForgetPassword },
    { path: "reset-password", component: TInputNewPassword },
    { path: "activate-your-account", component: VerifyYourEmail },
    { path: "about-job", component: TAboutJob },
    { path: "about-school", component: TAboutSchool },
    { path: "step-to-sign-up", component: StepToSignUp },
    { path: "display-user-status", component: DisplayUserStatus },
    { path: "*", component: NotFound }
  ]
};

ReactDom.render((
  <Provider store={store}>
    <Router routes={routes} render={applyRouterMiddleware(useScroll(scrollBehavior))}  history={browserHistory}>
      {/* <Route path="/" component={App}>
        <Route path="/sign-up" component={TSignUp}></Route>
        <Route path="/sign-in" component={TSignIn}></Route>
        <Route path="/teacher-homepage" component={THomepage}></Route>
        <Route path="/active-email" name="activeEmail" component={ActivateEmail}></Route>
        <Route path="/input-new-email" component={InputNewEmail}></Route>
        <Route path="/forget-password" component={ForgetPassword}></Route>
        <Route path="/reset-password" component={TInputNewPassword}></Route>
        <Route path="/activate-your-account" component={VerifyYourEmail}></Route>
        <Route path="/about-job" component={TAboutJob}></Route>
        <Route path="/about-school" component={TAboutSchool}></Route>
        <Route path="/step-to-sign-up" component={StepToSignUp}></Route>
        <Route path="/c" component={ScheduleCourse}></Route>
        <Route path="/t" component={DateTab}></Route>
        <Route path="*" component={NotFound}></Route>
      </Route> */}
    </Router>
  </Provider>
), document.getElementById("app"));
