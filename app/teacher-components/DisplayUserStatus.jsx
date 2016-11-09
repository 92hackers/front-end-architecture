import React from 'react';
import api from '../network/api';
import { browserHistory } from 'react-router'
import RaisedButton from 'material-ui/RaisedButton'
import SiteLoading from '../containers/SiteLoading';

class DisplayUserStatusComp extends React.Component {

  constructor (props) {
    super (props);
  }

  handleReschedule(e) {
    e.preventDefault()
    browserHistory.replace('/step-to-sign-up?reschedule=true')
  }

  getOutput (profile) {
    var status = profile.status;

    switch(status) {
      case 3 :
      return (
        <div className="show-interview-time">
          <p>Your interview is scheduled for: </p>
          <div className="content">
            <small><span>{profile["timezone_name"]}</span></small>
            <p>{profile.interview}</p>
          </div>
          <div className="reschedule">If you would like to propose a different time, please click <RaisedButton style={{marginLeft: 10}} primary label='Reschedule' onClick={this.handleReschedule.bind(this)}/></div>
        </div>
      );
        break;
      case 4 :
        return (<div><p>You have passed the interview. Please wait for your final approval!</p></div>);
        break;
      case 8 :
        return (<div><p>Thanks again for joining us for the interview. We appreciate your time.</p><p>The field was very competitive and, unfortunately, we will not be able to match you with students at this time.</p></div>);
        break;
    }

  }

  render () {
    var profile = this.props.profile;
    var content = !this.props.pendingCounter ? this.getOutput(profile) : <SiteLoading></SiteLoading>;

    return (
      <div className="display-user-status">
        {content}
      </div>
    )
  }

}

export default DisplayUserStatusComp;
