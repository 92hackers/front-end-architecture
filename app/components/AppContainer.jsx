import React from 'react';
import { browserHistory } from 'react-router';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { blue500 } from 'material-ui/styles/colors';

import SiteHeader from '../components/SiteHeader';
import SiteFooter from '../components/SiteFooter';

import SiteNotification from '../containers/siteNotification';
import { default as SiteLoading } from '../components/universal/Loading';

class AppContainer extends React.Component {

  componentWillMount() {
    const { loggedIn } = this.props
    this.auth(loggedIn)
  }

  componentWillReceiveProps(nextProps) {
    const { profile, loggedIn } = nextProps
    const { status } = profile
    if (loggedIn !== this.props.loggedIn || status !== this.props.profile.status) {
      this.auth(loggedIn);
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
    const routersArray = [
      '',
      'sign-up',
      'sign-in',
      'teacher-homepage',
      'teacher-homepage/timetables',
      'teacher-homepage/settings',
      'teacher-homepage/weekly-template',
      'teacher-online-test',
      'input-new-email',
      'forget-password',
      'step-to-sign-up',
      'edit-profile',
      'complete-payee-info',
    ];

    if (routersArray.indexOf(requestRoute) !== -1) {
      this.routerByStatus(status, examined);
    }
  }

  auth(loggedIn) {
    const requestRoute = this.props.location.pathname.replace(/\//, '');
    const {
      getProfile,
      showNotification,
      increaseCounter,
      decreaseCounter,
      clearCounter,
      signOut,
    } = this.props

    if (loggedIn) {
      increaseCounter();

      getProfile().then((res) => {
        const { success, data } = res.payload
        if (success) {
          this.router(requestRoute, data.status, data.examined);
          decreaseCounter();
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

    const { pendingCounter, children, profile, loggedIn } = this.props

    return (
      <div className="weteach-root">
        <div>
          <MuiThemeProvider muiTheme={muiTheme}>
            {
              !pendingCounter ? (
                <div>
                  <SiteHeader profile={profile} loggedIn={loggedIn} />
                  { React.cloneElement(children, { loggedIn, profile }) }
                </div>
                  ) : <SiteLoading pendingCounter={pendingCounter} />
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
