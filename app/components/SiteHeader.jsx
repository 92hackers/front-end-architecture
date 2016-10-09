// site Header.

import React from 'react';
import {Link} from 'react-router';
import {browserHistory} from 'react-router';
import {List, ListItem} from 'material-ui/List';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import { Step, Stepper, StepLabel } from 'material-ui/Stepper';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import api from '../network/api';
import SignOutButton from '../universal/SignOutButton';

class SiteHeaderComp extends React.Component {

  constructor (props) {
    super (props);
    this.state = {
      open: false,
      settingsOpen: false,
      inviteDialogOpen: false,
      token: this.props.token,
      userStatus: "",
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

  handleSettingsRequestClose () {
    this.setState({
      settingsOpen: false
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

  handleEditProfileClick (e) {
    e.preventDefault();
    this.handleRequestClose();
    browserHistory.push("/teacher-homepage");
    this.props.dashboardDisplay("editProfile");
  }

  handleSettingClick (e) {
    e.preventDefault();
    this.handleSettingsRequestClose();
    browserHistory.push("/teacher-homepage");
    this.props.dashboardDisplay("setting");
  }

  handleScheduleClick (e) {
    e.preventDefault();
    this.handleRequestClose();
    browserHistory.push("/teacher-homepage");
    this.props.dashboardDisplay("schedule");
  }

  handleTemplateClick (e) {
    e.preventDefault();
    this.handleRequestClose();
    browserHistory.push("/teacher-homepage");
    this.props.dashboardDisplay("template");
  }

  handleHomepageClick () {
    this.props.dashboardDisplay("");
  }

  handleHelpClick (e) {
    e.preventDefault();
    this.setState({
      welcomeOpen: true
    }, () => {
      document.querySelector(".step").style.height = window.innerHeight + "px";
      document.querySelector(".step").style.width = window.innerWidth + "px";
    });
  }

  handleSettingsTouchTap (e) {
    e.preventDefault();

    this.setState({
      settingsOpen: true,
      settingsAnchorEl: e.currentTarget
    });
  }

  render () {
    const {token: isUserLoggedIn, status: userStatus, examined: examined} = this.props;

    var inviteActions = [
      <RaisedButton
        label="OK"
        primary={true}
        onTouchTap={this.handleInviteDialogClose.bind(this)}
      ></RaisedButton>
    ];

    var dynamicComponent = "";

    var settingsMenu = (
      <li className="header-item">
        <a href="javascript:;" className="dashboard" onTouchTap={this.handleSettingsTouchTap.bind(this)}><i className="fa fa-bars"></i>Settings</a>
        <span className="nav-border-line"></span>
        <Popover
          open={this.state.settingsOpen}
          anchorEl={this.state.settingsAnchorEl}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={this.handleSettingsRequestClose.bind(this)}
        >
          <List className="dashboard-dropdown">
            <ListItem primaryText="Change Password" leftIcon={<i className="fa fa-key"></i>} onTouchTap={this.handleSettingClick.bind(this)} />
            {/* <ListItem primaryText="Edit Profile" leftIcon={<i className="fa fa-edit"></i>} onTouchTap={this.handleEditProfileClick.bind(this)}></ListItem> */}
          </List>
        </Popover>
      </li>
    );

    if (!!isUserLoggedIn) {
      if (userStatus === 2) {
        dynamicComponent = (
          <ul className="right">
            <li className="header-item">
              <Link to="/step-to-sign-up">Application</Link>
              <span className="nav-border-line"></span>
            </li>
            {settingsMenu}
            <SignOutButton></SignOutButton>
          </ul>
       );
     } else if (userStatus > 2) {
       switch (userStatus) {
         case 3:
         case 4:
          if (!!examined) {
            dynamicComponent = (
              <ul className="right">
                <li className="header-item">
                  <Link to="teacher-homepage" onClick={this.handleHomepageClick.bind(this)}>Homepage</Link>
                  <span className="nav-border-line"></span>
                </li>
                {settingsMenu}
                <SignOutButton></SignOutButton>
              </ul>
            );
          } else {
            dynamicComponent = (
              <ul className="right">
                <li className="header-item">
                  <Link to="teacher-online-test">Online Test</Link>
                  <span className="nav-border-line"></span>
                </li>
                {settingsMenu}
                <SignOutButton></SignOutButton>
              </ul>
            );
          }
           break;
         case 8:
          dynamicComponent = (
            <ul className="right">
              {settingsMenu}
              <SignOutButton></SignOutButton>
            </ul>
          )
          break;
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
                 <a href="javascript:;" className="dashboard" onTouchTap={this.handleTouchTap.bind(this)}><i className="fa fa-bars"></i> Lessons</a>
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
                     <ListItem primaryText="Timetable" leftIcon={<i className="fa fa-calendar-plus-o"></i>} onTouchTap={this.handleScheduleClick.bind(this)} />
                     <ListItem primaryText="Template" leftIcon={<i className="fa fa-newspaper-o"></i>} onTouchTap={this.handleTemplateClick.bind(this)}></ListItem>
                   </List>
                 </Popover>
               </li>
               {settingsMenu}
               <SignOutButton></SignOutButton>
             </ul>
           );
           break;
          default:
            dynamicComponent = <ul className="right"><SignOutButton></SignOutButton></ul>;
            break;
       }
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

  handleGuideImgResize (e) {
    document.querySelector(".step").style.height = window.innerHeight + "px";
    document.querySelector(".step").style.width = window.innerWidth + "px";
  }

  componentDidMount () {
    window.addEventListener("resize", this.handleGuideImgResize);
  }

  componentWillUnmount () {
    window.removeEventListener("resize", this.handleGuideImgResize);
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

export default SiteHeaderComp;
