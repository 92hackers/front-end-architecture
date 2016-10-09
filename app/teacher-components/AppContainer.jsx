import React from 'react';
import { browserHistory } from 'react-router';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {blue500} from 'material-ui/styles/colors';

import TIndex from './TIndex';
import api from '../network/api';

import SiteHeader from '../containers/SiteHeader';
import SiteFooter from '../components/SiteFooter';

import SiteNotification from '../containers/SiteNotification';
import SiteLoading from '../containers/SiteLoading';

class AppContainer extends React.Component {

  constructor(props) {
    super(props);
  }

  routerByStatus (status, examined) {
    switch (parseInt(status)) {
      case 1:
        let url = "/active-email?user_name=" + "s@x^nil*@(<)";
        browserHistory.push(url);         //  jump to  Active your email notification page.
        break;
      case 2:
        browserHistory.push("/step-to-sign-up");
        break;
      case 3:
      case 4:
        if (!!examined) {               // if teacher pass the online test, route to teacher homepage, or to do the test.
          browserHistory.push("/teacher-homepage");
        } else {
          browserHistory.push("/teacher-online-test");
        }
        break;
      case 8:
      case 10:
      case 11:
      case 15:
        browserHistory.push("/teacher-homepage");
        break;
      default:
        browserHistory.push("/");
    }
  }

  router (path, status, examined) {
    let requestRoute = path;
    var routersArray = ["","sign-up", "sign-in", "teacher-homepage", "teacher-online-test",
    "input-new-email", "forget-password", "step-to-sign-up"];

    if (routersArray.indexOf(requestRoute) !== -1) {
      this.routerByStatus(status, examined);
    }
  }

  auth (token) {
    const self = this;
    const requestRoute = this.props.location.pathname.replace(/\//, "");

    if (!!token) {

      self.props.increaseCounter();

      var profileRequest = api.TGetProfile(
        "",
        { "Authorization": token },
        "",
        (resp) => {
          if (resp.success) {
            const profile = resp.data;
            self.props.getProfile(profile);
            self.router(requestRoute, profile.status, profile.examined);
            self.props.decreaseCounter();
          }
        },
        (err) => {
          self.props.showNotification("Your session has expired. Please sign in again.");
          self.props.clearCounter();
          self.props.signOut();
          browserHistory.push("/sign-in");
        }
      );

    } else {
      if (!!requestRoute.length) {
        // 不需要 token 的路径有: 1，reset-password,  2, activate-your-account, 这里留待以后扩充。
        let tokenlessRoutes = ["reset-password", "activate-your-account"];
        if (!tokenlessRoutes.includes(requestRoute)) {
          browserHistory.push("/sign-in");
        }
      } else {
        browserHistory.push("/");
      }
    }
  }

  componentWillMount () {
    this.auth(this.props.token);
  }

  componentWillReceiveProps (nextProps) {
    var token = nextProps.token;
    if (token !== this.props.token) {
      this.auth(token);
    }
  }

  render () {

    const muiTheme = getMuiTheme({
      palette: {
        primaryColor: blue500,
        primary1Color: blue500,
        primary2Color: blue500,
        primary3Color: blue500,
      },
      fontFamily: "Open Sans, sans-serif"
    });

    return (
      <div className="weteach-root">
        <div>
          <MuiThemeProvider muiTheme={muiTheme}>
            {
              !this.props.pendingCounter ? (
                <div>
                  <SiteHeader token={this.props.token}></SiteHeader>
                  {this.props.children || <TIndex></TIndex>}
                </div>
                  ) : <SiteLoading></SiteLoading>
            }
          </MuiThemeProvider>
          <MuiThemeProvider muiTheme={muiTheme}>
            <SiteNotification></SiteNotification>
          </MuiThemeProvider>
          <SiteFooter></SiteFooter>
        </div>
      </div>
    )
  }
}

export default AppContainer;
