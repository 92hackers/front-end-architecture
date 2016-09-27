// site Header.

import React from 'react';
import {Link} from 'react-router';
import {browserHistory} from 'react-router';
import {List, ListItem} from 'material-ui/List';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import { Step, Stepper, StepLabel } from 'material-ui/Stepper';
import { connect } from 'react-redux';
import dashboardDisplay from '../actions/dashboardDisplay.js';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import api from '../network/api';
import SignOutButton from '../universal/SignOutButton';

class SiteHeaderClass extends React.Component {

  constructor (props) {
    super (props);
    this.state = {
      open: false,
      inviteDialogOpen: false,
      token: this.props.token,
      userStatus: "",
      dataIsReady: false,
      welcomeOpen: false,
      stepIndex: 0
    };
  }


  handleWelcomeClose () {
    this.setState({
      welcomeOpen: false,
      stepIndex: 0
    });
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

  handleTouchTap (e) {
    e.preventDefault();

    this.setState({
      open: true,
      anchorEl: e.currentTarget
    });
  }

  handleRequestClose () {
    this.setState({
      open: false
    });
  }

  handleInvite (e) {
    e.preventDefault();
    this.handleInviteDialogOpen();
  }


  handleInviteDialogClose () {
    this.setState({
      inviteDialogOpen: false
    });
  }

  handleInviteDialogOpen () {
    this.setState({
      inviteDialogOpen: true
    });
  }

  handleProfileClick (e) {
    e.preventDefault();
    this.handleRequestClose();
    browserHistory.push("/teacher-homepage");
  }

  handleSettingClick (e) {
    e.preventDefault();
    this.handleRequestClose();
    browserHistory.push("/teacher-homepage");
    this.props.dispatch(dashboardDisplay("setting"));
  }

  handleScheduleClick (e) {
    e.preventDefault();
    this.handleRequestClose();
    browserHistory.push("/teacher-homepage");
    this.props.dispatch(dashboardDisplay("schedule"));
  }

  handleTemplateClick (e) {
    e.preventDefault();
    this.handleRequestClose();
    browserHistory.push("/teacher-homepage");
    this.props.dispatch(dashboardDisplay("template"))
  }

  handleHelpClick (e) {
    e.preventDefault();
    this.setState({
      welcomeOpen: true
    });
  }

  render () {

    var isUserLoggedIn = this.state.token;
    var userStatus = this.state.userStatus;

    var inviteActions = [
      <RaisedButton
        label="OK"
        primary={true}
        onTouchTap={this.handleInviteDialogClose.bind(this)}
      ></RaisedButton>
    ];

    var dynamicComponent = "";

    if (!!isUserLoggedIn) {
      switch (userStatus) {
        case 10:
        case 11:
        case 15:
        dynamicComponent = (
          <ul className="right">
            <li className="header-item">
              <a href="javascript:;" onTouchTap={this.handleHelpClick.bind(this)}><i className="fa fa-question"></i> Help</a>
              <span className="nav-border-line"></span>
            </li>
            <li className="header-item">
              <a href="javascript:;" className="dashboard" onTouchTap={this.handleTouchTap.bind(this)}><i className="fa fa-bars"></i> Dashboard</a>
              <span className="nav-border-line"></span>
              <Popover
                open={this.state.open}
                anchorEl={this.state.anchorEl}
                anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                targetOrigin={{horizontal: 'left', vertical: 'top'}}
                onRequestClose={this.handleRequestClose.bind(this)}
              >
                <List className="dashboard-dropdown">
                  {/* <ListItem primaryText="Profile" leftIcon={<i className="fa fa-user"></i>} onTouchTap={this.handleProfileClick.bind(this)} /> */}
                  <ListItem primaryText="Settings" leftIcon={<i className="fa fa-cogs"></i>} onTouchTap={this.handleSettingClick.bind(this)} />
                  <ListItem primaryText="Timetable" leftIcon={<i className="fa fa-calendar-plus-o"></i>} onTouchTap={this.handleScheduleClick.bind(this)} />
                  <ListItem primaryText="Template" leftIcon={<i className="fa fa-newspaper-o"></i>} onTouchTap={this.handleTemplateClick.bind(this)}></ListItem>
                </List>
              </Popover>
            </li>
            {/* <li className="header-item">
              <a href="javascript:;" onTouchTap={this.handleInvite.bind(this)}><i className="fa fa-user-plus"></i> Invite Friend</a>
              <span className="nav-border-line"></span>
              TODO:   inviting friend not ready to first version.
            </li> */}
            <SignOutButton></SignOutButton>
            {/* <Dialog     TODO
              title="Invite your friends to WeTeach"
              actions={inviteActions}
              modal={false}
              open={this.state.inviteDialogOpen}
              onRequestClose={this.handleInviteDialogClose.bind(this)}
              >
              your invite code is:  YAWEFAWEFAWEFAE999AWEF
            </Dialog> */}
          </ul>
          );
          break;
        default:
          dynamicComponent = <ul className="right"><SignOutButton></SignOutButton></ul>;
          break;
      }
    } else {
      dynamicComponent = (
        <ul className="header-item-right">
          <li className="button-wrap">
            <Link to={`/sign-up`} className="sign-up button">Sign up</Link>
          </li>
          <li className="button-wrap">
            <Link to={`/sign-in`} className="sign-in button">Sign in</Link>
          </li>
        </ul>
      );
    }

    var stepIndex = this.state.stepIndex;

    return (
      <header className="site-header">
        <div className="container">
          <span className="brand"><Link to={`/`} style={{color: "#fff", fontSize: "20px"}}>WeTeach</Link></span>
          {dynamicComponent}
        </div>
        <Dialog
          modal={false}
          className="welcomeDialog"
          bodyClassName="welcomeBody"
          autoScrollBodyContent={true}
          contentClassName="welcomeContent"
          open={this.state.welcomeOpen}
          onRequestClose={this.handleWelcomeClose.bind(this)}
          contentStyle={{width: "100%", maxWidth: "100%", transform: 0}}
          overlayStyle={{backgroundColor: "transparent"}}
          bodyStyle={{padding: 0}}
        >
          <i className="fa fa-times" style={{position: "absolute", right: 24, top: 14, cursor: "pointer", fontSize: "50px", color: "#fff"}} onClick={this.handleWelcomeClose.bind(this)}></i>
          <Stepper activeStep={stepIndex}></Stepper>
          <div className="back-arrow" onClick={this.handlePrev.bind(this)} disabled={stepIndex === 0}><i className="fa fa-angle-left fa-3"></i></div>
          <div className="step-content" style={{width: "100%", height: "100%", display: "inline-block", verticalAlign: "top", overflow: "hidden", borderRadius: 3}}>
            {this.getStepContent(stepIndex)}
          </div>
          <div className="next-arrow" onClick={this.handleNext.bind(this)}>{stepIndex === 2 ? <span className="finish-btn">End</span> : <i className="fa fa-angle-right fa-3"></i>}</div>
        </Dialog>
      </header>
    )
  }

  handleNext () {
    var index = this.state.stepIndex;
    if (index < 2) {
      this.setState({
        stepIndex: index + 1
      });
    } else {
      this.handleWelcomeClose();
    }
  }

  handlePrev () {
    var index = this.state.stepIndex;
    if (index > 0) {
      this.setState({
        stepIndex: index - 1
      });
    }
  }

  getStepContent(stepIndex) {

    var styles = {
      width: "100%",
      height: "100%"
    };

    switch (stepIndex) {
      case 0 :
        return <div className="step step-one" style={styles}><img style={styles} src="/images/guide-1.jpg" alt="guide img."/></div>;

      case 1 :
        return <div className="step step-two" style={styles}><img style={styles} src="/images/guide-2.jpg" alt="step two img."/></div>;

      case 2 :
        return <div className="step step-three text-center" style={styles}><img style={styles} src="/images/guide-3.jpg" alt="guide 3"/></div>;

      default :
        return <h1>Something Wrong.</h1>;
    }
  }
};

var SiteHeader = connect()(SiteHeaderClass);

export default SiteHeader;
