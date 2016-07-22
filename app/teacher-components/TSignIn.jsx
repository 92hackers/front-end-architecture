import React from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

class TSignIn extends React.Component {

  constructor (props) {
    super (props);
  }

  handleSubmit(e) {

  }


  render () {
    var style = {
      width: "100%"
    };

    return (
      <div className="teacher-sign-in">
        <form action="/teacher-sign-in" method="post" className="sign-in-form">
          <TextField type="email" floatingLabelText="email address"></TextField>
          <br/>
          <TextField type="password" floatingLabelText="password"></TextField>
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
