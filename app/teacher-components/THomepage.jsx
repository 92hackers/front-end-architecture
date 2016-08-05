// teacher's homepage.

import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import Day from '../utilities/Day';
import Week from '../utilities/Week';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import apis from '../network/api';

class THomepage extends React.Component {

  constructor (props) {
    super (props);
    this.state = {
      profile: {
        additional: "nice to meet you.",
        avatar: "http://oawkdrros.bkt.clouddn.com/FhojT9HisVwUQyJF9C1O7Z-KXvWZ",
        eduexp: [
          {
            degree: "bachelor",
            institution: "usst",
            major: "CS",
            timefrom: "1992",
            timeto: "1994"
          }
        ],
        email: "cy476571@gmail.com",
        experience: "more than 15 years",
        firstname: "Jacky",
        lastname: "chen",
        gender: "female",
        intro: "i well be good english teacher.",
        nationality: "Australia",
        "residence_c": "China",
        "residence_n": "Guiyang",
        "residence_p": "Guizhou",
        status: 1,
        style: "happy, kind, easy-going",
        "tel_code": "86",
        "tel_num": "15221455061",
        timezone: "111",
        whyteach: "just love it."
      }
    };
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

    genderIcon = profile.gender === "female" ? <i className="fa fa-venus"></i> : <i className="fa fa-mars"></i>;

    return (
      <div className="t-homepage">
        <header className="t-homepage-header">
          <div className="container">
            <div className="row">
              <AppBar
              title="WeTeach"
              style={appbarStyles}
              iconElementRight={
                <IconMenu
                iconButtonElement={
                  <IconButton><MoreVertIcon /></IconButton>
                }
                targetOrigin={{horizontal: 'right', vertical: 'top'}}
                anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                >
                <MenuItem style={menuItemStyles} primaryText="Settings" />
                <MenuItem style={menuItemStyles} primaryText="Help" />
                <MenuItem style={menuItemStyles} primaryText="Sign out" />
                </IconMenu>
              }
              />
            </div>
          </div>
        </header>
        <main className="container">
          <div className="row">
            <div className="col-3">
              <div className="avatar-profile">
                <img src={profile.avatar} alt="profile avatar"/>
              </div>
              <div className="name-gender">
              <h2 className="profile-name">{profile.firstname} {profile.lastname} <span className="gender-icon">{genderIcon}</span></h2>
              </div>
              <hr/>
              <ul className="profile-data">
                <li><span className="profile-icon"><i className="fa fa-globe"></i></span><span className="nationality">{profile["nationality"]}</span></li>
                <li><span className="profile-icon"><i className="fa fa-map-marker"></i></span><span className="location-country">{profile["residence_c"]}</span></li>
                <li><span className="profile-icon"><i className="fa fa-envelope-o"></i></span><span className="email">{profile.email}</span></li>
                <li><span className="profile-icon"><i className="fa fa-pencil"></i></span><span className="teaching-experience">{profile.experience}</span></li>
              </ul>
            </div>
            <div className="col-9">
              <Tabs initialSelectedIndex={1}>
                <Tab label="Day">
                  <Day></Day>
                </Tab>
                <Tab label="Week">
                  <Week></Week>
                </Tab>
              </Tabs>
            </div>
          </div>
        </main>
      </div>
    )
  }

  componentDidMount () {
    var self = this;

    var profileRequest = apis.TGetProfile("",
    { "Authorization": "Bearer nNlVSA9i3eSYxCP5uf9jO72zMmfDnsF-" },
    "",
    (resp) => {
      console.log(resp)
      if (resp.success) {
        self.setState({
          // profile: resp.data
        });
      } else {
        console.log("get data error.");
      }
    },
    (err) => {
      console.log("get data error.");
    }
  );
}

componentWillUnmount () {
  profileRequest.abort();
}

}

export default THomepage;
