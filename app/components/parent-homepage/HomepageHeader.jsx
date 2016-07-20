//  home page header.

import React from 'react';

class HomepageHeader extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <header className="parent-homepage-header">
        <span className="logo">
          <img src="" alt="weteach logo"/>
        </span>
        <ul className="homepage-list">
          <li>
            <a href="javascript:;"></a>
          </li>
          <li>
            <a href="javascript:;"></a>
          </li>
          <li>
            <a href="javascript:;"></a>
          </li>
        </ul>
      </header>
    )
  }
}

export default HomepageHeader;
