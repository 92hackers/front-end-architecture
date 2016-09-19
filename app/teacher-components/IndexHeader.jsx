
import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import SignOutButton from '../universal/SignOutButton';
import api from '../network/api';

class IndexHeaderClass extends React.Component {

  constructor (props) {
    super (props);
    this.state = {
      token: this.props.token,
      userStatus: "",
      dataIsReady: false
    };
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps !== this.props) {
      var token = nextProps.token;
      this.setState({
        token: token
      }, () => {
        if (!!token) {
          this.getProfileData(token);
        }
      });
    }
  }

  getProfileData (token) {
    var self = this;
    var profileRequest = api.TGetProfile(
      "",
      { "Authorization": token },
      "",
      (resp) => {
        if (resp.success) {
          self.setState({
            userStatus: resp.data.status,
            dataIsReady: true
          });
        } else {
          browserHistory.push("/sign-in");
          self.props.dispatch(removeToken());
        }
      },
      (err) => {
        console.log("network is busy, please try again later");
      }
    );
  }

  componentWillMount () {
    var token = this.state.token;

    if (!token) {
      return;
    } else {
      this.getProfileData(token);
    }

  }

  render () {
    var dynamicContent = "";
    const token = this.state.token;
    const userStatus = this.state.userStatus;

    if (!!token) {
      switch (userStatus) {
        case 10:
        case 11:
        case 15:
          dynamicContent = (
            <div>
              <Link className="primary-button" id="homepage" to={`/teacher-homepage`}>My Homepage</Link>
            </div>
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

const mapStateToProps = (state) => {
  return {
    token: state.addToken.token
  }
}

const IndexHeader = connect(
  mapStateToProps
)(IndexHeaderClass);

export default IndexHeader;
