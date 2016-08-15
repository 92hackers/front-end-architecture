import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import Day from '../universal/Day';
import Week from '../universal/Week';

class ScheduleCourse extends React.Component {

  constructor (props) {
    super(props);
  }

  render () {
    return (
      <section className="schedule-course">
        <Tabs initialSelectedIndex={1}>
          <Tab label="Day">
            <Day></Day>
          </Tab>
          <Tab label="Week">
            <Week></Week>
          </Tab>
        </Tabs>
      </section>
    )
  }
}

export default ScheduleCourse;
