import React from 'react';
import {browserHistory} from 'react-router';
import formValidate from 'validate-js';
import nprogress from 'nprogress';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';

import api from '../network/api';
import WaitForSubmit from '../universal/WaitForSubmit';

class TSignInComp extends React.Component {

  constructor (props) {
    super (props);
  }

  handleSubmit(e) {
    e.preventDefault();

    var self = this;
    var notification = "";

    var email = document.getElementById("t-email").value;
    var password = document.getElementById("t-password").value;

    if (!!password && password.length < 6 || password.length > 20) {
      notification = "Password incorrect.";
    }

    var validator = new formValidate(document.getElementsByClassName("sign-in-form")[0], [
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

    nprogress.start();
    this.refs.loader.displayLoader();

    var signinRequest = api.TSignIn({
      email: email,
      password: password
    },
    {},
    "",
    (resp) => {
      nprogress.done();
      self.refs.loader.hideLoader();

      if (resp.success) {
        if (!!resp.data.token) {
          self.props.signIn("Bearer " + resp.data.token);
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
                    self.props.showNotification("A new email has already been sent to your registered email address.");
                  } else {
                    self.props.showNotification(resp.data.error);
                  }
                },
                (err) => {
                  self.props.networkError();
                }
              );
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
            browserHistory.push("/teacher-online-test");
            break;
          case 8 :
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
        self.props.showNotification("Email address or password incorrect. Please try again.");
      }
    },
    (err) => {
      nprogress.done();
      self.refs.loader.hideLoader();
      self.props.networkError();
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
          <RaisedButton className="submit-btn" type="submit" label="Sign in" primary={true} onClick={this.handleSubmit.bind(this)} style={style}></RaisedButton>
          <WaitForSubmit ref="loader"></WaitForSubmit>
          <RaisedButton labelStyle={labelStyle} label="Forgot your password ?" style={style} onClick={this.handleForgetPassword.bind(this)}></RaisedButton>
          {/* <RaisedButton labelStyle={labelStyle} icon={<FontIcon className="fa fa-facebook-official"></FontIcon>} label="Sign in with Facebook" style={style}></RaisedButton>
            <RaisedButton labelStyle={labelStyle} icon={<FontIcon className="fa fa-twitter"></FontIcon>} label="Sign in with Twitter" style={style}></RaisedButton>
          <RaisedButton labelStyle={labelStyle} icon={<FontIcon className="fa fa-linkedin"></FontIcon>} label="Sign in with Linkedin" style={style}></RaisedButton> */}
        </form>
      </div>
    )
  }

  handleForgetPassword (e) {
    e.preventDefault();
    browserHistory.push("/forget-password");
  }

}

export default TSignInComp;
