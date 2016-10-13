import React from 'react';
import ReactDom from 'react-dom';
import { applyRouterMiddleware, Router, Route, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { useScroll } from 'react-router-scroll';
import { userActions } from './actions';

// import TInfo from './teacher-components/TInfo';
import InputNewEmail from './containers/InputNewEmail';
import ForgetPassword from './containers/ForgetPassword';
import VerifyYourEmail from './containers/VerifyYourEmail';
import TAboutSchool from './teacher-components/TAboutSchool';
import TAboutJob from './teacher-components/TAboutJob';
import StepToSignUp from './containers/StepToSignUp';
import ScheduleCourse from './teacher-components/ScheduleCourse';

import App from './containers/App';
import OnlineTest from './containers/OnlineTest';
import SignIn from './containers/SignIn';
import THomepage from './containers/TeacherHomepage';
import TSignUp from './containers/TSignUp';
import ActivateEmail from './containers/ActivateEmail';
import TInputNewPassword from './containers/TInputNewPassword';

import NotFound from './universal/NotFound';
import {store} from './config';

// tap event plugin initialization.
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const token = localStorage.getItem("user_token") || "";
if (!!token) {
  store.store.dispatch(userActions.signIn(token));
}

const scrollBehavior = (prevRouterProps, { routes }) => {
  return [0,0];
};

const routes = {
  path: "/",
  component: App,
  childRoutes: [
    { path: "sign-up", component: TSignUp },
    { path: "sign-in", component: SignIn },
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
    { path: "*", component: NotFound }
  ]
};

ReactDom.render((
  <Provider store={store.store}>
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
