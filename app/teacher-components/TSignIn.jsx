import React from 'react';
import {browserHistory} from 'react-router';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import Notification from '../utilities/Notification';
import { connect } from 'react-redux';
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

    if (!email.length) {
      notification = "Please Input Your Email Address";
    } else if (!password.length) {
      notification = "Please Input Your Password";
    } else if (password.length < 6) {
      notification = "Password Should Be More Than 6 Characters";
    } else if (password.length > 20) {
      notification = "Password Should Be Less Than 20 Characters";
    }

    if (!!notification.length) {
      self.notify(notification);
      return;
    }

    var signinRequest = api.TSignIn({
      email: email,
      password: password
    },
    {},
    "",
    (resp) => {
      if (resp.success) {
        if (!!resp.data.token) {
          this.props.dispatch(addToken("Bearer " + resp.data.token));     // store  user token into global store object.
        }
        console.log(resp.data.token);
        switch (resp.data.status) {
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
              browserHistory.push("/active-email");
            }
            break;
          case 2 :
            browserHistory.push("/complete-profile");
            break;
          default :
            browserHistory.push("/teacher-homepage");
        }
      } else {
        self.notify("Email Address Or Password Error");
      }
    },
    (err) => {
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
      color: "#999999"
    };

    return (
      <div className="teacher-sign-in">
        <form action="/teacher-sign-in" method="post" className="sign-in-form">
          <TextField id="t-email" type="email" floatingLabelText="Email Address"></TextField>
          <br/>
          <TextField id="t-password" type="password" floatingLabelText="Password"></TextField>
          <br/>
          <br/>
          <br/>
          <RaisedButton type="submit" label="Sign in" primary={true} onClick={this.handleSubmit.bind(this)} style={style}></RaisedButton>
          <RaisedButton labelStyle={labelStyle} label="Forget your password ?" style={style} onClick={this.handleForgetPassword.bind(this)}></RaisedButton>
          <RaisedButton labelStyle={labelStyle} icon={<FontIcon className="fa fa-facebook-official"></FontIcon>} label="Sign in with Facebook" style={style}></RaisedButton>
          <RaisedButton labelStyle={labelStyle} icon={<FontIcon className="fa fa-twitter"></FontIcon>} label="Sign in with Twitter" style={style}></RaisedButton>
          <RaisedButton labelStyle={labelStyle} icon={<FontIcon className="fa fa-linkedin"></FontIcon>} label="Sign in with Linkedin" style={style}></RaisedButton>
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
