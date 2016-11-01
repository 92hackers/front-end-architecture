/*
*/
import React from 'react';
import Snackbar from 'material-ui/Snackbar';

export default function Notification(props) {
  const { isShow, message, hideNotification } = props;

  const style = {
    fontWeight: 'bold',
    textAlign: 'center',
  };

  return (
    <Snackbar
      open={isShow}
      bodyStyle={style}
      message={message}
      autoHideDuration={3000}
      onRequestClose={hideNotification}
    />
  )
}
