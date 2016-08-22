
import React from 'react';
import {Link} from 'react-router';

class IndexHeader extends React.Component {

  constructor (props) {
    super (props);
  }

  render () {
    return (
      <header className="t-index-header container">
        <Link className="logo left" to="/step-to-sign-up">WeTeach</Link>
        <div className="sign-buttons right">
          <Link id="sign-up" to={`/sign-up`}>Sign Up</Link>
          <Link id="sign-in" to={`/sign-in`}>Sign In</Link>
        </div>
      </header>
    )
  }
}

export default IndexHeader;
