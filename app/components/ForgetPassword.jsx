import React from 'react';
import { autobind } from 'core-decorators'
import { emailValidate } from '../utilities/filter'
import EmailInputBox from './universal/EmailInputBox'

class ForgetPasswordComp extends React.Component {

  @autobind
  handleSubmit(e) {
    e.preventDefault();

    let notification = '';
    const emailValue = document.getElementById('forget-password-email-box').value;
    const { showNotification, resetPassword, networkError } = this.props

    notification = emailValidate(emailValue)

    if (notification.length > 0) {
      showNotification(notification);
      return;
    }

    resetPassword({ email: emailValue }).then((res) => {
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
