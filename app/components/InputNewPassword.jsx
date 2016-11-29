import React from 'react';
import { browserHistory } from 'react-router';
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
    let warning = '';
    const password = document.getElementById('new-password').value
    const rePassword = document.querySelector('#confirm-password').value

    if (!password || !rePassword) {
      warning = 'Please input correct password.'
    } else if (password.length < 6 || rePassword.length < 6
      || password.length > 20 || rePassword.length > 20
    ) {
      warning = 'Passwords must be between 6 and 20 characters in length.'
    } else if (password !== rePassword) {
      warning = 'New passwords do not match.'
    }

    const resetToken = this.props.location.query.token;

    if (warning.length > 0) {
      showNotification(warning);
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
