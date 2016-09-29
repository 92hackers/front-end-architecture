import React from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {blue500} from 'material-ui/styles/colors';

import TIndex from './TIndex';

import SiteHeader from '../components/SiteHeader';
import SiteFooter from '../components/SiteFooter';

import SiteNotification from '../containers/SiteNotification';

class AppContainer extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount () {
    var self = this;
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
        <MuiThemeProvider muiTheme={muiTheme}>
          <div>
            <SiteHeader token={this.props.token}></SiteHeader>
            {this.props.children || <TIndex></TIndex>}
            <SiteNotification></SiteNotification>
          </div>
        </MuiThemeProvider>
        <SiteFooter></SiteFooter>
      </div>
    )
  }

}

export default AppContainer;
