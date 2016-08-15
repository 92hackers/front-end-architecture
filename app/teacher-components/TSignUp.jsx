import React from 'react';
import {browserHistory} from 'react-router';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import apis from '../network/api';
import Notification from '../universal/Notification';
import formValidate from 'validate-js';

class TSignUp extends React.Component {

  constructor (props) {
    super (props);
    this.state = {
      open: false,
      notification: ""
    };
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
    var errorMessage = "";

    var firstName = document.getElementById("t-first-name").value;
    var lastName = document.getElementById("t-last-name").value;
    var emailValue = document.getElementById("t-email").value;
    var passwordValue = document.getElementById("t-password").value;
    var rePasswordValue = document.getElementById("t-re-password").value;

    var validator = new formValidate(document.getElementById("t-sign-up-form"), [
      {
        name: 'FirstName',
        rules: "required|min_length[2]|max_length[30]"
      },
      {
        name: "LastName",
        rules: "required|min_length[2]|max_length[30]"
      },
      {
        name: "Email",
        rules: "required|valid_email"
      },
      {
        name: "Password",
        rules: "required|min_length[6]|max_length[30]"
      },
      {
        name: "Confirm-Password",
        rules: "required|matches[Password]"
      }
    ], (errors) => {
      if (errors.length > 0) {
        errorMessage = errors[0].message;
      }
    });

    validator._validateForm();

    if (!!errorMessage.length) {
      this.notify(errorMessage);
      return;
    }

    var data = {
      firstname: firstName,
      lastname: lastName,
      email: emailValue,
      password: passwordValue,
      reflink: document.referrer
    };

    var signUpRequest = apis.TSignUp(data,
      {},
      "",
      (resp) => {
        if (resp.success) {
          browserHistory.push("/active-email");         //  jump to  Active your email notification page.
        } else {
          if (!!resp.data.email) {
            self.notify("This Email Address Has Already Been Registered");
            return;
          }
        }
      },
      (err) => {
        self.notify("Network Is Busy, Please Try Again Later.");
      }
    )
    console.log(data);
  }

  render () {
    let style = {
      width: "100%"
    };

    return (
      <div className="t-sign-up">
        <form id="t-sign-up-form">
          <div className="clearfix">
            <TextField name="FirstName" className="left" style={{width: "40%"}} id="t-first-name" type="text" floatingLabelText="First Name"></TextField>
            <TextField name="LastName" className="right" style={{width: "40%"}} id="t-last-name" type="text" floatingLabelText="Last Name"></TextField>
          </div>
          <TextField name="Email" id="t-email" type="email" floatingLabelText="Email Address"></TextField>
          <br/>
          <TextField name="Password" id="t-password" type="password" floatingLabelText="Password"></TextField>
          <br/>
          <TextField name="Confirm-Password" id="t-re-password" type="password" floatingLabelText="Confirm Password"></TextField>
          <br/>
          <br/>
          <br/>
          <RaisedButton type="submit" label="Sign up" primary={true} style={style} onClick={this.handleSubmit.bind(this)}></RaisedButton>
        </form>
        <Notification ref="notification" message={this.state.notification}></Notification>
      </div>
    )
  }
}

export default TSignUp;
