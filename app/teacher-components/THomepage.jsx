// teacher's homepage.

import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Notification from '../universal/Notification';
import api from '../network/api';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import removeToken from '../actions/removeToken';
import dashboardDisplay from '../actions/dashboardDisplay';
import ScheduleCourse from './ScheduleCourse';
import OneWeekTemplate from '../universal/OneWeekTemplate';

class SettingComp extends React.Component {

  constructor (props) {
    super (props);
    this.state = {
      notification: ""
    };
  }

  notify (message) {
    if (!!message.length) {
      this.setState({
        notification: message
      }, () => {
        this.refs.notification.handleNotificationOpen();
      });
    }
  }

  handleSubmit (e) {
    e.preventDefault();

    var self = this;
    var oldPassword = document.getElementById("old-password").value;
    var newPassword = document.getElementById("new-password").value;
    var confirmPassword = document.getElementById("confirm-password").value;

    var warning = "";
    if (!oldPassword || !newPassword || !confirmPassword) {
      warning = "Please Input Correct Password";
    } else if (oldPassword.length < 6 || newPassword.length < 6 || confirmPassword.length < 6) {
      warning = "Password must be more than 6 words.";
    } else if (newPassword !== confirmPassword) {
      warning = "You Must Input Consistent Passwords";
    }

    if (!!warning) {
      this.notify(warning);
    }

    var data = {
      "o_pass": oldPassword,
      "n_pass": newPassword,
      "rn_pass": confirmPassword
    };

    api.ChangePassword(data,
      { "Authorization": this.props.token},
      "",
      (resp) => {
        if (resp.success) {
          self.notify("Change Password Successfully!");
          var timeId = setTimeout(() => {
            clearTimeout(timeId);
            self.props.dispatch(removeToken());
            self.props.dispatch(dashboardDisplay(""));
            browserHistory.push("/sign-in");
          }, 4100);
        } else {
          self.notify("Please input Correct Passwords");
        }
      },
      (err) => {
        self.notify("Network Is Busy, Please Try Again Later.");
      }
    );
  }

  render () {
    return (
      <section className="setting-dashboard dashboard">
        <h1 className="text-center">Change Password</h1>
        <form>
          <TextField floatingLabelText="Old Password" id="old-password" type="password"></TextField>
          <TextField floatingLabelText="New Password" id="new-password" type="password"></TextField>
          <TextField floatingLabelText="Confirm Password" id="confirm-password" type="password"></TextField>
          <br/>
          <br/>
          <RaisedButton onTouchTap={this.handleSubmit.bind(this)} label="Submit" primary={true} style={{width: "100%"}}></RaisedButton>
        </form>
        <Notification ref="notification" message={this.state.notification}></Notification>
      </section>
    )
  }
}

class ScheduleComp extends React.Component {

  constructor (props) {
    super (props);
  }

  render () {
    return (
      <section className="schedule-dashboard dashboard">
        <ScheduleCourse weeklyTimetableReq={this.props.weeklyTimetableReq} monthlyTimetableReq={this.props.monthlyTimetableReq} weeklyTimetable={this.props.weeklyTimetable} monthlyTimetable={this.props.monthlyTimetable} token={this.props.token} tpl={this.props.tpl} dispatch={this.props.dispatch}></ScheduleCourse>
      </section>
    )
  }
}


class WaitForInterview extends React.Component {

  constructor (props) {
    super (props);
  }

  render () {
    return (
      <div className="wait-for-interview text-center">
        <h1 style={{marginBottom: "40px", color: "#999"}}>Your interview scheduled on: </h1>
        <h2 className="interview-time">{this.props.interviewTime}</h2>
      </div>
    )
  }
}

class THomepageClass extends React.Component {

