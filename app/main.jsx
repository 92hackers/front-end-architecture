import React from 'react';
import ReactDom from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import SiteHeader from './components/SiteHeader';
import SiteFooter from './components/SiteFooter';
import Index from './components/index/Index';
import SignUp from './components/sign-up/SignUp';
import ChildInfo from './components/sign-up/ChildInfo';
// import SignInUpHeader from './components/SignInUpHeader';
import HomepageHeader from './components/parent-homepage/HomepageHeader';
import Homepage from './components/parent-homepage/Homepage';
import SignIn from './components/sign-in/SignIn';
import TSignIn from './teacher-components/TSignIn';
import TSignUp from './teacher-components/TSignUp';
import ActivateEmail from './teacher-components/ActivateEmail';
import TInfo from './teacher-components/TInfo';
import THomepage from './teacher-components/THomepage';
// import StepToSignUp from './teacher-components/StepToSignUp';
import FacebookLogin from 'react-facebook-login';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import NotFound from './utilities/NotFound';
import InputNewEmail from './teacher-components/InputNewEmail';
import ForgetPassword from './teacher-components/ForgetPassword';
import TInputNewPassword from './teacher-components/TInputNewPassword';
import VerifyYourEmail from './teacher-components/VerifyYourEmail';
import { Provider } from 'react-redux';
import {createStore} from 'redux';
import reducers from './reducers';
import TIndex from './teacher-components/TIndex';


// tap event plugin initialization.
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();


let store = createStore(reducers);

class App extends React.Component {

    constructor(props) {
        super(props);
    }

    render () {

      console.log(store.getState());

      var userToken = store.getState().addToken.token;
      var isUserLoggedIn = false;

      isUserLoggedIn = userToken ? true : false;

      return (
        <div className="weteach-root">
          {/* <FacebookLogin appId="169495646797915" autoLoad={true} fields="name,email,picture"></FacebookLogin> */}
          <MuiThemeProvider>
            <SiteHeader isUserLoggedIn={isUserLoggedIn}></SiteHeader>
          </MuiThemeProvider>
          <MuiThemeProvider>
            {this.props.children || <TIndex></TIndex>}
          </MuiThemeProvider>
          <SiteFooter></SiteFooter>
        </div>
      )
      }
}

ReactDom.render((
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <Route path="/sign-up" component={TSignUp}></Route>
        <Route path="/sign-in" component={TSignIn}></Route>
        <Route path="/teacher-homepage" component={THomepage}></Route>
        <Route path="/complete-profile" component={TInfo}></Route>
        <Route path="/active-email" name="activeEmail" component={ActivateEmail}></Route>
        <Route path="/input-new-email" component={InputNewEmail}></Route>
        <Route path="/forget-password" component={ForgetPassword}></Route>
        <Route path="/reset-password" component={TInputNewPassword}></Route>
        <Route path="/activate-your-account" component={VerifyYourEmail}></Route>
        <Route path="*" component={NotFound}></Route>
      </Route>
    </Router>
  </Provider>
), document.getElementById("app"));
