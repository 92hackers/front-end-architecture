// site Header.

import React from 'react';
import {Link} from 'react-router';


class SiteHeader extends React.Component {

  constructor (props) {
    super (props);
  }

  render () {
    return (
      <header className="site-header">
        <div className="container">
          <span className="brand"><Link to={`/`}>homepage</Link></span>
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
        </div>
      </header>
    )
  }
};

export default SiteHeader;
