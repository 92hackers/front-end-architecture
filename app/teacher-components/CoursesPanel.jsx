
import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import Day from '../utilities/Day';
import Week from '../utilities/Week';
import Date from '../utilities/Date';

class CoursesPanel extends React.Component {

  constructor (props) {
    super (props);
  }

  render () {
    return (
      <div className="courses-panel container">
        <div className="row">
        <div className="col-3">
        <div className="dashboard">
        </div>
        </div>
        <div className="col-9">
          <Tabs initialSelectedIndex={1}>
            <Tab label="Day">
              <Day></Day>
            </Tab>
            <Tab label="Week">
              <Week></Week>
            </Tab>
            <Tab label="Month">
              <Date></Date>
            </Tab>
          </Tabs>
        </div>
        </div>
      </div>
    )
  }
}

export default CoursesPanel;
