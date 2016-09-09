import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import Week from '../universal/Week';
import DateTab from '../universal/DateTab';

class ScheduleCourse extends React.Component {

  constructor (props) {
    super(props);
  }

  render () {

    return (
      <section className="schedule-course">
        <Tabs initialSelectedIndex={0}>
          <Tab label="Week">
            <Week token={this.props.token} tpl={this.props.tpl} weeklyTimetable={this.props.weeklyTimetable} weeklyTimetableReq={this.props.weeklyTimetableReq} monthlyTimetableReq={this.props.monthlyTimetableReq}></Week>
          </Tab>
          <Tab label="Month">
            <DateTab monthlyTimetable={this.props.monthlyTimetable}></DateTab>
          </Tab>
        </Tabs>
      </section>
    )
  }
}

export default ScheduleCourse;
