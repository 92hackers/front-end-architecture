// site Header.

import React from 'react';
import { browserHistory, Link } from 'react-router';
import { autobind } from 'core-decorators';
import { List, ListItem } from 'material-ui/List';
import { Stepper } from 'material-ui/Stepper';
import Popover from 'material-ui/Popover';
import Dialog from 'material-ui/Dialog';
import SignOutButton from '../universal/SignOutButton';

class SiteHeaderComp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      settingsOpen: false,
      inviteDialogOpen: false,
      token: this.props.token,
      userStatus: '',
      welcomeOpen: false,
      stepIndex: 0,
    };
    this.handleEditProfile = this.handleEditProfile.bind(this)
    this.handlePayeeInfoClick = this.handlePayeeInfoClick.bind(this)
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleGuideImgResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleGuideImgResize);
  }

  getStepContent(stepIndex) {
    const styles = {
      width: '100%',
      height: '100%',
    };

    switch (stepIndex) {
      case 0:
        return (<div className="step step-one" style={styles}>
          <img style={styles} src="/images/guide-1.jpg" alt="guide img." />
        </div>)

      case 1:
        return (<div className="step step-two" style={styles}>
          <img style={styles} src="/images/guide-2.jpg" alt="step two img." />
        </div>)

      case 2:
        return (<div className="step step-three text-center" style={styles}>
          <img style={styles} src="/images/guide-3.jpg" alt="guide 3" />
        </div>)

      default:
        return <h1>Something Wrong.</h1>;
    }
  }

  handleGuideImgResize() {
    const elem = document.querySelector('.step');
    if (elem) {
      document.querySelector('.step').style.height = `${window.innerHeight}px`
      document.querySelector('.step').style.width = `${window.innerWidth}px`
    }
  }

  @autobind
  handleWelcomeClose() {
    this.setState({
      welcomeOpen: false,
      stepIndex: 0,
    });
  }

  @autobind
  handleTouchTap(e) {
    e.preventDefault();

    this.setState({
      open: true,
      anchorEl: e.currentTarget,
    });
  }

  @autobind
  handleRequestClose() {
    this.setState({
      open: false,
    });
  }

  @autobind
  handleSettingsRequestClose() {
    this.setState({
      settingsOpen: false,
    });
  }

  @autobind
  handleInvite() {
    this.handleInviteDialogOpen();
  }

  @autobind
  handleInviteDialogClose() {
    this.setState({
      inviteDialogOpen: false,
    });
  }

  @autobind
  handleInviteDialogOpen() {
    this.setState({
      inviteDialogOpen: true,
    });
  }

  @autobind
  handleEditProfileClick() {
    this.handleRequestClose();
    browserHistory.push('/teacher-homepage');
    this.props.dashboardDisplay('editProfile');
  }

  @autobind
  handleSettingClick() {
    this.handleSettingsRequestClose();
    browserHistory.push('/teacher-homepage');
    this.props.dashboardDisplay('setting');
  }

  @autobind
  handleScheduleClick() {
    this.handleRequestClose();
    browserHistory.push('/teacher-homepage');
    this.props.dashboardDisplay('schedule');
  }

  @autobind
  handleTemplateClick() {
    this.handleRequestClose();
    browserHistory.push('/teacher-homepage');
    this.props.dashboardDisplay('template');
  }

  @autobind
  handleHomepageClick() {
    this.props.dashboardDisplay('');
  }

  @autobind
  handleHelpClick() {
    this.setState({
      welcomeOpen: true,
    }, () => {
      const elem = document.querySelector('.step');
      if (elem) {
        document.querySelector('.step').style.height = `${window.innerHeight}px`
        document.querySelector('.step').style.width = `${window.innerWidth}px`
      }
    });
  }

  @autobind
  handleSettingsTouchTap(e) {
    e.preventDefault();
    this.setState({
      settingsOpen: true,
      settingsAnchorEl: e.currentTarget,
    });
  }

  handleEditProfile() {
    this.handleSettingsRequestClose();
    browserHistory.replace('/edit-profile')
  }

  handlePayeeInfoClick() {
    this.handleSettingsRequestClose()
    browserHistory.replace('/complete-payee-info')
  }

  @autobind
  handleNext() {
    const index = this.state.stepIndex;
    if (index < 2) {
      this.setState({
        stepIndex: index + 1,
      });
    } else {
      this.handleWelcomeClose();
    }
  }

  @autobind
  handlePrev() {
    const index = this.state.stepIndex;
    if (index > 0) {
      this.setState({
        stepIndex: index - 1,
      });
    }
  }

  render() {
    const { token: isUserLoggedIn, status: userStatus, examined } = this.props;

    let dynamicComponent = '';

    const settingsMenu = (
      <li className="header-item">
        <a href="#" className="dashboard" onTouchTap={this.handleSettingsTouchTap}>
          <i className="fa fa-bars" />
          Settings
        </a>
        <span className="nav-border-line" />
        <Popover
          open={this.state.settingsOpen}
          anchorEl={this.state.settingsAnchorEl}
          anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          targetOrigin={{ horizontal: 'left', vertical: 'top' }}
          onRequestClose={this.handleSettingsRequestClose}
        >
          <List className="dashboard-dropdown">
            <ListItem primaryText="Change Password" leftIcon={<i className="fa fa-key" />} onTouchTap={this.handleSettingClick} />
            <ListItem primaryText="Edit Profile" leftIcon={<i className="fa fa-edit" />} onTouchTap={() => { browserHistory.replace('/edit-profile') }} />
            {
              userStatus >= 10 ? (
                <ListItem
                  primaryText="Payee Info"
                  leftIcon={<i className="fa fa-credit-card" />}
                  onTouchTap={() => { browserHistory.replace('/complete-payee-info') }}
                />
                  ) : (<div />)
            }
          </List>
        </Popover>
      </li>
    );

    if (isUserLoggedIn) {
      if (userStatus === 2) {
        dynamicComponent = (
          <ul className="right">
            <li className="header-item">
              <Link to="/step-to-sign-up">Application</Link>
              <span className="nav-border-line" />
            </li>
            {settingsMenu}
            <SignOutButton />
          </ul>
       );
      } else if (userStatus > 2) {
        switch (userStatus) {
          case 3:
          case 4:
            if (examined) {
              dynamicComponent = (
                <ul className="right">
                  <li className="header-item">
                    <Link to="teacher-homepage" onClick={this.handleHomepageClick}>Homepage</Link>
                    <span className="nav-border-line" />
                  </li>
                  {settingsMenu}
                  <SignOutButton />
                </ul>
              );
            } else {
              dynamicComponent = (
                <ul className="right">
                  <li className="header-item">
                    <Link to="teacher-online-test">Online Test</Link>
                    <span className="nav-border-line" />
                  </li>
                  {settingsMenu}
                  <SignOutButton />
                </ul>
              );
            }
            break;
          case 8:
            dynamicComponent = (
              <ul className="right">
                {settingsMenu}
                <SignOutButton />
              </ul>
            )
            break;
          case 10:
          case 11:
          case 15:
            dynamicComponent = (
              <ul className="right">
                <li className="header-item">
                  <Link to="teacher-homepage" onClick={this.handleHomepageClick}>Homepage</Link>
                  <span className="nav-border-line" />
                </li>
                <li className="header-item">
                  <a href="#" onTouchTap={this.handleHelpClick}><i className="fa fa-question" /> Help</a>
                  <span className="nav-border-line" />
                </li>
                <li className="header-item">
                  <a href="#" className="dashboard" onTouchTap={this.handleTouchTap}><i className="fa fa-table" />Lessons</a>
                  <span className="nav-border-line" />
                  <Popover
                    open={this.state.open}
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
                    targetOrigin={{ horizontal: 'left', vertical: 'top' }}
                    onRequestClose={this.handleRequestClose}
                  >
                    <List className="dashboard-dropdown">
                      {/* <ListItem
                        primaryText="Profile"
                        leftIcon={<i className="fa fa-user"></i>}
                      onTouchTap={this.handleProfileClick.bind(this)} /> */}
                      <ListItem primaryText="Timetable" leftIcon={<i className="fa fa-calendar-plus-o" />} onTouchTap={this.handleScheduleClick} />
                      <ListItem primaryText="Template" leftIcon={<i className="fa fa-newspaper-o" />} onTouchTap={this.handleTemplateClick} />
                    </List>
                  </Popover>
                </li>
                {settingsMenu}
                <SignOutButton />
              </ul>
            );
            break;
          default:
            dynamicComponent = <ul className="right"><SignOutButton /></ul>;
        }
      }
    } else {
      dynamicComponent = (
        <ul className="header-item-right">
          <li className="button-wrap">
            <Link to="/sign-up" className="sign-up button">Sign up</Link>
          </li>
          <li className="button-wrap">
            <Link to="/sign-in" className="sign-in button">Sign in</Link>
          </li>
        </ul>
      );
    }

    const { stepIndex } = this.state

    return (
      <header className="site-header">
        <div className="container">
          <span className="brand"><Link to="/" style={{ color: '#fff', fontSize: '20px' }}>WeTeach</Link></span>
          {dynamicComponent}
        </div>
        <Dialog
          modal={false}
          className="welcomeDialog"
          bodyClassName="welcomeBody"
          autoScrollBodyContent
          contentClassName="welcomeContent"
          open={this.state.welcomeOpen}
          onRequestClose={this.handleWelcomeClose}
          contentStyle={{ width: '100%', maxWidth: '100%', transform: 0 }}
          overlayStyle={{ backgroundColor: 'transparent' }}
          bodyStyle={{ padding: 0 }}
        >
          <a href="#" onClick={this.handleWelcomeClose}>
            <i className="fa fa-times" style={{ position: 'absolute', right: 24, top: 14, cursor: 'pointer', fontSize: '50px', color: '#fff' }} />
          </a>
          <Stepper activeStep={stepIndex} />
          <a href="#" className="back-arrow" onClick={this.handlePrev} disabled={stepIndex === 0}><i className="fa fa-angle-left fa-3" /></a>
          <div className="step-content" style={{ width: '100%', height: '100%', display: 'inline-block', verticalAlign: 'top', overflow: 'hidden', borderRadius: 3 }}>
            {this.getStepContent(stepIndex)}
          </div>
          <a href="#" className="next-arrow" onClick={this.handleNext}>{stepIndex === 2 ? <span className="finish-btn">End</span> : <i className="fa fa-angle-right fa-3" />}</a>
        </Dialog>
      </header>
    )
  }
}

export default SiteHeaderComp;
