
import React from 'react';
import EmailInputBox from '../universal/EmailInputBox';
import api from '../network/api';
import formValidate from 'validate-js';

class ForgetPasswordComp extends React.Component {

  constructor (props) {
    super (props);
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
      self.props.showNotification(notification);
      return;
    }

    api.TReqReset({email: email}, "", "",
      (resp) => {
        if (resp.success) {
          self.props.showNotification("We Have Already Send An Email To Your Email Box, You Can Click The Link To Reset Your New Password");
        } else {
          self.props.showNotification("Send Email Failed, Try Again Later");
        }
      },
      (err) => {
        self.props.networkError();
      }
    )
  }

  render () {
    return (
      <div className="forget-password">
        <h1 className="text-center">Enter your email address</h1>
        <h1 className="text-center">and we will send you a link to reset your password</h1>
        <EmailInputBox submitText="Send password reset email" id="forget-password-email-box" handle={this.handleSubmit.bind(this)}></EmailInputBox>
      </div>
    )
  }
}

export default ForgetPasswordComp;
