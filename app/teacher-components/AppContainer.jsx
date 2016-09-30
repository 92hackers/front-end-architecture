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

  routerByStatus (status) {
    console.log("user current status: ", status);
    switch (parseInt(status)) {
      case 1:
        browserHistory.push("/active-email");
        break;
      case 2:
        browserHistory.push("/step-to-sign-up");
        break;
      case 3:
      case 4:
        browserHistory.push("/teacher-online-test");
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

  router (path, status) {
    let requestRoute = path;

    var routersArray = ["sign-up", "sign-in", "teacher-homepage", "teacher-online-test",
    "input-new-email", "forget-password", "reset-password",
    "step-to-sign-up"];

    if (routersArray.indexOf(requestRoute) !== -1) {
      this.routerByStatus(status);
    }

  }

  auth () {
    var self = this;
    var requestRoute = this.props.location.pathname;
    requestRoute = requestRoute.replace(/\//, "");

    var token = localStorage.getItem("user_token") || "";

    if (!!token) {

      self.props.increaseCounter();

      var profileRequest = api.TGetProfile(
        "",
        { "Authorization": token },
        "",
        (resp) => {
          if (resp.success) {

            if (!self.props.token) {
              self.props.signIn(token);
            }

            self.props.getProfile(resp.data);
            self.router(requestRoute, resp.data.status);
            self.props.decreaseCounter();
          }
        },
        (err) => {
          self.props.showNotification("Your session token expired, Please sign in again.");
          self.props.clearCounter();
          self.props.signOut();
          browserHistory.push("/sign-in");
        }
      );

    } else {
      if (!!requestRoute.length) {
        browserHistory.push("/sign-in");
      } else {
        browserHistory.push("/");
      }
    }
  }

  componentWillMount () {
    this.auth();
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.token !== this.props.token) {
      this.auth();
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
