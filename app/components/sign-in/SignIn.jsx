import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class SignIn extends React.Component {

  constructor (props) {
    super (props);
  }

  handleSubmit (e) {
    // sign in logic.k
  }

  render () {
    var style = {
      width: "100%"
    };

    return (
      <section className="sign-in">
        <form action="/sign-in" method="post">
          <TextField floatingLabelText="手机号码" type="text"></TextField>
          <br/>
          <TextField floatingLabelText="密码" type="password"></TextField>
          <br/>
          <br/>
          <br/>
          <RaisedButton type="submit" label="登录" primary={true} style={style}></RaisedButton>
          <RaisedButton onClick={this.wechatLogin} primary={true} style={style}>微信登录</RaisedButton>
        </form>
      </section>
    )
  }
}

export default SignIn;
