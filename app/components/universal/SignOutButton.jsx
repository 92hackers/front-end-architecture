import React from 'react';
import FaSignOut from 'react-icons/lib/fa/sign-out'

export default function SignOutButton(props) {
  const { className, style, signOut } = props
  const classNames = `header-item ${className}`

  return (
    <li className={classNames} style={style}>
      <a href="#" className="sign-out" onTouchTap={signOut}><FaSignOut className="fa fa-sign-out" /> Sign out</a>
      <span className="nav-border-line" />
    </li>
  )
}
