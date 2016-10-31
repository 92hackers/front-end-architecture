import React from 'react';
import { browserHistory } from 'react-router';
import FormValidate from 'validate-js';

import EmailInputBox from './universal/EmailInputBox';

export default class InputNewEmail extends React.Component {

  handleSubmit(e) {
    e.preventDefault();

    let notification = '';
    const email = document.getElementById('email-address').value;

    const { resendActivationEmail, showNotification, networkError } = this.props

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
