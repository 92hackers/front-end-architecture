
import React from 'react';
import {Link} from 'react-router';

class IndexHeader extends React.Component {

  constructor (props) {
    super (props);
  }

  render () {
    var dynamicContent = "";
    const token = localStorage.getItem("user_token");

    if (!!token) {
      dynamicContent = (
        <div>
          <Link className="primary-button" id="homepage" to={`/teacher-homepage`}>My Homepage</Link>
        </div>
      );
    } else {
      dynamicContent = (
        <div>
          <Link className="primary-button" id="sign-up" to={`/sign-up`}>Sign Up</Link>
          <Link id="sign-in" to={`/sign-in`}>Sign In</Link>
        </div>
      );
    }

    return (
      <header className="t-index-header container">
        <Link className="logo left" to="/">WeTeach</Link>
        <div className="sign-buttons right">
          {dynamicContent}
        </div>
      </header>
    )
  }

}

export default IndexHeader;
