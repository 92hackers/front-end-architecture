// site Header.

import React from 'react';
import {Link} from 'react-router';
import {browserHistory} from 'react-router';
import {List, ListItem} from 'material-ui/List';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import { connect } from 'react-redux';
import removeToken from '../actions/removeToken.js';
import dashboardDisplay from '../actions/dashboardDisplay.js';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';

class SiteHeaderClass extends React.Component {

  constructor (props) {
    super (props);
    this.state = {
      open: false,
      inviteDialogOpen: false
    };
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

  handleSignOut (e) {
    e.preventDefault();
    this.props.dispatch(removeToken());
    browserHistory.push("/");
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
    this.props.dispatch(dashboardDisplay("setting"));
  }

  handleScheduleClick (e) {
    e.preventDefault();
    this.handleRequestClose();
    this.props.dispatch(dashboardDisplay("schedule"));
  }

  render () {

    var isUserLoggedIn = this.props.isUserLoggedIn;

    var inviteActions = [
      <RaisedButton
        label="OK"
        primary={true}
        onTouchTap={this.handleInviteDialogClose.bind(this)}
      ></RaisedButton>
    ];

    var dynamicComponent = "";

    if (isUserLoggedIn) {
      dynamicComponent = (
        <ul className="right">
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
                <ListItem primaryText="Profile" leftIcon={<i className="fa fa-user"></i>} onTouchTap={this.handleProfileClick.bind(this)} />
                <ListItem primaryText="Settings" leftIcon={<i className="fa fa-cogs"></i>} onTouchTap={this.handleSettingClick.bind(this)} />
                <ListItem primaryText="Timetable" leftIcon={<i className="fa fa-calendar-plus-o"></i>} onTouchTap={this.handleScheduleClick.bind(this)} />
              </List>
            </Popover>
          </li>
          {/* <li className="header-item">
            <a href="javascript:;" onTouchTap={this.handleInvite.bind(this)}><i className="fa fa-user-plus"></i> Invite Friend</a>
            <span className="nav-border-line"></span>
            TODO:   inviting friend not ready to first version.
          </li> */}
          <li className="header-item">
            <a href="javascript:;" className="sign-out" onTouchTap={this.handleSignOut.bind(this)}><i className="fa fa-sign-out"></i> Sign out</a>
            <span className="nav-border-line"></span>
          </li>
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

    return (
      <header className="site-header">
        <div className="container">
          <span className="brand"><Link to={`/`} style={{color: "#fff", fontSize: "20px"}}>WeTeach</Link></span>
          {dynamicComponent}
        </div>
      </header>
    )
  }
};

var SiteHeader = connect()(SiteHeaderClass);

export default SiteHeader;
