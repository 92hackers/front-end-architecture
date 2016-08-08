import React from 'react';
import ReactDom from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import SiteHeader from './components/SiteHeader';
import SiteFooter from './components/SiteFooter';
import Index from './components/index/Index';
import SignUp from './components/sign-up/SignUp';
import ChildInfo from './components/sign-up/ChildInfo';
import SignInUpHeader from './components/SignInUpHeader';
import HomepageHeader from './components/parent-homepage/HomepageHeader';
import Homepage from './components/parent-homepage/Homepage';
import SignIn from './components/sign-in/SignIn';
import TSignIn from './teacher-components/TSignIn';
import TSignUp from './teacher-components/TSignUp';
import ActivateEmail from './teacher-components/ActivateEmail';
import TInfo from './teacher-components/TInfo';
import THomepage from './teacher-components/THomepage';
import FacebookLogin from 'react-facebook-login';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import NotFound from './utilities/NotFound';

// tap event plugin initialization.
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

class App extends React.Component {

    constructor(props) {
        super(props);
    }

    render () {
        console.log(this.props.children);
        return (
            <div className="weteach">
              {/*<FacebookLogin appId="267768116929978" autoLoad={true} fields="name,email,picture"></FacebookLogin>*/}
              <SiteHeader></SiteHeader>
              <MuiThemeProvider>
                {this.props.children}
              </MuiThemeProvider>
              <SiteFooter></SiteFooter>
              <ul id="beian">
                <li> &copy;&nbsp;WeTeach</li>
                <li>沪ICP备 1111111</li>
              </ul>
            </div>
        )
    }
}

ReactDom.render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="/sign-up" component={TSignUp}></Route>
      <Route path="/sign-in" component={TSignIn}></Route>
      <Route path="/teacher-homepage" component={THomepage}></Route>
      <Route path="/complete-profile" component={TInfo}></Route>
      <Route path="*" component={NotFound}></Route>
    </Route>
  </Router>
  ), document.getElementById("app"));
