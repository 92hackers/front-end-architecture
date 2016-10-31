// authorization component.

import React from 'react';
import { browserHistory } from 'react-router';

class Auth extends React.Component {

  componentWillMount() {
    const token = localStorage.getItem('user_token');

    if (token) {
      browserHistory.push('/teacher-homepage');
    } else {
      browserHistory.push('/sign-in');
    }
  }

  render() {
    return (
      <div />
    )
  }
}

export default Auth;
