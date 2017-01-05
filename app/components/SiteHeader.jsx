// site Header.
import React from 'react';
import { browserHistory, Link } from 'react-router';
import { autobind } from 'core-decorators';
import { List, ListItem } from 'material-ui/List';
import Popover from 'material-ui/Popover';
import FaBars from 'react-icons/lib/fa/bars'
import FaKey from 'react-icons/lib/fa/key'
import FaEdit from 'react-icons/lib/fa/edit'
import FaCreditCard from 'react-icons/lib/fa/credit-card'
import FaQuestion from 'react-icons/lib/fa/question'
import FaTable from 'react-icons/lib/fa/table'
import FaCalendarPlusO from 'react-icons/lib/fa/calendar-plus-o'
import FaNewspaperO from 'react-icons/lib/fa/newspaper-o'

import SignOutButton from '../containers/signOutButton';
import DisplayHelp from '../containers/displayHelp'

export default class SiteHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      settingsOpen: false,
      inviteDialogOpen: false,
      welcomeOpen: false,
      stepIndex: 0,
    };
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
  handleSettingsTouchTap(e) {
    e.preventDefault();
    this.setState({
      settingsOpen: true,
      settingsAnchorEl: e.currentTarget,
    });
  }

  render() {
    const { profile, loggedIn } = this.props;

    const { settingsOpen, settingsAnchorEl, open, anchorEl } = this.state

    let dynamicContent = '';

    const settingsMenu = (
      <li className="header-item">
        <a href="#" className="dashboard" onTouchTap={this.handleSettingsTouchTap}>
          <FaBars className="fa fa-bars" />
          Settings
        </a>
        <span className="nav-border-line" />
        <Popover
          open={settingsOpen}
          anchorEl={settingsAnchorEl}
          anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          targetOrigin={{ horizontal: 'left', vertical: 'top' }}
          onRequestClose={this.handleSettingsRequestClose}
        >
          <List className="dashboard-dropdown">
            <ListItem primaryText="Change Password" leftIcon={<FaKey className="fa fa-key" />} onTouchTap={this.handleSettingClick} />
            <ListItem primaryText="Edit Profile" leftIcon={<FaEdit className="fa fa-edit" />} onTouchTap={() => { browserHistory.replace('/edit-profile') }} />
            {
              status >= 10 ? (
                <ListItem
                  primaryText="Payee Info"
                  leftIcon={<FaCreditCard className="fa fa-credit-card" />}
                  onTouchTap={() => { browserHistory.replace('/complete-payee-info') }}
                />
                  ) : (<div />)
            }
          </List>
        </Popover>
      </li>
    );

    if (loggedIn) {
      const { status, examined } = profile

      if (status === 2) {
        dynamicContent = (
          <ul className="right">
            <li className="header-item">
              <Link to="/step-to-sign-up">Application</Link>
              <span className="nav-border-line" />
            </li>
            {settingsMenu}
            <SignOutButton />
          </ul>
       );
      } else if (status > 2) {
        switch (status) {
          case 3:
          case 4:
          case 5:
            if (examined) {
              dynamicContent = (
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
              dynamicContent = (
                <ul className="right">
                  <li className="header-item">
                    <Link to="teacher-online-test">Online Test</Link>
                    <span className="nav-border-line" />
                  </li>
                  {settingsMenu}
                  <SignOutButton />
                </ul>
              )
            }
            break;
          case 8:
            dynamicContent = (
              <ul className="right">
                {settingsMenu}
                <SignOutButton />
              </ul>
            )
            break;
          case 10:
          case 11:
          case 15:
            dynamicContent = (
              <ul className="right">
                <li className="header-item">
                  <Link to="teacher-homepage" onClick={this.handleHomepageClick}>Homepage</Link>
                  <span className="nav-border-line" />
                </li>
                <li className="header-item">
                  <a href="#" onTouchTap={this.handleHelpClick}><FaQuestion className="fa fa-question" /> Help</a>
                  <span className="nav-border-line" />
                </li>
                <li className="header-item">
                  <a href="#" className="dashboard" onTouchTap={this.handleTouchTap}><FaTable className="fa fa-table" />Lessons</a>
                  <span className="nav-border-line" />
                  <Popover
                    open={open}
                    anchorEl={anchorEl}
                    anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
                    targetOrigin={{ horizontal: 'left', vertical: 'top' }}
                    onRequestClose={this.handleRequestClose}
                  >
                    <List className="dashboard-dropdown">
                      <ListItem primaryText="Timetable" leftIcon={<FaCalendarPlusO className="fa fa-calendar-plus-o" />} onTouchTap={this.handleScheduleClick} />
                      <ListItem primaryText="Template" leftIcon={<FaNewspaperO className="fa fa-newspaper-o" />} onTouchTap={this.handleTemplateClick} />
                    </List>
                  </Popover>
                </li>
                {settingsMenu}
                <SignOutButton />
              </ul>
            );
            break;
          default:
            dynamicContent = <ul className="right"><SignOutButton /></ul>;
        }
      }
    } else {
      dynamicContent = (
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

    return (
      <header className="site-header">
        <div className="container">
          <span className="brand"><Link to="/" style={{ color: '#fff', fontSize: '20px' }}>WeTeach</Link></span>
          {dynamicContent}
        </div>
        {
          status > 9 ? <DisplayHelp /> : null
        }
      </header>
    )
  }
}
