import React from 'react';
import {browserHistory} from 'react-router';
import formValidate from 'validate-js';
import { connect } from 'react-redux';
import nprogress from 'nprogress';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';

import Notification from '../universal/Notification';
import addToken from '../actions/addToken';
import api from '../network/api';

class TSignInClass extends React.Component {

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

  handleSubmit(e) {
    e.preventDefault();

    var self = this;
    var notification = "";

    var email = document.getElementById("t-email").value;
    var password = document.getElementById("t-password").value;

    var validator = new formValidate(document.getElementsByClassName("sign-in-form")[0], [
      {
        name: "Email",
        rules: "required|valid_email"
      },
      {
        name: "Password",
        rules: "required|min_length[6]|max_length[30]"
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

    nprogress.start();
    var signinRequest = api.TSignIn({
      email: email,
      password: password
    },
    {},
    "",
    (resp) => {
      nprogress.done();
      if (resp.success) {
        if (!!resp.data.token) {
          let token = resp.data.token;
          localStorage.setItem("user_token", token);
          this.props.dispatch(addToken("Bearer " + token));     // store  user token into global store object.
        }
        switch (parseInt(resp.data.status)) {
          case 1 :
            var queryParam = self.props.location.query.action;
            var token = "Bearer " + resp.data.token;
            if (queryParam === "resendEmail") {
              api.TNewEmail("",
              {"Authorization": token},
              "",
              (resp) => {
                if (resp.success) {
                  self.notify("A New Email Has Aleady Send To Your Registered Email Address");
                } else {
                  self.notify(resp.data.error);
                }
              },
              (err) => {
                self.notify("Network Is Busy, Try Again Later");
              }
              )
            } else if (!queryParam) {
              let url = "/active-email?user_name=" + "s@x^nil*@(<)";
              browserHistory.push(url);
            }
            break;
          case 2 :
            browserHistory.push("/step-to-sign-up");
            break;
          case 3 :
          case 4 :
          case 8 :
            browserHistory.push("/display-user-status");
            break;
          case 10 :
          case 11 :
          case 15 :
            browserHistory.push("/teacher-homepage");
            break;
          default:
            browserHistory.push("/not-found");
            break;
        }
      } else {
        self.notify("Email Address Or Password Error");
      }
    },
    (err) => {
      nprogress.done();
      self.notify("Something Wrong, Please Try Again Later");
    }
    );
  }

  render () {
    var style = {
      width: "100%",
      marginBottom: "10px"
    };

    var labelStyle = {
      color: "#666666",
      fontWeight: "bold"
    };

    return (
      <div className="teacher-sign-in">
        <form className="sign-in-form">
          <TextField name="Email" id="t-email" type="email" floatingLabelText="Email Address" floatingLabelStyle={labelStyle}></TextField>
          <br/>
          <TextField name="Password" id="t-password" type="password" floatingLabelText="Password" floatingLabelStyle={labelStyle}></TextField>
          <br/>
          <br/>
          <br/>
          <RaisedButton type="submit" label="Sign in" primary={true} onClick={this.handleSubmit.bind(this)} style={style}></RaisedButton>
          <RaisedButton labelStyle={labelStyle} label="Forgot your password ?" style={style} onClick={this.handleForgetPassword.bind(this)}></RaisedButton>
          {/* <RaisedButton labelStyle={labelStyle} icon={<FontIcon className="fa fa-facebook-official"></FontIcon>} label="Sign in with Facebook" style={style}></RaisedButton>
            <RaisedButton labelStyle={labelStyle} icon={<FontIcon className="fa fa-twitter"></FontIcon>} label="Sign in with Twitter" style={style}></RaisedButton>
          <RaisedButton labelStyle={labelStyle} icon={<FontIcon className="fa fa-linkedin"></FontIcon>} label="Sign in with Linkedin" style={style}></RaisedButton> */}
        </form>
        <Notification ref="notification" message={this.state.notification}></Notification>
      </div>
    )
  }

  handleForgetPassword (e) {
    e.preventDefault();
    browserHistory.push("/forget-password");
  }

}

var TSignIn = connect()(TSignInClass);

export default TSignIn;
