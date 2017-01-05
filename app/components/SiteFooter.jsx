// global site footer.
import React from 'react';
import FaLinkedinSquare from 'react-icons/lib/fa/linkedin-square'
import FaFacebookOfficial from 'react-icons/lib/fa/facebook-official'
import FaUser from 'react-icons/lib/fa/user'

const SiteFooter = () => (
  <footer className="container" style={{ textAlign: 'right' }}>
    <ul className="footer-items">
      <li className="contact-item">
        <FaUser className="fa fa-user" />
        <a href="mailto:teacher@weteach.info" rel="noopener noreferrer" target="_blank">
          Contact Us
        </a>
      </li>
      <li className="contact-item">
        <FaFacebookOfficial className="fa fa-facebook-official" />
        <a href="https://www.facebook.com/WeTeach.YiYou" rel="noopener noreferrer" target="_blank">
          Facebook Page
        </a>
      </li>
      <li className="contact-item">
        <FaLinkedinSquare className="fa fa-linkedin-square" />
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
