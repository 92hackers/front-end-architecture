import React from 'react';
import api from '../network/api';
import SiteLoading from '../containers/SiteLoading';

class DisplayUserStatusComp extends React.Component {

  constructor (props) {
    super (props);
  }

  getOutput (profile) {
    var status = profile.status;

    switch(status) {
      case 3 :
        return (<div>
          <p>Your interview is scheduled for: </p>
          <p>your time zone: <span style={{marginLeft: 20}}>{profile["timezone_name"]}</span></p>
          <p>{profile.interview}</p>
        </div>);
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
