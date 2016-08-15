import React from 'react';
import {browserHistory} from 'react-router';
import formValidate from 'validate-js';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import api from '../network/api';
import Notification from '../universal/Notification';

class TInputNewPassword extends React.Component {

  constructor(props) {
    super (props);
    this.state = {
      notification: ""
    };
  }

  notify (message) {
    if (!!message.length) {
      this.setState({
        notification: message
      }, () => {
        this.refs.notification.handleNotificationOpen();
      });
    }
  }

  handleSubmit (e) {

    e.preventDefault();

    var self = this;
    var notification = "";
    var password = document.getElementById("new-password").value;
    var rePassword = document.getElementById("confirm-password").value;

    var validator = new formValidate(document.getElementById("t-input-new-password-form"), [
      {
        name: "Password",
        rules: "required|min_length[6]|max_length[30]"
      },
      {
        name: "Confirm-Password",
        rules: "required|match[Password]"
      }
    ], (errors) => {
      if (errors.length > 0) {
        notification = errors[0].message;
      }
    })

    var resetToken = this.props.location.query.token;

    if (!!notification.length) {
      self.notify(notification);
      return;
    }

    let data = {
      token: resetToken,
      password: password
    };

    if (resetToken.length) {

      api.TReset(data, "", "",
      (resp) => {
        if (resp.success) {
          self.notify("Reset Password Successfully! Wait To Refresh");
          var timeId = setTimeout(() => {
            clearTimeout(timeId);
            browserHistory.push("/sign-in");
          }, 4100);
        } else {
          self.notify("Something Wrong, Please Try Again Later");
        }
      },
      (err) => {
        self.notify("Network Is Busy, Please Try Again Later");
      }
    );
  } else {
    self.notify("Some Thing Wrong.");
  }

  }

  render () {
    return (
      <div className="t-input-new-password">
        <form id="t-input-new-password-form">
          <TextField name="Password" id="new-password" type="password" floatingLabelText="new password"></TextField>
          <TextField name="Confirm-Password" id="confirm-password" type="password" floatingLabelText="confirm password"></TextField>
          <br/>
          <br/>
          <RaisedButton label="Submit" primary={true} onClick={this.handleSubmit.bind(this)} style={{width: "100%"}}></RaisedButton>
        </form>
        <Notification message={this.state.notification} ref="notification"></Notification>
      </div>
    )
  }
}

export default TInputNewPassword;
