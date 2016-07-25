// export module. require other modules.

import React from 'react';
import ReactDom from 'react-dom';
//import Test from './components/Test.jsx';
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
import FacebookLogin from 'react-facebook-login';

// tap event plugin initialization.
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

class App extends React.Component {

  constructor(props) {
    super(props);
    }

  render () {
    return (
      <div className="weteach">
        <HomepageHeader></HomepageHeader>
        {/*<FacebookLogin appId="267768116929978" autoLoad={true} fields="name,email,picture"></FacebookLogin>*/}
        <TInfo></TInfo>
        <SiteFooter></SiteFooter>
        <ul id="beian">
          <li> &copy;&nbsp;WeTeach</li>
          <li>沪ICP备 1111111</li>
        </ul>
      </div>
    )
  }
}

ReactDom.render(<App />, document.getElementById("app"));
