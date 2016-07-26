import React from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import reqwest from 'reqwest';

class TSignIn extends React.Component {

  constructor (props) {
    super (props);
  }

  handleSubmit(e) {

    let event = e || e.event;
    if (event.preventDefault) {
      event.preventDefault();
    } else if (event.cancelBubble) {
      event.cancelBubble();
    }

    var email = document.getElementById("t-email").value;
    var password = document.getElementById("t-password").value;

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
      console.log(resp);
    })
    .fail((err) => {
      console.log("error");
    });

  }


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
          <FlatButton type="submit" label="Sign in" primary={true} onClick={this.handleSubmit} style={style}></FlatButton>
          <FlatButton label="sign in with facebook" style={style}></FlatButton>
          <FlatButton label="sign in with google" style={style}></FlatButton>
          <FlatButton label="sign in with twitter" style={style}></FlatButton>
        </form>
      </div>
    )
  }
}

export default TSignIn;
