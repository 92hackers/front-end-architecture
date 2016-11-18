import React from 'react';

export default function SignOutButton(props) {
  console.log(props);
  const { className, style, signOut } = props
  const classNames = `header-item ${className}`

  return (
    <li className={classNames} style={style}>
      <a href="#" className="sign-out" onTouchTap={signOut}><i className="fa fa-sign-out" /> Sign out</a>
      <span className="nav-border-line" />
    </li>
  )
}
