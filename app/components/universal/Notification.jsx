/*
*/
import React from 'react';
import Snackbar from 'material-ui/Snackbar';

class Notification extends React.Component {

  constructor (props) {
    super (props);
  }

  render () {

    var style = {
      fontWeight: "bold",
      textAlign: "center"
    };

    const { isShow, message } = this.props;

    return (
      <Snackbar
        open={isShow}
        bodyStyle={style}
        message={message}
        autoHideDuration={3000}
        onRequestClose={this.props.hideNotification}
      />
    )
  }
}

export default Notification;
