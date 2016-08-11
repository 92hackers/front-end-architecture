
import React from 'react';
import EmailInputBox from '../utilities/EmailInputBox';
import api from '../network/api';

class ForgetPassword extends React.Component {

  constructor (props) {
    super (props);
  }

  handleSubmit (e) {
    e.preventDefault();

    var email = document.getElementById("forget-password-email-box").value;

    if (!!email.length) {
      console.log(email);
      api.TReqReset({email: email}, "", "",
      (resp) => {
        if (resp.success) {
          alert("we have already send an email to your email box, you can click the link in it to input your new password");
        } else {
          alert("send email failed, try again later.");
        }
      },
      (err) => {
        console.log(err);
        console.log("network is busy, try again later.");
      }
    )
    } else {
      alert("please input email.");
    }
  }

  render () {
    return (
      <div className="forget-password">
        <h1 className="text-center">Enter your email address</h1>
        <h1 className="text-center">and we will send you a link to reset your password</h1>
        <EmailInputBox submitText="Send password reset email" id="forget-password-email-box" handle={this.handleSubmit.bind(this)}></EmailInputBox>
      </div>
    )
  }

}

export default ForgetPassword;
