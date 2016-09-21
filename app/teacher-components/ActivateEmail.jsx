//  a page tells user to activate the account.
import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import api from '../network/api';
import Notification from '../universal/Notification';

class ActivateEmailClass extends React.Component {

  constructor (props) {
    super (props);
    this.state = {
      notification: ""
    };
  }

  componentWillMount () {
    var queryParam = this.props.location.query["user_name"];
    if (!queryParam) {
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

  notify (message) {
    if (!!message.length) {
      this.setState({
        notification: message
      }, () => {
        this.refs.notification.handleNotificationOpen();
      });
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
            self.notify("A New Email Has Already Been Sent To Your Registered Email Address");
          } else {
            self.notify(resp.data.error);
          }
        },
        (err) => {
          self.notify("Network Is Busy, Please Try Again Later.");
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
        <Notification message={this.state.notification} ref="notification"></Notification>
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
