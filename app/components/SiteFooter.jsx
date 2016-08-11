// global site footer.

import React from 'react';

class SiteFooter extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <footer className="container" style={{textAlign: "right"}}>
        <ul className="footer-items">
          <li className="item"><a href="mailto:teacher@weteach.info">Contact us</a></li>
          <li className="item">
            <a target="_blank" href="https://www.facebook.com/WeTeach.YiYou">
              <i className="fa fa-facebook-official"></i>
            </a>
          </li>
        </ul>
        <ul id="beian">
          <li> &copy;&nbsp;2016 WeTeach. All Rights Reserved</li>
        </ul>
      </footer>
    )
  }
};

export default SiteFooter;
