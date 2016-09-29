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
        return (<div><p>Your Interview is scheduled for: </p><p>{profile.interview}</p></div>);
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
