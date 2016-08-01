import React from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';
import reqwest from 'reqwest';

class TSignIn extends React.Component {

  constructor (props) {
    super (props);
    this.state = {
      open: false,
      notification: ""
    };
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

    var signinRequest = reqwest({
      url: "http://api.weteach.test/v1/user/login",
      method: "post",
      type: "json",
      data: {
        email: email,
        password: password
      }
    })
    .then((resp) => {
      if (resp.success) {
        console.log(resp);
      } else {
        self.setState({
          notification: "email address or password error"
        }, () => {
          self.handleTouchTap();
        });
      }
    })
    .fail((err) => {
      self.setState({
        notification: "something wrong, please try again later."
      }, () => {
        self.handleTouchTap();
      });
    });

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
      width: "100%"
    };

    return (
      <div className="teacher-sign-in">
        <form action="/teacher-sign-in" method="post" className="sign-in-form">
          <TextField id="t-email" type="email" floatingLabelText="email address"></TextField>
          <br/>
          <TextField id="t-password" type="password" floatingLabelText="password"></TextField>
          <br/>
          <br/>
          <br/>
          <FlatButton type="submit" label="Sign in" primary={true} onClick={this.handleSubmit.bind(this)} style={style}></FlatButton>
          <FlatButton label="sign in with facebook" style={style}></FlatButton>
          <FlatButton label="sign in with google" style={style}></FlatButton>
          <FlatButton label="sign in with twitter" style={style}></FlatButton>
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
}

export default TSignIn;
