import React from 'react'

class UserSettings extends React.Component {

  handleSubmit(e) {
    e.preventDefault();

    const self = this;
    const oldPassword = document.getElementById('old-password').value;
    const newPassword = document.getElementById('new-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

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
      this.props.showNotification(warning);
      return;
    }

    const data = {
      o_pass: oldPassword,
      n_pass: newPassword,
      rn_pass: confirmPassword,
    };

    api.ChangePassword(data,
      { "Authorization": this.props.token},
      "",
      (resp) => {
        if (resp.success) {
          self.props.showNotification("Password change successful. Please wait for refreshing.");
          var timeId = setTimeout(() => {
            clearTimeout(timeId);
            self.props.signOut();
            browserHistory.push("/sign-in");
          }, 4100);
        } else {
          let data = resp.data;
          if (data["o_pass"] && data["o_pass"].length > 0) {
            self.props.showNotification("Old password is incorrect.");
          } else {
            self.props.showNotification("Please input correct passwords.");
          }
        }
      },
      (err) => {
        self.props.networkError();
      }
    );

  }

  render () {
    var labelStyle = {
      color: "#666666",
      fontWeight: "bold"
    };
    return (
      <section className="setting-dashboard dashboard">
        <h1 className="text-center">Change Password</h1>
        <form>
          <TextField floatingLabelStyle={labelStyle} floatingLabelText="Old Password" id="old-password" type="password"></TextField>
          <TextField floatingLabelStyle={labelStyle} floatingLabelText="New Password" id="new-password" type="password"></TextField>
          <TextField floatingLabelStyle={labelStyle} floatingLabelText="Confirm Password" id="confirm-password" type="password"></TextField>
          <br/>
          <br/>
          <RaisedButton onTouchTap={this.handleSubmit.bind(this)} label="Submit" primary={true} style={{width: "100%"}}></RaisedButton>
        </form>
      </section>
    )
  }
}

export default UserSettings
