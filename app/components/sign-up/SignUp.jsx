// sign up component.

import React from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

class SignUp extends React.Component {

  constructor (props) {
    super (props);
  }

  handleSubmit () {
    console.log("haha");
  }

  render () {
    return (
      <section className="sign-up">
        <form action="/submit-form">
          <TextField floatingLabelText="手机号码" type="text"></TextField>
          <br/>
          <FlatButton label="获取验证码" id="captcha"></FlatButton>
          <br/>
          <TextField floatingLabelText="验证码" type="text"></TextField>
          <br/>
          <TextField floatingLabelText="密码" type="password"></TextField>
          <br/>
          <TextField floatingLabelText="再输一遍密码" type="password" id="repeat-password"></TextField>
          <br/>
          <br/>
          <br/>
          <FlatButton type="submit" label="注册" className="submit-form" primary={true} onClick={this.handleSubmit}></FlatButton>
        </form>
      </section>
    )
  }
}

export default SignUp;
