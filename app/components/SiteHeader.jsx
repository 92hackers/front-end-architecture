// site Header.

import React from 'react';


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
            <a href="javascript:;" className="sign-in button">登录</a>
          </li>
          <li className="button-wrap">
            <a href="javascript:;" className="sign-up button">注册</a>
          </li>
        </ul>
      </header>
    )
  }
};

export default SiteHeader;
