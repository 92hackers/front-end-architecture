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
          <li className="contact-item">
            <i className="fa fa-user"></i>
            <a href="mailto:teacher@weteach.info" target="_blank">Contact us</a>
          </li>
          <li className="contact-item">
            <i className="fa fa-facebook-official"></i>
            <a href="https://www.facebook.com/WeTeach.YiYou" target="_blank">Facebook Page</a>
          </li>
          <li className="contact-item">
            <i className="fa fa-linkedin-square"></i>
            <a href="http://www.linkedin.com/company/10665592" target="_blank">LinkedIn</a>
          </li>
        </ul>
        <ul id="beian">
          <li>&copy;&nbsp;2016 WeTeach. All Rights Reserved</li>
        </ul>
      </footer>
    )
  }
};

export default SiteFooter;
