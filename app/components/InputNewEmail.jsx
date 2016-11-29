import React from 'react';
import { browserHistory } from 'react-router';
import { emailValidate } from '../utilities/filter'

import EmailInputBox from './universal/EmailInputBox';

export default class InputNewEmail extends React.Component {

  handleSubmit(e) {
    e.preventDefault();

    let notification = '';
    const email = document.getElementById('email-address').value;
    const { resendActivationEmail, showNotification, networkError } = this.props

    notification = emailValidate(email)

    if (notification.length > 0) {
      showNotification(notification);
      return;
    }

    resendActivationEmail({ email }).then((res) => {
      if (res.payload.success) {
        const url = '/active-email?user_name=s@x^nil*@(<)';
        browserHistory.push(url);
      } else {
        networkError()
      }
    })
  }

  render() {
    return (
      <div className="input-new-email">
        <EmailInputBox submitText="Send activation email" id="email-address" handle={this.handleSubmit} />
      </div>
    )
  }
}
