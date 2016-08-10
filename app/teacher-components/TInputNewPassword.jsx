import React from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
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

  handleSubmit (e) {

    e.preventDefault();

    var self = this;
    var password = document.getElementById("new-password").value;
    var rePassword = document.getElementById("confirm-password").value;

    var resetToken = this.props.location.query.token;

     // TODO: get reset password token from url.

     if (!!password || !!rePassword) {

       if (password === rePassword) {

         let data = {
           token: resetToken,
           password: password
         };

         api.TReset(data, "", "",
         (resp) => {
           if (resp.success) {
             self.setState({
               notification: "reset password successfully! wait to reload."
             }, () => {
               self.refs.notification.handleNotificationOpen();
             });
             var timeId = setTimeout(() => {
               clearTimeout(timeId);
               browserHistory.push("/sign-in");
             }, 4100);
           } else {
             alert("some wrong, please try again later.");
           }
         },
         (err) => {
           console.log(err);
           alert("network is busy, please try again later.");
         }
       );
     } else {
       self.setState({
         notification: "please input correct passwords"
       }, () => {
         self.refs.notification.handleNotificationOpen();
       });
     }
   } else {
       alert("please input your new password");
     }

  }

  render () {
    return (
      <div className="t-input-new-password">
        <form>
          <TextField id="new-password" type="password" floatingLabelText="new password"></TextField>
          <TextField id="confirm-password" type="password" floatingLabelText="confirm password"></TextField>
          <FlatButton label="Submit" primary={true} onClick={this.handleSubmit.bind(this)} style={{width: "100%"}}></FlatButton>
        </form>
        <Notification message={this.state.notification} ref="notification"></Notification>
      </div>
    )
  }
}

export default TInputNewPassword;
