import React from 'react'
import { browserHistory } from 'react-router';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

export default class UserSettings extends React.Component {

  handleSubmit(e) {
    e.preventDefault();
    const { showNotification, updatePassword } = this.props

    const oldPassword = document.getElementById('old-password').value
    const newPassword = document.getElementById('new-password').value
    const confirmPassword = document.getElementById('confirm-password').value

    /* eslint max-len: 0 */
    let warning = '';
    if (!oldPassword || !newPassword || !confirmPassword) {
      warning = 'Please input correct password.';
    } else if (oldPassword.length < 6 || newPassword.length < 6 || confirmPassword.length < 6 || oldPassword.length > 20 || newPassword.length > 20 || confirmPassword.length > 20) {
      warning = 'Passwords must be between 6 and 20 characters in length.';
    } else if (newPassword !== confirmPassword) {
      warning = 'New passwords do not match.';
    }

    if (warning.length > 0) {
      showNotification(warning);
      return;
    }

    const data = {
      o_pass: oldPassword,
      n_pass: newPassword,
      rn_pass: confirmPassword,
    };

    updatePassword(data).then((res) => {
      const { success, data: resData } = res.payload
      if (success) {
        showNotification('Password change successful. Please wait for refreshing.');
        const timeId = setTimeout(() => {
          clearTimeout(timeId);
          self.props.signOut();
          browserHistory.push('/sign-in');
        }, 4100);
      } else if (resData.o_pass && resData.o_pass.length > 0) {
        showNotification('Old password is incorrect.');
      } else {
        showNotification('Please input correct passwords.');
      }
    })
  }

  render() {
    const labelStyle = {
      color: '#666666',
      fontWeight: 'bold',
    };

    return (
      <section className="setting-dashboard dashboard">
        <h1 className="text-center">Change Password</h1>
        <form>
          <TextField floatingLabelStyle={labelStyle} floatingLabelText="Old Password" id="old-password" type="password" />
          <TextField floatingLabelStyle={labelStyle} floatingLabelText="New Password" id="new-password" type="password" />
          <TextField floatingLabelStyle={labelStyle} floatingLabelText="Confirm Password" id="confirm-password" type="password" />
          <br />
          <br />
          <RaisedButton onTouchTap={this.handleSubmit} label="Submit" primary style={{ width: '100%' }} />
        </form>
      </section>
    )
  }
}
