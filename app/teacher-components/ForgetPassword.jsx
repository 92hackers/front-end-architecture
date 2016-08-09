
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
      api.TReqReset(email, "", "",
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
        <EmailInputBox id="forget-password-email-box" handle={this.handleSubmit.bind(this)}></EmailInputBox>
      </div>
    )
  }
}

export default ForgetPassword;
