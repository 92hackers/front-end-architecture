/*
  props:
    id.
    handle:   handle function to submit.
*/

import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

export default function EmailInputBox(props) {
  const labelStyle = {
    color: '#666666',
    fontWeight: 'bold',
  };

  const { id, submitText, handle } = props

  return (
    <form>
      <TextField
        floatingLabelStyle={labelStyle}
        name="Email"
        id={id}
        type="email"
        floatingLabelText="Enter your email address"
      />
      <br />
      <br />
      <RaisedButton
        type="submit"
        label={submitText}
        primary onClick={handle}
        style={{ width: '100%' }}
      />
    </form>
  )
}
