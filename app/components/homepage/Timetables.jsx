import React from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import Week from '../universal/Week';
import DateTab from '../universal/DateTab';

const ScheduleCourse = (props) => {
  const {
    tpl,
    weeklyTimetable,
    weeklyTimetableReq,
    monthlyTimetable,
    monthlyTimetableReq,
  } = props

  return (
    <section className="schedule-course">
      <Tabs initialSelectedIndex={0}>
        <Tab label="Week">
          <Week
            tpl={tpl}
            weeklyTimetable={weeklyTimetable}
            weeklyTimetableReq={weeklyTimetableReq}
            monthlyTimetableReq={monthlyTimetableReq}
          />
        </Tab>
        <Tab label="Month">
          <DateTab
            monthlyTimetable={monthlyTimetable}
            monthlyTimetableReq={monthlyTimetableReq}
          />
        </Tab>
      </Tabs>
    </section>
  )
}
export default ScheduleCourse;
