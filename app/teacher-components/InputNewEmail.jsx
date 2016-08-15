import React from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import api from '../network/api';
import EmailInputBox from '../universal/EmailInputBox';
import Notification from '../universal/Notification';
import formValidate from 'validate-js';

class InputNewEmailClass extends React.Component {

  constructor (props) {
    super (props);
    this.state = {
      notification: ""
    };
  }

  componentWillMount () {
    if (!this.props.token) {                // if the user not log in, redirect to sign in page.
      browserHistory.push("/sign-in");
    }
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
    var notification = '';
    var email = document.getElementById("email-address").value;

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

    var data = {
      email: email
    };

    api.TNewEmail(data,
      {"Authorization": this.props.token},
      "",
      (resp) => {
        if (resp.success) {
          browserHistory.push("/active-email");
        } else {
          self.notify("Something Wrong, Please Try Again Later.");
        }
      },
      (err) => {
        self.notify("Network Is Busy, Please Try Again Later.");
      }
    )
  }

  render () {
    return (
      <div className="input-new-email">
        <EmailInputBox submitText="Send activation email" id="email-address" handle={this.handleSubmit.bind(this)}></EmailInputBox>
        <Notification ref="notification" message={this.state.notification}></Notification>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.addToken.token
  }
}

const InputNewEmail = connect(
  mapStateToProps
)(InputNewEmailClass);

export default InputNewEmail;
