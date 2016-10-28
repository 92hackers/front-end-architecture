import React from 'react';
import { browserHistory } from 'react-router';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { blue500 } from 'material-ui/styles/colors';

import SiteHeader from '../containers/SiteHeader';
import SiteFooter from '../components/SiteFooter';

import SiteNotification from '../containers/SiteNotification';
import SiteLoading from '../containers/SiteLoading';

class AppContainer extends React.Component {

  componentDidMount() {
    this.auth();
  }

  componentWillReceiveProps(nextProps) {
    console.log('from appcontainer update.');
    const { token, status } = nextProps.profile
    const { token: oldToken, status: oldStatus } = this.props.profile
    if (token !== oldToken || status !== oldStatus) {
      this.auth();
    }
  }

  routerByStatus(status, examined) {
    switch (parseInt(status, 10)) {
      case 1: {
        const url = '/active-email?user_name=s@x^nil*@(<)';
        browserHistory.push(url);         //  jump to  Active your email notification page.
        break;
      }
      case 2:
        browserHistory.push('/step-to-sign-up');
        break;
      case 3:
      case 4:
      case 5:
        if (examined) {
          browserHistory.push('/teacher-homepage');
        } else {
          browserHistory.push('/teacher-online-test');
        }
        break;
      case 8:
      case 10:
      case 11:
      case 15:
        browserHistory.push('/teacher-homepage');
        break;
      default:
        browserHistory.push('/');
    }
  }

  router(path, status, examined) {
    const requestRoute = path;
    const routersArray = ['', 'sign-up', 'sign-in', 'teacher-homepage', 'teacher-online-test',
    'input-new-email', 'forget-password', 'step-to-sign-up', 'edit-profile', 'complete-payee-info'];

    if (routersArray.indexOf(requestRoute) !== -1) {
      this.routerByStatus(status, examined);
    }
  }

  auth() {
    const self = this;
    const requestRoute = this.props.location.pathname.replace(/\//, '');
    const { loggedIn, getProfile, showNotification, clearCounter, signOut } = this.props

    if (loggedIn) {
      self.props.increaseCounter();

      getProfile().then((res) => {
        const { success, data } = res.payload
        if (success) {
          self.router(requestRoute, data.status, data.examined);
          self.props.decreaseCounter();
        } else {
          showNotification('Your session has expired, Please sign in again.')
          clearCounter()
          signOut()
          browserHistory.push('/sign-in')
        }
      })
    } else if (requestRoute.length > 0) {
      // 不需要 token 的路径有: 1，reset-password,  2, activate-your-account, 这里留待以后扩充。
      const tokenlessRoutes = ['reset-password', 'activate-your-account'];
      if (!tokenlessRoutes.includes(requestRoute)) {
        browserHistory.push('/sign-in');
      } else {
        browserHistory.push('/');
      }
    }
  }

  render() {
    const muiTheme = getMuiTheme({
      palette: {
        primaryColor: blue500,
        primary1Color: blue500,
        primary2Color: blue500,
        primary3Color: blue500,
      },
      fontFamily: 'Open Sans, sans-serif',
    });

    return (
      <div className="weteach-root">
        <div>
          <MuiThemeProvider muiTheme={muiTheme}>
            {
              !this.props.pendingCounter ? (
                <div>
                  <SiteHeader token={this.props.token} />
                  { this.props.children }
                </div>
                  ) : <SiteLoading />
            }
          </MuiThemeProvider>
          <MuiThemeProvider muiTheme={muiTheme}>
            <SiteNotification />
          </MuiThemeProvider>
          <SiteFooter />
        </div>
      </div>
    )
  }

}

export default AppContainer;
