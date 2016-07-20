// export module. require other modules.

import React from 'react';
import ReactDom from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
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

class App extends React.Component {

  constructor(props) {
    super(props);
  }

  render () {
    return (
      <div className="weteach">
        <HomepageHeader></HomepageHeader>
        <MuiThemeProvider><TSignUp></TSignUp></MuiThemeProvider>
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
