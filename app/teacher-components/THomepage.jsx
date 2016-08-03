// teacher's homepage.

import React from 'react';
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
      profile: ""
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
        <main>

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
        if (resp.success) {
          self.setState({
            profile: resp.data
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