  constructor (props) {
    super (props);
    this.state = {
      profile: {
        email: "",
        status: 0,
        interview: "",
        "timezone_name": "",
        nation: "",
        country: "",
        region: "",
        city: "",
        nationality: "",
        timezone: "",
        "timezone_offset": "",
        experience: "",
        eduexp: [],
        "residence_n": "",
        "residence_p": "",
        "residence_c": "",
        "firstname": "",
        lastname: "",
        gender: 0,
        "tel_code": "",
        "tel_num": "",
        avatar: "",
        intro: "",
        style: "",
        whyteach: "",
        additional: ""
      },
      tpl: {},
      hasTemplate: false,
      weeklyTimetable: {},
      monthlyTimetable: {}
    };
  }

  componentWillMount () {

    if (!this.props.token) {
      browserHistory.push("/sign-in");
    }

  }

  render () {

    const appbarStyles = {
      backgroundColor: "#2196f3",    // teacher base color.
      boxShadow: "none"
    };

    const menuItemStyles = {
      cursor: "pointer"
    };

    const profile = this.state.profile;

    var genderIcon = "";

    //map gender to number: 0--female,   1--male.

    genderIcon = profile.gender === 0 ? <i className="fa fa-venus"></i> : <i className="fa fa-mars"></i>;

    var teachingExperience = "";

    switch (profile.experience) {
      case 3 :
      teachingExperience = "More than 15 years";
      break;
      case 2 :
      teachingExperience = "Between 5 to 15 years";
      break;
      case 1 :
      teachingExperience = "Less than 5 years";
      break;
    }

    var DashboardComponent = "";

    var dynamicDashboardComp = this.props.dashboardComponent;

    var newUser = profile.status < 11;

    switch (profile.status) {
      case 3:
      case 5:
        DashboardComponent = <WaitForInterview interviewTime={profile.interview}></WaitForInterview>;
        break;
      case 10:
      case 11:
        switch (dynamicDashboardComp) {
          case "setting":
            DashboardComponent = <SettingComp token={this.props.token} dispatch={this.props.dispatch}></SettingComp>;
            break;
          case "schedule":
            DashboardComponent = <ScheduleComp weeklyTimetableReq={this.weeklyTimetableReq.bind(this)} monthlyTimetableReq={this.monthlyTimetableReq.bind(this)} weeklyTimetable={this.state.weeklyTimetable} monthlyTimetable={this.state.monthlyTimetable} token={this.props.token} tpl={this.state.tpl} dispatch={this.props.dispatch}></ScheduleComp>;
            break;
          case "template":
            DashboardComponent = <OneWeekTemplate templateReq={this.lessonTemplateReq.bind(this)} token={this.props.token} tpl={this.state.tpl} dispatch={this.props.dispatch}></OneWeekTemplate>;
            break;
          default:
            if (newUser) {
              DashboardComponent = <OneWeekTemplate newUser={true} templateReq={this.lessonTemplateReq.bind(this)} token={this.props.token} tpl={this.state.tpl} dispatch={this.props.dispatch}></OneWeekTemplate>;
            } else {
              DashboardComponent = <h1 className="text-center">Congratulations! You passed the interview.</h1>;
            }
        }
        break;
      default:
        DashboardComponent = <h1 className="text-center">Congratulations! You passed the interview.</h1>;
    }

    return (
      <div className="t-homepage">
        <main className="container">
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
        </main>
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

  componentDidMount () {
    var self = this;

    console.log("dashboard param: ", this.props.params);

    if (!this.props.token) {
      return;
    }

    var profileRequest = api.TGetProfile(
      "",
      { "Authorization": self.props.token },
      "",
      (resp) => {
        if (resp.success) {
          self.setState({
            profile: resp.data
          });
        } else {
          console.log("get profile data error.");
        }
      },
      (err) => {
        console.log("network is busy, please try again later");
      }
    );

    this.lessonTemplateReq();

    this.weeklyTimetableReq();

    this.monthlyTimetableReq();

  }

  componentWillUnmount () {
    // profileRequest.abort();
  }

}

const mapStateToProps = (state) => {
  return {
    token: state.addToken.token,
    dashboardComponent: state.dashboardDisplay.component
  }
}

const THomepage = connect(
  mapStateToProps
)(THomepageClass);

export default THomepage;
