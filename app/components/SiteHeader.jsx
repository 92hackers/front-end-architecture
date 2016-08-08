// site Header.

import React from 'react';
import {Link} from 'react-router';


class SiteHeader extends React.Component {

  constructor (props) {
    super (props);
  }

  render () {
    return (
      <header className="site-header clearfix">
        <span className="brand"><img src="" alt="site logo" className="logo"/></span>
        <ul className="header-item-right">
          <li>
            <a href="javascript:;">微信服务号</a>
          </li>
          <li>
            <a href="javascript:;">免费试听课</a>
          </li>
          <li className="button-wrap">
            <Link to={`/sign-in`} className="sign-in button">Sign in</Link>
          </li>
          <li className="button-wrap">
            <Link to={`/sign-up`} className="sign-up button">Sign up</Link>
          </li>
        </ul>
      </header>
    )
  }
};

export default SiteHeader;
