import React from 'react';

export default function DisplayUserStatus(props) {
  const { profile } = props
  const { status } = profile
  let content = ''
  switch (status) {
    case 3 :
      content = (
        <div className="show-interview-time">
          <p>Your interview is scheduled for: </p>
          <div className="content">
            <small><span>{profile.timezone_name}</span></small>
            <p>{profile.interview}</p>
          </div>
        </div>
      );
      break;
    case 4 :
      content = (
        <div>
          <p>You have passed the interview. Please wait for your final approval!</p>
        </div>
      )
      break;
    case 8 :
      /* eslint max-len: [0] */
      content = (
        <div>
          <p>Thanks again for joining us for the interview. We appreciate your time.</p>
          <p>The field was very competitive and, unfortunately, we will not be able to match you with students at this time.</p>
        </div>
      )
      break;
    default:
      content = null
  }

  return (
    <div className="display-user-status">
      {content}
    </div>
  )
}
