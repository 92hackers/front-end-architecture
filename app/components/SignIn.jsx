import React from 'react';
import { browserHistory } from 'react-router';
import { autobind } from 'core-decorators'

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import WaitForSubmit from './universal/WaitForSubmit';
import { emailValidate } from '../utilities/filter'

export default class SignIn extends React.Component {

  @autobind
  handleSubmit(e) {
    e.preventDefault();

    const self = this

    const { signIn, resendActivationEmail, showNotification, networkError } = this.props

    let notification = '';

    const email = document.getElementById('t-email').value;
    const password = document.getElementById('t-password').value;

    notification = emailValidate(email)

    if (!notification) {
      if (!password) {
        notification = 'Please enter your password.'
      } else if (!!password && (password.length < 6 || password.length > 20)) {
        notification = 'Password incorrect.';
      }
    }

    if (notification.length > 0) {
      showNotification(notification);
      return;
    }

    this.refs.loader.displayLoader();

    const data = {
      email,
      password,
    }

    signIn(data).then((res) => {
      console.log(this.refs)
      this.refs.loader.hideLoader()
      if (res.payload.success) {
        const queryParam = self.props.location.query.action
        if (res.payload.data.status === 1 && queryParam === 'resendEmail') {
          resendActivationEmail({}).then((emailRes) => {
            if (emailRes.payload.success) {
              showNotification('A new email has already been sent to your registered email address.');
            } else {
              networkError()
            }
          })
        }
      } else {
        showNotification('Email address or password incorrect. Please try again.');
      }
    })
  }

  handleForgetPassword(e) {
    e.preventDefault();
    browserHistory.push('/forget-password');
  }

  render() {
    const style = {
      width: '100%',
      marginBottom: '10px',
    };

    const labelStyle = {
      color: '#666666',
      fontWeight: 'bold',
    };

    return (
      <div className="teacher-sign-in">
        <form className="sign-in-form">
          <TextField
            name="Email"
            id="t-email"
            type="email"
            floatingLabelText="Email Address"
            floatingLabelStyle={labelStyle}
          />
          <br />
          <TextField
            name="Password"
            id="t-password"
            type="password"
            floatingLabelText="Password"
            floatingLabelStyle={labelStyle}
          />
          <br />
          <br />
          <br />
          <RaisedButton
            className="submit-btn"
            type="submit"
            label="Sign in"
            primary
            onClick={this.handleSubmit}
            style={style}
          />
          <WaitForSubmit ref="loader" style={{ marginBottom: 10 }} />
          <RaisedButton
            labelStyle={labelStyle}
            label="Forgot your password ?"
            style={style}
            onClick={this.handleForgetPassword}
          />
        </form>
      </div>
    )
  }
}
