import React from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import {browserHistory} from 'react-router';
import Notification from '../utilities/Notification';
import api from '../network/api';

class TInputNewPassword extends React.Component {

  constructor(props) {
    super (props);
    this.state = {
      notification: ""
    };
  }

  handleSubmit (e) {

    e.preventDefault();

    var self = this;
    var password = document.getElementsByClassName("new-password")[0].value;
    var rePassword = document.getElementsByClassName("confirm-password")[0].value;

    var token = this.location.query.token;

     // TODO: get reset password token from url.

    if (password === rePassword) {
      api.TReqReset(password, "", "",
      (resp) => {
        if (resp.success) {
          self.setState({
            notification: "reset password successfully! wait to reload."
          }, () => {
            self.refs.notification.handleNotificationOpen();
          });
          var timeId = setTimeout(() => {
            clearTimeout(timeId);
            browserHistory.push("/sign-in");
          }, 4100);
        } else {
          alert("some wrong, please try again later.");
        }
      },
      (err) => {
        console.log(err);
        alert("network is busy, please try again later.");
      }
    );

    } else {
      self.setState({
        notification: "please input correct passwords"
      }, () => {
        self.refs.notification.handleNotificationOpen();
      });
    }

  }

  render () {
    return (
      <div className="t-input-new-password">
        <form>
          <TextField className="new-password" type="password" floatingLabelText="new password"></TextField>
          <TextField className="confirm-password" type="password" floatingLabelText="confirm password"></TextField>
          <FlatButton floatingLabelText="Submit" primary={true} onClick={this.handleSubmit.bind(this)} style={{width: "100%"}}></FlatButton>
        </form>
        <Notification message={this.state.notification} ref="notification"></Notification>
      </div>
    )
  }
}

export default TInputNewPassword;
