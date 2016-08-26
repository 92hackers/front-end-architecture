// use calendar component.
//

import React from 'react';
import { DateRange, defaultRanges } from 'react-date-range';
// import InfiniteCalendar from 'react-infinite-calendar';
// import 'react-infinite-calendar/styles.css'; // Make sure to import the default stylesheet

class DateTab extends React.Component {

  constructor (props) {
    super (props);
  }

  handleSelect (range) {
    console.log(range);
  }

  handleChange () {
    console.log(arguments);
  }

  render () {

    var today = new Date();
    var maxDate = new Date();
    maxDate = new Date(maxDate.setMonth(today.getMonth() + 2));
    // TODO:  maxDate :  the end date that a teacher can schedules his courses.
    console.log(maxDate);

    return (
      <div className="date">
        <DateRange
          calendars={1}
          ranges={"27/08/2016","28/08/2016"}
          onInit={this.handleChange.bind(this)}
          startDate="28/08/2016"
          endDate="03/09/2016"
        >
        </DateRange>
      </div>
    )
  }

}

export default DateTab;
