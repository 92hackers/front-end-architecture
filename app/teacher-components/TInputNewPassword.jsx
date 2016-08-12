import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {browserHistory} from 'react-router';
import Notification from '../utilities/Notification';
import api from '../network/api';

class TInputNewPassword extends React.Component {

  constructor(props) {
    super (props);
    this.state = {
      notification: ""
    };
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

  handleSubmit (e) {

    e.preventDefault();

    var self = this;
    var password = document.getElementById("new-password").value;
    var rePassword = document.getElementById("confirm-password").value;

    var resetToken = this.props.location.query.token;

     if (!!password || !!rePassword) {

       if (password === rePassword) {

         let data = {
           token: resetToken,
           password: password
         };

         api.TReset(data, "", "",
         (resp) => {
           if (resp.success) {
             self.notify("Reset Password Successfully! Wait To Refresh");
             var timeId = setTimeout(() => {
               clearTimeout(timeId);
               browserHistory.push("/sign-in");
             }, 4100);
           } else {
             self.notify("Something Wrong, Please Try Again Later");
           }
         },
         (err) => {
           self.notify("Network Is Busy, Please Try Again Later");
         }
       );
     } else {
       self.notify("Please Input Correct Passwords");
     }
   } else {
     self.notify("Please Input Your New Password");
    }
  }

  render () {
    return (
      <div className="t-input-new-password">
        <form>
          <TextField id="new-password" type="password" floatingLabelText="new password"></TextField>
          <TextField id="confirm-password" type="password" floatingLabelText="confirm password"></TextField>
          <RaisedButton label="Submit" primary={true} onClick={this.handleSubmit.bind(this)} style={{width: "100%"}}></RaisedButton>
        </form>
        <Notification message={this.state.notification} ref="notification"></Notification>
      </div>
    )
  }
}

export default TInputNewPassword;
