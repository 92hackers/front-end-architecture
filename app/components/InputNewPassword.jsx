import React from 'react';
import { browserHistory } from 'react-router';
import FormValidate from 'validate-js';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

export default class InputNewPassword extends React.Component {

  componentWillMount() {
    if (!this.props.location.query.token) {
      browserHistory.push('/sign-in');
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    const { resetPassword, showNotification, networkError } = this.props
    let warn = '';
    const password = document.getElementById('new-password').value;

    const validator = new FormValidate(document.getElementById('t-input-new-password-form'), [
      {
        name: 'Password',
        rules: 'required|min_length[6]|max_length[20]',
      },
      {
        name: 'Confirm-Password',
        rules: 'required|match[Password]',
      },
    ], (errors) => {
      if (errors.length > 0) {
        warn = errors[0].message;
      }
    });

    validator._validateForm();

    const resetToken = this.props.location.query.token;

    if (warn.length > 0) {
      showNotification(warn);
      return;
    }

    const data = {
      token: resetToken,
      password,
    };

    if (resetToken.length) {
      resetPassword(data)
      .then((res) => {
        if (res.payload.success) {
          showNotification('Your password has been updated. Please log in with new password.')
          const timeId = setTimeout(() => {
            browserHistory.push('/sign-in');
            clearTimeout(timeId);
          }, 4100);
        } else {
          networkError()
        }
      })
      .catch(() => networkError())
    } else {
      showNotification('Something wrong. Try again later.');
    }
  }

  render() {
    return (
      <div className="t-input-new-password">
        <form id="t-input-new-password-form">
          <TextField
            name="Password"
            id="new-password"
            type="password"
            floatingLabelText="new password"
          />
          <TextField
            name="Confirm-Password"
            id="confirm-password"
            type="password"
            floatingLabelText="confirm password"
          />
          <br />
          <br />
          <RaisedButton
            label="Submit"
            primary
            onClick={this.handleSubmit}
            style={{ width: '100%' }}
          />
        </form>
      </div>
    )
  }
}
