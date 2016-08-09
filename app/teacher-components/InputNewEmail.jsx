import React from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import api from '../network/api';
import EmailInputBox from '../utilities/EmailInputBox';

class InputNewEmailClass extends React.Component {

  constructor (props) {
    super (props);
  }

  componentWillMount () {
    if (!this.props.token) {                // if the user not log in, redirect to sign in page.
      browserHistory.push("/sign-in");
    }
  }

  handleSubmit (e) {
    e.preventDefault();

    var email = document.getElementById("email-address").value;

    if (!!email.length) {
      api.TNewEmail(email,
        {"Authorization": this.props.token},
        "",
        (resp) => {
          if (resp.success) {
            browserHistory.push("/active-email");
          } else {
            alert(resp.data.error);
          }
        },
        (err) => {
          console.log(err);
          alert("server error, try again later.");
        }
    )
    } else {
      alert("please input your email address");
    }
  }

  render () {
    return (
      <div className="input-new-email">
        <EmailInputBox id="email-address" handle={this.handleSubmit.bind(this)}></EmailInputBox>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.addToken.token
  }
}

const InputNewEmail = connect(
  mapStateToProps
)(InputNewEmailClass);

export default InputNewEmail;
