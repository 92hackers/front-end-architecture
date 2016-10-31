/*
*/
import React from 'react';
import Snackbar from 'material-ui/Snackbar';

export default function Notification(props) {
  const style = {
    fontWeight: 'bold',
    textAlign: 'center',
  };

  const { isShow, message, hideNotification } = props;

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
