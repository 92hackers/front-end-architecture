
/*
  props:
    id.
    handle:   handle function to submit.
*/

import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';


class EmailInputBox extends React.Component {

  constructor (props) {
    super (props);
  }

  render () {
    var labelStyle = {
      color: "#666666",
      fontWeight: "bold"
    };
    return (
      <form>
        <TextField floatingLabelStyle={labelStyle} name="Email" id={this.props.id} type="email" floatingLabelText="Enter your email address"></TextField>
        <br/>
        <br/>
        <RaisedButton type="submit" label={this.props.submitText} primary={true} onClick={this.props.handle} style={{width: "100%"}}></RaisedButton>
      </form>
    )
  }
}

export default EmailInputBox;
