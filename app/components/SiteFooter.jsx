// global site footer.
import React from 'react';

const SiteFooter = () => (
  <footer className="container" style={{ textAlign: 'right' }}>
    <ul className="footer-items">
      <li className="contact-item">
        <i className="fa fa-user" />
        <a href="mailto:teacher@weteach.info" rel="noopener noreferrer" target="_blank">
          Contact Us
        </a>
      </li>
      <li className="contact-item">
        <i className="fa fa-facebook-official" />
        <a href="https://www.facebook.com/WeTeach.YiYou" rel="noopener noreferrer" target="_blank">
          Facebook Page
        </a>
      </li>
      <li className="contact-item">
        <i className="fa fa-linkedin-square" />
        <a href="http://www.linkedin.com/company/10665592" rel="noopener noreferrer" target="_blank">
          LinkedIn
        </a>
      </li>
    </ul>
    <ul id="beian">
      <li>&copy;&nbsp;2016 WeTeach. All Rights Reserved</li>
    </ul>
  </footer>
)

export default SiteFooter
