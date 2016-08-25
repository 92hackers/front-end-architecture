// use calendar component.
//

import React from 'react';
import { DateRange } from 'react-date-range';
// import InfiniteCalendar from 'react-infinite-calendar';
// import 'react-infinite-calendar/styles.css'; // Make sure to import the default stylesheet

class DateTab extends React.Component {

  constructor (props) {
    super (props);
  }

  handleSelect (range) {
    console.log(range);
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
        >
        </DateRange>
      </div>
    )
  }

}

export default DateTab;
