import InputNewEmail from '../containers/inputNewEmail';
import ForgetPassword from '../containers/forgetPassword';
import VerifyYourEmail from '../containers/verifyYourEmail';
import AboutSchool from '../components/AboutSchool';
import AboutJob from '../components/AboutJob';
import Index from '../components/Index';
import App from '../containers/app';
import OnlineTest from '../containers/onlineTest';
import SignIn from '../containers/signIn';
import SignUp from '../containers/signUp';
import ActivateEmail from '../containers/activateEmail';
import InputNewPassword from '../containers/inputNewPassword';
import NotFound from '../components/universal/NotFound';

import { default as applicationRouters } from './application-steps'
import { default as homepageRouters } from './teacher-homepage'

export default {
  path: '/',
  component: App,
  indexRoute: { component: Index },
  childRoutes: [
    { path: 'about-job', component: AboutJob },
    { path: 'about-school', component: AboutSchool },
    { path: 'sign-up', component: SignUp },
    { path: 'sign-in', component: SignIn },
    { path: 'active-email', component: ActivateEmail },
    { path: 'input-new-email', component: InputNewEmail },
    { path: 'forget-password', component: ForgetPassword },
    { path: 'reset-password', component: InputNewPassword },
    { path: 'activate-your-account', component: VerifyYourEmail },
    applicationRouters,
    { path: 'teacher-online-test', component: OnlineTest },
    homepageRouters,
    { path: '*', component: NotFound },
  ],
};
