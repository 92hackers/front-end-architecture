//  a page tells user to activate the account.

import React from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

class ActivateEmail extends React.Component {

  constructor (props) {
    super (props);
  }

  handleSubmit (e) {
    // something to go.
  }

  render () {

    var style = {
      width: "100%"
    };

    return (
      <div className="t-activate-email">
        <p>We have already sended an email to your registered email address,</p>
        <p>Please check your email for the verification link.</p>
        <p>Or</p>
        <p>Something wrong! Please fill in another email address, and we will try it again!</p>
        <form action="/re-email">
          <TextField type="email" floatingLabelText="email address"></TextField>
          <FlatButton type="submit" label="Submit" primary={true} onClick={this.handleSubmit} style={style}></FlatButton>
        </form>
      </div>
    )
  }
}

export default ActivateEmail;
