import React from 'react';
import ReactDom from 'react-dom';
import { applyRouterMiddleware, Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { useScroll } from 'react-router-scroll';
// tap event plugin initialization.
import injectTapEventPlugin from 'react-tap-event-plugin';
import { userActions } from './actions';

// import TInfo from './teacher-components/TInfo';
import InputNewEmail from './containers/InputNewEmail';
import ForgetPassword from './containers/ForgetPassword';
import VerifyYourEmail from './containers/VerifyYourEmail';
import TAboutSchool from './components/AboutSchool';
import TAboutJob from './components/AboutJob';
import StepToSignUp from './components/application-steps/StepToSignUp';
// import  from './teacher-components/ScheduleCourse';
import Index from './components/Index';
import Timetables from './components/homepage/Timetables'

import App from './containers/App';
import OnlineTest from './containers/OnlineTest';
import SignIn from './containers/SignIn';
import Homepage from './components/homepage/Homepage';
import SignUp from './containers/SignUp';
import ActivateEmail from './containers/ActivateEmail';
import InputNewPassword from './containers/InputNewPassword';
import EditProfile from './containers/editProfile';
import PayeeInfo from './containers/payeeInfo';
import WeeklyTemplate from './containers/homepage/weeklyTemplate'
import Settings from './containers/homepage/settings'
import BasicInfo from './containers/application-steps/basicInfo'
import ScheduleInterview from './containers/application-steps/scheduleInterview'
import TeachingExperience from './components/application-steps/TeachingExperience'

import NotFound from './components/universal/NotFound';
import { store } from './config';

const token = localStorage.getItem('user_token')
if (token) {
  store.default.dispatch(userActions.signInSession(token))
}

injectTapEventPlugin();         // todo: 急需做 Authorization.

const scrollBehavior = () => [0, 0]

const routes = {
  path: '/',
  component: App,
  indexRoute: { component: Index },
  childRoutes: [
    { path: 'sign-up', component: SignUp },
    { path: 'sign-in', component: SignIn },
    { path: 'step-to-sign-up',
      component: StepToSignUp,
      childRoutes: [
        {
          path: 'basic-information',
          component: BasicInfo,
        },
        {
          path: 'teaching-experience',
          component: TeachingExperience,
        },
        {
          path: 'schedule-interview',
          component: ScheduleInterview,
        },
      ],
    },
    { path: 'teacher-homepage',         //    add  router to dashboard components.
      component: Homepage,
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
      ],
    },
    { path: 'complete-payee-info', component: PayeeInfo },
    { path: 'edit-profile', component: EditProfile },
    { path: 'teacher-online-test', component: OnlineTest },
    { path: 'active-email', component: ActivateEmail },
    { path: 'input-new-email', component: InputNewEmail },
    { path: 'forget-password', component: ForgetPassword },
    { path: 'reset-password', component: InputNewPassword },
    { path: 'activate-your-account', component: VerifyYourEmail },
    { path: 'about-job', component: TAboutJob },
    { path: 'about-school', component: TAboutSchool },
    { path: '*', component: NotFound },
  ],
};

ReactDom.render((
  <Provider store={store.default}>
    <Router
      routes={routes}
      render={applyRouterMiddleware(useScroll(scrollBehavior))}
      history={browserHistory}
    />
  </Provider>
), document.getElementById('app'));
