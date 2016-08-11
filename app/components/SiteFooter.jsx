// global site footer.

import React from 'react';
import {Link} from 'react-router';

class SiteFooter extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <footer>
        <ul className="footer-items">
          <li className="item"><Link to="/about">About Us</Link></li>
          <li className="item"><a href="mailto:teacher@weteach.info">Contact Us</a></li>
          <li className="item"><Link to="/join">Join Us</Link></li>
          <li className="item"><Link to="/business">Business</Link></li>
          <li className="item"><Link to="/questions">Help</Link></li>
        </ul>
      </footer>
    )
  }
};

export default SiteFooter;
