import React from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

class TSignUp extends React.Component {

  constructor (props) {
    super (props);
  }

  handleSubmit (e) {
    let event = e || e.event;
    if (event.preventDefault) {
      event.preventDefault();
    } else if (event.cancelBubble) {
      event.cancelBubble();
    }
    var emailValue = document.getElementById("t-email").value;
    var passwordValue = document.getElementById("t-password").value;
    var rePasswordValue = document.getElementById("t-re-password").value;

    var data = {
      email: emailValue,
      password: passwordValue
    };

    console.log(data);
  }

  render () {
    let style = {
      width: "100%"
    };

    return (
      <div className="t-sign-up">
        <form action="/t-sign-up">
          <TextField id="t-email" type="email" floatingLabelText="email address"></TextField>
          <br/>
          <TextField id="t-password" type="password" floatingLabelText="password"></TextField>
          <br/>
          <TextField id="t-re-password" type="password" floatingLabelText="repeat password"></TextField>
          <br/>
          <br/>
          <br/>
          <FlatButton type="submit" label="Sign Up" primary={true} style={style} onClick={this.handleSubmit}></FlatButton>
        </form>
      </div>
    )
  }
}

export default TSignUp;
