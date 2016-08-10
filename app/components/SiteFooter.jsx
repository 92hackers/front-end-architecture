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
          <li className="item"><Link to="/about">关于我们</Link></li>
          <li className="item"><Link to="/contact">联系我们</Link></li>
          <li className="item"><Link to="/join">加入我们</Link></li>
          <li className="item"><Link to="/business">商业合作</Link></li>
          <li className="item"><Link to="/questions">常见问题</Link></li>
        </ul>
        <a href="http://teacher.weteach.info" id="teach-in-weteach">Teach in Weteach</a>
      </footer>
    )
  }
};

export default SiteFooter;
