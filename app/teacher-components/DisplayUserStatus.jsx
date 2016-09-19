
import React from 'react';
import {connect} from 'react-redux';
import api from '../network/api';
import Loading from '../universal/Loading';

class DisplayUserStatusClass extends React.Component {

  constructor (props) {
    super (props);
    this.state = {
      dataIsReady: false,
      profile: {}
    };
  }

  componentWillMount () {
    var token = this.props.token;
    var self = this;

    var profileRequest = api.TGetProfile(
      "",
      { "Authorization": token },
      "",
      (resp) => {
        self.setState({
          dataIsReady: true
        });
        if (resp.success) {
          self.setState({
            profile: resp.data
          });
        } else {
          console.log("some thing wrong.");
          alert("some thing wrong.");
        }
      },
      (err) => {
        alert("network is busy, please try again later");
        console.log("network is busy, please try again later");
      }
    );

  }

  getOutput (profile) {
    var status = profile.status;
    switch(status) {
      case 3 :
        return (<div><p>Your Interview time: </p><p>{profile.interview}</p></div>);
        break;
      case 4 :
        return (<div><p>You have passed the interview, Please wait for your final approval!</p></div>);
        break;
      case 8 :
        return (<div><p>Unfortunate, Your application denied by WeTeach.</p><p>Thanks for your love for WeTeach, GoodBye!</p></div>);
        break;
    }
  }

  render () {
    var profile = this.state.profile;
    var dataIsReady = this.state.dataIsReady;
    var content = dataIsReady ? this.getOutput(profile) : <Loading dataIsReady={dataIsReady}></Loading>;

    return (
      <div className="display-user-status">
        {content}
      </div>
    )
  }

  componentDidMount () {

  }

}

const mapStateToProps = (state) => {
  return {
    token: state.addToken.token
  }
}

const DisplayUserStatus = connect(
  mapStateToProps
)(DisplayUserStatusClass);

export default DisplayUserStatus;
