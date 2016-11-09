
import React from 'react';
import {Link} from 'react-router';
import SignOutButton from '../universal/SignOutButton';
import api from '../network/api';

class IndexHeaderComp extends React.Component {

  constructor (props) {
    super (props);
  }

  render () {
    var dynamicContent = "";

    const {token, status: userStatus, examined: examined} = this.props;

    if (!!token) {
      switch (userStatus) {
        case 2:
          dynamicContent = (
            <ul className="right">
              <li><Link to="/step-to-sign-up" className="primary-button">Application</Link></li>
              <SignOutButton className="primary-button" style={{lineHeight: "39px", marginTop: "10px"}}></SignOutButton>
            </ul>
          );
          break;
        case 3:
        case 4:
        case 5:
          if (!!examined) {
            dynamicContent = (
              <ul className="right">
                <li><Link to="/teacher-homepage" className="primary-button">My Homepage</Link></li>
                <SignOutButton className="primary-button" style={{lineHeight: "39px", marginTop: "10px"}}></SignOutButton>
              </ul>
            );
          } else {
            dynamicContent = (
              <ul className="right">
                <li><Link to="/teacher-online-test" className="primary-button">Online Test</Link></li>
                <SignOutButton className="primary-button" style={{lineHeight: "39px", marginTop: "10px"}}></SignOutButton>
              </ul>
            );
          }
          break;
        case 10:
        case 11:
        case 15:
          dynamicContent = (
            <ul className="right">
              <li><Link id="homepage" to="/teacher-homepage" className="primary-button">My Homepage</Link></li>
              <SignOutButton className="primary-button" style={{lineHeight: "39px", marginTop: "10px"}}></SignOutButton>
            </ul>
          );
          break;
        default:
          dynamicContent = <ul className="right"><SignOutButton className="primary-button" style={{lineHeight: "39px", marginTop: "10px"}}></SignOutButton></ul>;
          break;
      }
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

export default IndexHeaderComp;
