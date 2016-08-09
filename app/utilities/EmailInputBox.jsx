
/*
  props:
    id.
    handle:   handle function to submit.
*/

import React from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';


class EmailInputBox extends React.Component {

  constructor (props) {
    super (props);
  }

  render () {
    return (
      <form>
        <TextField id={this.props.id} type="email" floatingLabelText="email address"></TextField>
        <FlatButton type="submit" label="Submit" primary={true} onClick={this.props.handle} style={{width: "100%"}}></FlatButton>
      </form>
    )
  }
}

export default EmailInputBox;
