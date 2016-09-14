
import React from 'react';
import {browserHistory} from "react-router";

class Auth extends React.Component {

  constructor (props) {
    super (props);
  }

  componentWillMount () {
    var token = localStorage.getItem("user_token");

    if (!!token) {
      browserHistory.push("/teacher-homepage");
    } else {
      browserHistory.push("/sign-in");
    }

  }

  render () {
    return (
      <div></div>
    )
  }
}

export default Auth;
