//  a page tells user to activate the account.
import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { browserHistory } from 'react-router';
import { autobind } from 'core-decorators';

export default class ActivateEmail extends React.Component {

  componentWillMount() {
    const queryParam = this.props.location.query.user_name;
    if (queryParam !== 's@x^nil*@(<)') {
      browserHistory.push('/sign-in');
    }
  }

  @autobind
  handleChangeClick(e) {
    e.preventDefault();
    const { loggedIn } = this.props
    if (loggedIn) {
      browserHistory.push('/input-new-email');        // check state to judge if the user logged in.
    } else {
      browserHistory.push('/sign-in?action=changeEmailAddress');
    }
  }

  @autobind
  handleResendClick(e) {
    e.preventDefault();
    const { loggedIn, resendActivationEmail, showNotification, networkError } = this.props
    if (loggedIn) {
      resendActivationEmail({}).then((res) => {
        if (res.payload.success) {
          showNotification('A new email has already been sent to your registered email address.');
        } else {
          networkError()
        }
      })
    } else {
      browserHistory.push('/sign-in?action=resendEmail');
    }
  }

  render() {
    const buttonStyles = {
      marginLeft: '10px',
      marginRight: '10px',
    };

    return (
      <div className="t-activate-email">
        <p><i className="fa fa-check-circle" /> Thank you!</p>
        <p>We have sent an email to your registered email address.</p>
        <p>Please check your email for the verification link.</p>
        <p style={{ marginTop: '50px' }}>If you did not receive the email:</p>
        <div style={{ marginTop: '20px' }}>
          You may
          <RaisedButton
            style={buttonStyles}
            label="resend the email"
            onClick={this.handleResendClick}
          />
          or
          <RaisedButton
            style={buttonStyles}
            label="change the email address"
            onClick={this.handleChangeClick}
          />
        </div>
      </div>
    )
  }
}
