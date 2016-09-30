//  a page tells user to activate the account.
import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { browserHistory } from 'react-router';
import api from '../network/api';

class ActivateEmailComp extends React.Component {

  constructor (props) {
    super (props);
  }

  componentWillMount () {
    var queryParam = this.props.location.query["user_name"];
    console.log(queryParam);
    if (queryParam !== "s@x^nil*@(<)") {
      browserHistory.push("/sign-in");
    }
  }

  handleChangeClick (e) {

    e.preventDefault();

    var token = this.props.token;

    if (!!token) {
      browserHistory.push("/input-new-email");        // check state to judge if the user logged in.
    } else {
      browserHistory.push("/sign-in?action=changeEmailAddress");
    }

  }

  handleResendClick (e) {
    e.preventDefault();

    var self = this;
    var token = this.props.token;

    if (!!token) {
      api.TNewEmail("",
        {"Authorization": token},
        "",
        (resp) => {
          if (resp.success) {
            self.props.showNotification("A New Email Has Already Been Sent To Your Registered Email Address");
          } else {
            self.props.showNotification(resp.data.error);
          }
        },
        (err) => {
          self.props.networkError();
        }
      )
    } else {
      browserHistory.push("/sign-in?action=resendEmail");
    }

  }

  render () {

    const buttonStyles = {
      marginLeft: "10px",
      marginRight: "10px",
    };

    return (
      <div className="t-activate-email">
        <p><i className="fa fa-check-circle"></i> Thank you!</p>
        <p>We have sent an email to your registered email address.</p>
        <p>Please check your email for the verification link.</p>
        <p style={{marginTop: "50px"}}>If you did not receive the email:</p>
        <div style={{marginTop: "20px"}}>You may<RaisedButton style={buttonStyles} label="resend the email" onClick={this.handleResendClick.bind(this)}></RaisedButton> or <RaisedButton style={buttonStyles} label="change the email address" onClick={this.handleChangeClick.bind(this)}></RaisedButton></div>
      </div>
    )
  }
}

export default ActivateEmailComp;
