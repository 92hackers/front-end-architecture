//  a page tells user to activate the account.
import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import api from '../network/api';

class ActivateEmailClass extends React.Component {

  constructor (props) {
    super (props);
  }

  handleChangeClick (e) {

    e.preventDefault();

    var token = this.props.token;
    console.log(token);

    if (!!token) {
      browserHistory.push("/input-new-email");        // check state to judge if the user logged in.
    } else {
      browserHistory.push("/sign-in?action=changeEmailAddress");
    }
  }

  handleResendClick (e) {
    e.preventDefault();

    var token = this.props.token;
    console.log(this.props);
    console.log(token);

    if (!!token) {
      api.TNewEmail("",
      {"Authorization": token},
      "",
      (resp) => {
        if (resp.success) {
          alert("a new email has already send to your registered email address");
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
    browserHistory.push("/sign-in?action=resendEmail");
  }

}

  render () {
    return (
      <div className="t-activate-email">
        <p><i className="fa fa-check-circle"></i> We have already sended an email to your registered email address,</p>
        <p>Please check your email for the verification link.</p>
        <p>Didn't receive the email yet?</p>
        <div>You can: <RaisedButton label="Resend the email" onClick={this.handleResendClick.bind(this)}></RaisedButton> or <RaisedButton label="Change the email address" onClick={this.handleChangeClick.bind(this)}></RaisedButton></div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.addToken.token
  }
}

const ActivateEmail = connect(
  mapStateToProps
)(ActivateEmailClass);

export default ActivateEmail;
