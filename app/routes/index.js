import InputNewEmail from '../containers/InputNewEmail';
import ForgetPassword from '../containers/ForgetPassword';
import VerifyYourEmail from '../containers/VerifyYourEmail';
import AboutSchool from '../components/AboutSchool';
import AboutJob from '../components/AboutJob';
import Index from '../components/Index';
import App from '../containers/App';
import OnlineTest from '../containers/OnlineTest';
import SignIn from '../containers/SignIn';
import SignUp from '../containers/SignUp';
import ActivateEmail from '../containers/ActivateEmail';
import InputNewPassword from '../containers/InputNewPassword';
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
