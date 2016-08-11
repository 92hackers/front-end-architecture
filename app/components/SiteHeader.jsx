// site Header.

import React from 'react';
import {Link} from 'react-router';
// import FontIcon from 'material-ui/FontIcon';
import {List, ListItem} from 'material-ui/List';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';


class SiteHeader extends React.Component {

  constructor (props) {
    super (props);
    this.state = {
      open: false
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
  }

  handleSignOut (e) {
    e.preventDefault();
  }

  render () {

    var isUserLoggedIn = this.props.isUserLoggedIn;

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
              <List>
                <ListItem primaryText="Profile" leftIcon={<i className="fa fa-user"></i>} onTouchTap={this.handleRequestClose.bind(this)} />
                <ListItem primaryText="Setting" leftIcon={<i className="fa fa-cogs"></i>} onTouchTap={this.handleRequestClose.bind(this)} />
                <ListItem primaryText="Schedule" leftIcon={<i className="fa fa-calendar-plus-o"></i>} onTouchTap={this.handleRequestClose.bind(this)} />
              </List>
            </Popover>
          </li>
          <li className="header-item">
            <a href="javascript:;" onTouchTap={this.handleInvite.bind(this)}><i className="fa fa-user-plus"></i> Invite Friend</a>
            <span className="nav-border-line"></span>
          </li>
          <li className="header-item">
            <a href="javascript:;" className="sign-out" onTouchTap={this.handleSignOut.bind(this)}><i className="fa fa-sign-out"></i> Sign out</a>
            <span className="nav-border-line"></span>
          </li>
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

export default SiteHeader;
