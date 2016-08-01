import React from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';
import reqwest from 'reqwest';

class TSignUp extends React.Component {

  constructor (props) {
    super (props);
    this.state = {
      open: false,
      notification: ""
    };
  }

  handleSubmit (e) {

    var self = this;
    var errorMessage = "";

    let event = e || e.event;
    if (event.preventDefault) {
      event.preventDefault();
    } else if (event.cancelBubble) {
      event.cancelBubble();
    }

    var firstName = document.getElementById("t-first-name").value;
    var lastName = document.getElementById("t-last-name").value;
    var emailValue = document.getElementById("t-email").value;
    var passwordValue = document.getElementById("t-password").value;
    var rePasswordValue = document.getElementById("t-re-password").value;

    if (!firstName.length) {
      errorMessage = "please input your firstname";
    } else if (!lastName.length) {
      errorMessage = "please input your lastname";
    } else if (!emailValue.length) {
      errorMessage = "please input your email address";
    } else if (passwordValue !== rePasswordValue) {
      errorMessage = "please input correct password!";
    } else if (passwordValue.length < 6) {
      errorMessage = "password should be more than 6 characters!";
    } else if (passwordValue.length > 20) {
      errorMessage = "password should be less than 20 characters!";
    }

    if (!!errorMessage.length) {
      this.setState({
        notification: errorMessage
      }, () => {
        this.handleTouchTap();
      });
      return;
    }

    var data = {
      firstname: firstName,
      lastname: lastName,
      email: emailValue,
      password: passwordValue,
      reflink: document.referrer
    };

    var signUpRequest = reqwest({
      url: "http://api.weteach.test/v1/user/signup?code=3e48c40aa059fd26952d91349103c984",
      method: "POST",
      type: "json",
      data: data
    })
    .then((resp) => {
      if (resp.success) {
        console.log(resp);
      } else {
        if (!!resp.data.email) {
          self.setState({
            notification: "this email address has already been registered"
          }, () => {
            self.handleTouchTap();
          });
          return;
        }
      }
    })
    .fail((err) => {
      self.setState({
        notification: "sign up error! try again later."
      }, () => {
        self.handleTouchTap();
      });
      return;
    })
    console.log(data);
  }

  handleTouchTap (e) {
    this.setState({
      open: true,
    });
  };

  handleRequestClose (e) {
    this.setState({
      open: false,
    });
  };

  render () {
    let style = {
      width: "100%"
    };

    return (
      <div className="t-sign-up">
        <form action="/t-sign-up">
          <TextField id="t-first-name" type="text" floatingLabelText="First Name"></TextField>
          <br/>
          <TextField id="t-last-name" type="text" floatingLabelText="Last Name"></TextField>
          <br/>
          <TextField id="t-email" type="email" floatingLabelText="email address"></TextField>
          <br/>
          <TextField id="t-password" type="password" floatingLabelText="password"></TextField>
          <br/>
          <TextField id="t-re-password" type="password" floatingLabelText="repeat password"></TextField>
          <br/>
          <br/>
          <br/>
          <FlatButton type="submit" label="Sign Up" primary={true} style={style} onClick={this.handleSubmit.bind(this)}></FlatButton>
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

export default TSignUp;
