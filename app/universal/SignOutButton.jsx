
import React from 'react';
import { connect } from 'react-redux';
import {browserHistory} from 'react-router';
import { userActions, dashboardActions } from '../actions';

class SignOutButtonClass extends React.Component {

  constructor (props) {
    super (props);
  }

  render () {
    var className = "header-item " + this.props.className;
    return (
      <li className={className} style={this.props.style}>
        <a href="javascript:;" className="sign-out" onTouchTap={this.handleSignOut.bind(this)}><i className="fa fa-sign-out"></i> Sign out</a>
        <span className="nav-border-line"></span>
      </li>
    )
  }

  handleSignOut(e) {
    e.preventDefault();
    this.props.dispatch(userActions.signOut());
    this.props.dispatch(dashboardActions.dashboardDisplay(""));
  }

}

var SignOutButton = connect()(SignOutButtonClass);

export default SignOutButton;
