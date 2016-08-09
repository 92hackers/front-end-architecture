/*
  props:
    message
  you could use this.refs.notification.handleNotificationOpen  to handle open the Snackbar.
*/

import React from 'react';
import Snackbar from 'material-ui/Snackbar';

class Notification extends React.Component {

  constructor (props) {
    super (props);
    this.state = {
      open: false,
    };
  }

  handleNotificationOpen () {
    this.setState({
      open: true
    });
  }

  handleRequestClose () {
    this.setState({
      open: false
    });
  }

  render () {
    return (
      <Snackbar
        open={this.state.open}
        message={this.props.message}
        autoHideDuration={4000}
        onRequestClose={this.handleRequestClose.bind(this)}
      />
    )
  }
}

export default Notification;
