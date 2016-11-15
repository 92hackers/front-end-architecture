import React from 'react';
import ReactDom from 'react-dom';
import { applyRouterMiddleware, Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { useScroll } from 'react-router-scroll';
import { userActions } from './actions';

// import TInfo from './teacher-components/TInfo';
import InputNewEmail from './containers/InputNewEmail';
import ForgetPassword from './containers/ForgetPassword';
import VerifyYourEmail from './containers/VerifyYourEmail';
import TAboutSchool from './components/AboutSchool';
import TAboutJob from './components/AboutJob';
import StepToSignUp from './containers/application-steps/StepToSignUp';
import  from './teacher-components/ScheduleCourse';
import TIndex from './teacher-components/TIndex';

import App from './containers/App';
import OnlineTest from './containers/OnlineTest';
import SignIn from './containers/SignIn';
import THomepage from './containers/TeacherHomepage';
import TSignUp from './containers/TSignUp';
import ActivateEmail from './containers/ActivateEmail';
import TInputNewPassword from './containers/TInputNewPassword';
import EditProfile from './containers/editProfile';
import PayeeInfo from './containers/payeeInfo';

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
  indexRoute: { component: TIndex },
  childRoutes: [
    { path: "sign-up", component: TSignUp },
    { path: "sign-in", component: SignIn },
    { path: "teacher-homepage",         //    add  router to dashboard components.
      component: THomepage
      childRoutes: [
        {
          path: 'timetables',
          component: Timetables,
        },
        {
          path: 'weekly-template',
          component: WeeklyTemplate,
        },
        {
          path: 'settings',
          component: Settings,
        },
      ]
    },
    { path: "complete-payee-info", component: PayeeInfo },
    { path: "edit-profile", component: EditProfile },
    { path: "teacher-online-test", component: OnlineTest },
    { path: "active-email", component: ActivateEmail },
    { path: "input-new-email", component: InputNewEmail },
    { path: "forget-password", component: ForgetPassword },
    { path: "reset-password", component: TInputNewPassword },
    { path: "activate-your-account", component: VerifyYourEmail },
    { path: "about-job", component: TAboutJob },
    { path: "about-school", component: TAboutSchool },
    { path: "step-to-sign-up",
     component: StepToSignUp },
    { path: "*", component: NotFound }
  ]
};

ReactDom.render((
  <Provider store={store.store}>
    <Router
      routes={routes}
      render={applyRouterMiddleware(useScroll(scrollBehavior))}
      history={browserHistory}
    />
  </Provider>
), document.getElementById("app"));
