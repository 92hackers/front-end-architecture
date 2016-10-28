// teacher's homepage.

import React from 'react';
import { browserHistory } from 'react-router';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import ScheduleCourse from './ScheduleCourse';
import OneWeekTemplate from '../universal/OneWeekTemplate';
import DisplayUserStatus from '../containers/DisplayUserStatus';

import SiteLoading from '../containers/SiteLoading';

class THomepage extends React.Component {

  constructor(props) {
    super (props);
    this.state = {
      tpl: {},
      hasTemplate: false,
      weeklyTimetable: {},
      monthlyTimetable: {}
    };
  }

  render() {
    const { profile, dashboard, signOut, showNotification, networkError } = this.props

    const genderIcon = profile.gender === 0 ? <i className="fa fa-venus" /> : <i className="fa fa-mars" />

    let teachingExperience = '';

    switch (profile.experience) {
      case 3 :
        teachingExperience = 'More than 15 years';
        break;
      case 2 :
        teachingExperience = 'Between 5 to 15 years';
        break;
      case 1 :
        teachingExperience = 'Less than 5 years';
        break;
      default:
        teachingExperience = 'Not clear.'
    }

    let DashboardComponent = '';

    var dynamicDashboardComp = this.props.dashboard;

    var newUser = profile.status < 11;

    switch (dynamicDashboardComp) {
      case 'setting':
        DashboardComponent = <SettingComp signOut={this.props.signOut} showNotification={this.props.showNotification} networkError={this.props.networkError} token={this.props.token} dispatch={this.props.dispatch}></SettingComp>;
        break;
      case 'schedule':
        DashboardComponent = <ScheduleComp weeklyTimetableReq={this.weeklyTimetableReq.bind(this)} monthlyTimetableReq={this.monthlyTimetableReq.bind(this)} weeklyTimetable={this.state.weeklyTimetable} monthlyTimetable={this.state.monthlyTimetable} token={this.props.token} tpl={this.state.tpl} dispatch={this.props.dispatch}></ScheduleComp>;
        break;
      case 'template':
        DashboardComponent = <OneWeekTemplate templateReq={this.lessonTemplateReq.bind(this)} token={this.props.token} tpl={this.state.tpl} dispatch={this.props.dispatch}></OneWeekTemplate>;
        break;
      case 'editProfile':
        //TODO:  add edit profile page.
        break;
      default:
        switch (profile.status) {
          case 3:
          case 4:
          case 8:
          DashboardComponent = <DisplayUserStatus></DisplayUserStatus>;
          break;
          case 10:
          case 11:
          case 15:
          if (newUser) {
            DashboardComponent = <OneWeekTemplate newUser={true} templateReq={this.lessonTemplateReq.bind(this)} token={this.props.token} tpl={this.state.tpl} dispatch={this.props.dispatch}></OneWeekTemplate>;
          } else {
            DashboardComponent = <h1 className="text-center">Congratulations! You passed the interview.</h1>;
          }
        }
    }

    var content = !this.props.pendingCounter ? <main className="container">
      <div className="row">
        <div className="col-3">
          <div className="avatar-profile">
            <img src={profile.avatar ? profile.avatar : "/images/teacher-avatar.png"} alt="profile avatar"/>
          </div>
          <div className="name-gender">
            <h2 className="profile-name">{profile.firstname} {profile.lastname} <span className="gender-icon">{genderIcon}</span></h2>
          </div>
          <hr/>
          <ul className="profile-data">
            <li><span className="profile-icon"><i className="fa fa-globe"></i></span><span className="profile-meta-data">{profile["nation"]}</span></li>
            <li><span className="profile-icon"><i className="fa fa-map-marker"></i></span><span className="profile-meta-data">{profile["country"]}</span></li>
            <li><span className="profile-icon"><i className="fa fa-envelope-o"></i></span><span className="profile-meta-data">{profile.email}</span></li>
            <li><span className="profile-icon"><i className="fa fa-pencil"></i></span><span className="profile-meta-data">{teachingExperience}</span></li>
          </ul>
        </div>
        <div className="col-9">
          {DashboardComponent}
        </div>
      </div>
    </main> : <SiteLoading></SiteLoading>;

    return (
      <div className="t-homepage">
        {content}
      </div>
    )
  }

  lessonTemplateReq () {

    var self = this;

    var lessonTemplateReq = api.LessonTemplateInfo(
      "",
      { "Authorization": self.props.token },
      "",
      (resp) => {
        if (resp.success) {
          var data = resp.data;

          self.setState({
            tpl: {
              existedTemplate: data.tpl.length ? data.tpl : [],
              teacherTimezone: data.timezone,
              studentTimezone: data.studentTimezone,
              timezoneOffset: data.studentTimeoffset / 3600,          //  unit:   hour.
              displayTimezone: data.timezone,
              defaultDuration: data.hours,
              defaultStartTime: data.hourFrom
            },
            hasTemplate: data.tpl.length > 0
          });

        } else {
          console.log("Something wrong, returns failure.");
        }
      },
      (err) => {
        console.log("Something wrong.");
      }
    );

  }

  weeklyTimetableReq () {

    var self = this;

    var weeklyTimetableReq = api.WeeklyTimeTable(
      "",
      { "Authorization": self.props.token },
      arguments[0],
      (resp) => {
        if (resp.success) {
          self.setState({
            weeklyTimetable: resp.data
          });
        } else {
          console.log("network is busy, please try again later.");
        }
      },
      (err) => {
        console.log(err);
        console.log("network is busy, please try again later.");
      }
    );

  }

  monthlyTimetableReq () {

    var self = this;

    var monthlyTimetableReq = api.MonthlyTimeTable(
      "",
      { "Authorization": self.props.token },
      arguments[0],
      (resp) => {
        if (resp.success) {
          self.setState({
            monthlyTimetable: resp.data
          });
        } else {
          console.log("network is busy, please try again later.");
        }
      },
      (err) => {
        console.log(err);
        console.log("network is busy, please try again later.");
      }
    );

  }

  componentDidMount() {
    var self = this;

    if (!this.props.token) {
      return;
    }

    this.lessonTemplateReq();

    this.weeklyTimetableReq();

    this.monthlyTimetableReq();
  }

  componentWillUnmount() {
    // profileRequest.abort();
  }

}

export default THomepage;
