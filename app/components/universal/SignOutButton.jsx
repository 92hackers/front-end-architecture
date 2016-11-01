import React from 'react';
import { browserHistory } from 'react-router';

export default class SignOutButton extends React.Component {

  handleSignOut(e) {
    e.preventDefault()
    this.props.signOut()
    browserHistory.push('/')
  }

  render() {
    const { className, style } = this.props
    const classNames = `header-item ${className}`
    return (
      <li className={classNames} style={style}>
        <a href="#" className="sign-out" onTouchTap={this.handleSignOut}><i className="fa fa-sign-out" /> Sign out</a>
        <span className="nav-border-line" />
      </li>
    )
  }

}
