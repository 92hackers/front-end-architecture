import React from 'react';
import {browserHistory} from 'react-router';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import Snackbar from 'material-ui/Snackbar';
import apis from '../network/api';
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

  componentDidMount () {
    // some initial information.
  }

  handleSubmit(e) {

    var self = this;
    var notification = "";


    let event = e || e.event;
    if (event.preventDefault) {
      event.preventDefault();
    } else if (event.cancelBubble) {
      event.cancelBubble();
    }

    var email = document.getElementById("t-email").value;
    var password = document.getElementById("t-password").value;

    if (!email.length) {
      notification = "please input your email address";
    } else if (!password.length) {
      notification = "please input your password";
    } else if (password.length < 6) {
      notification = "password should be more than 6 characters";
    } else if (password.length > 20) {
      notification = "password should be less than 20 characters";
    }

    if (!!notification.length) {
      self.setState({
        notification: notification
      }, () => {
        self.handleTouchTap();
      });
      return;
    }

    var signinRequest = apis.TSignIn({
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
                  alert("a new email has already send to your registered email address");
                } else {
                  alert(resp.data.error);
                }
              },
              (err) => {
                console.log(err);
                alert("server error, try again later.");
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
        self.setState({
          notification: "email address or password error"
        }, () => {
          self.handleTouchTap();
        });
      }
    },
    (err) => {
      self.setState({
        notification: "something wrong, please try again later."
      }, () => {
        self.handleTouchTap();
      });
    }
    );
  }

  handleTouchTap () {
    this.setState({
      open: true
    });
  };

  handleRequestClose () {
    this.setState({
      open: false
    });
  };


  render () {
    var style = {
      width: "100%",
      marginBottom: "10px"
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
          <RaisedButton label="Forget your password ?" style={style} onClick={this.handleForgetPassword.bind(this)}></RaisedButton>
          <RaisedButton icon={<FontIcon className="fa fa-facebook-official"></FontIcon>} label="Sign in with Facebook" style={style}></RaisedButton>
          <RaisedButton icon={<FontIcon className="fa fa-twitter"></FontIcon>} label="Sign in with Twitter" style={style}></RaisedButton>
          <RaisedButton icon={<FontIcon className="fa fa-linkedin"></FontIcon>} label="Sign in with Linkedin" style={style}></RaisedButton>
        </form>
        <Snackbar
          open={this.state.open}
          message={this.state.notification}
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose.bind(this)}
        />
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
