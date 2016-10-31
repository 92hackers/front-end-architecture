import React from 'react';
import SiteLoading from '../containers/SiteLoading';

class DisplayUserStatusComp extends React.Component {

  getOutput(profile) {
    const { status } = profile

    switch (status) {
      case 3 :
        return (
          <div className="show-interview-time">
            <p>Your interview is scheduled for: </p>
            <div className="content">
              <small><span>{profile.timezone_name}</span></small>
              <p>{profile.interview}</p>
            </div>
          </div>
        );
      case 4 :
        return (
          <div>
            <p>You have passed the interview. Please wait for your final approval!</p>
          </div>
        )
      case 8 :
      /* eslint max-len: [0] */
        return (
          <div>
            <p>Thanks again for joining us for the interview. We appreciate your time.</p>
            <p>The field was very competitive and, unfortunately, we will not be able to match you with students at this time.</p>
          </div>
        )
      default:
        return <div />
    }
  }

  render() {
    const { profile, pendingCounter } = this.props
    const content = !pendingCounter ? this.getOutput(profile) : <SiteLoading />;

    return (
      <div className="display-user-status">
        {content}
      </div>
    )
  }
}

export default DisplayUserStatusComp;
