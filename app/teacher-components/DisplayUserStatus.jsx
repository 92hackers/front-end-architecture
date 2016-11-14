import React from 'react';
import api from '../network/api';
import { browserHistory } from 'react-router'
import RaisedButton from 'material-ui/RaisedButton'
import SiteLoading from '../containers/SiteLoading';
import {blue500} from 'material-ui/styles/colors';

class DisplayUserStatusComp extends React.Component {

  constructor (props) {
    super (props);
  }

  handleReschedule(e) {
    e.preventDefault()
    browserHistory.replace('/step-to-sign-up?reschedule=true')
  }

  getOutput (profile) {
    const { status, interview } = profile
    const interviewArr = interview.split(';')

    switch(status) {
      case 3:
      case 4:
        return (
          <div className="show-interview-time">
            <p>Your interview is scheduled for: </p>
            <div className="content">
              <small><span>{interviewArr[1]}</span></small>
              <p>{interviewArr[0]}</p>
            </div>
            <div className="reschedule">If you would like to propose a different time, please click <RaisedButton style={{marginLeft: 10}} primary label='Reschedule' onClick={this.handleReschedule.bind(this)}/></div>
          </div>
        );
      case 5:
        return (
          <div>
            <p>You have passed your interview.</p>
            <p>We look forward to seeing you at the New Teacher Orientation.</p>
            <p>Please <a style={{color: blue500, textDecoration: 'underline'}} href="https://docs.google.com/forms/d/e/1FAIpQLSft67hXHtMU5mh5EyuY9lT_gynzLb3uotwoUciTyBkWIYYDuw/viewform" target="_blank">RSVP</a>.</p>
          </div>
        );
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
