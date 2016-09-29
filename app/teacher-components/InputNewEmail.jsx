import React from 'react';
import {browserHistory} from 'react-router';
import api from '../network/api';
import EmailInputBox from '../universal/EmailInputBox';
import formValidate from 'validate-js';

class InputNewEmailComp extends React.Component {

  constructor (props) {
    super (props);
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
      self.props.showNotification(notification);
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
          let url = "/active-email?user_name=" + "s@x^nil*@(<)";
          browserHistory.push(url);
        } else {
          self.props.networkError();
        }
      },
      (err) => {
        self.props.networkError();
      }
    )
  }

  render () {
    return (
      <div className="input-new-email">
        <EmailInputBox submitText="Send activation email" id="email-address" handle={this.handleSubmit.bind(this)}></EmailInputBox>
      </div>
    )
  }
}

export default InputNewEmailComp;
