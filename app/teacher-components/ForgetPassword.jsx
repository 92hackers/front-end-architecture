
import React from 'react';
import EmailInputBox from '../universal/EmailInputBox';
import api from '../network/api';
import Notification from '../universal/Notification';
import formValidate from 'validate-js';

class ForgetPassword extends React.Component {

  constructor (props) {
    super (props);
    this.state = {
      notification: ''
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
    var email = document.getElementById("forget-password-email-box").value;

    var validator = new formValidate(document.forms[0], [
      {
        name: "Email",
        rules: "required|valid_email"
      }
    ], (errors) => {
      if (errors.length > 0) {
        notification = errors[0].message;
      }
    });
    validator._validateForm();

    if (!!notification.length) {
      self.notify(notification);
      return;
    }

    api.TReqReset({email: email}, "", "",
    (resp) => {
      if (resp.success) {
        self.notify("We Have Already Send An Email To Your Email Box, You Can Click The Link To Reset Your New Password");
      } else {
        self.notify("Send Email Failed, Try Again Later");
      }
    },
    (err) => {
      console.log(err);
      self.notify("Network Is Busy, Try Again Later");
    }
  )

  }

  render () {
    return (
      <div className="forget-password">
        <h1 className="text-center">Enter your email address</h1>
        <h1 className="text-center">and we will send you a link to reset your password</h1>
        <EmailInputBox submitText="Send password reset email" id="forget-password-email-box" handle={this.handleSubmit.bind(this)}></EmailInputBox>
        <Notification message={this.state.notification} ref="notification"></Notification>
      </div>
    )
  }
}

export default ForgetPassword;
