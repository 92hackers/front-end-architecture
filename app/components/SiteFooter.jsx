// global site footer.

import React from 'react';

class SiteFooter extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <footer>
        <ul className="footer-items">
          <li className="item"><a href="/about">关于我们</a></li>
          <li className="item"><a href="/contact">联系我们</a></li>
          <li className="item"><a href="/join">加入我们</a></li>
          <li className="item"><a href="/business">商业合作</a></li>
          <li className="item"><a href="/questions">常见问题</a></li>
        </ul>
        <a href="http://teacher.weteach.info" id="teach-in-weteach">Teach in Weteach</a>
      </footer>
    )
  }
};

export default SiteFooter;
