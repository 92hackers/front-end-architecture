
import React from 'react';
import FormValidate from 'validate-js';
import { autobind } from 'core-decorators'

import EmailInputBox from './universal/EmailInputBox';

class ForgetPasswordComp extends React.Component {

  @autobind
  handleSubmit(e) {
    e.preventDefault();

    let notification = '';
    const email = document.getElementById('forget-password-email-box').value;
    const { showNotification, resetPassword, networkError } = this.props

    const validator = new FormValidate(document.forms[0], [
      {
        name: 'Email',
        rules: 'required|valid_email',
      },
    ], (errors) => {
      if (errors.length > 0) {
        notification = errors[0].message;
      }
    });

    /* eslint no-underscore-dangle: 0 */
    validator._validateForm();

    if (notification.length > 0) {
      showNotification(notification);
      return;
    }

    resetPassword({ emai: email }).then((res) => {
      if (res.payload.success) {
        showNotification('We have just sent you an email. Please click the link within it to reset.');
      } else {
        showNotification('An issue occured, please confirm your email address.');
      }
    }).catch(() => networkError())
  }

  render() {
    return (
      <div className="forget-password">
        <h1 className="text-center">Enter your email address</h1>
        <h1 className="text-center">and we will send you a link to reset your password</h1>
        <EmailInputBox submitText="Send password reset email" id="forget-password-email-box" handle={this.handleSubmit} />
      </div>
    )
  }
}

export default ForgetPasswordComp;
