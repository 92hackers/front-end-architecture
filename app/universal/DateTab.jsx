// use calendar component.
//

import React from 'react';
import InfiniteCalendar from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css'; // Make sure to import the default stylesheet

class DateTab extends React.Component {

  constructor (props) {
    super (props);
  }

  render () {

    var today = new Date();
    var maxDate = new Date();
    maxDate = new Date(maxDate.setMonth(today.getMonth() + 2));
    // TODO:  maxDate :  the end date that a teacher can schedules his courses.
    console.log(maxDate);

    return (
      <div className="date">
        <InfiniteCalendar
          width={"100%"}
          height={600}
          minDate={today}
          maxDate={maxDate}
          selectedDate={today}
          keyboardSupport={true}
          showTodayHelper={false}
          onSelect={this.handleSelect.bind(this)}
        />
      </div>
    )
  }

  handleSelect (moment, e) {
    console.log(moment.format("ddd MMM DD YYYY"));
  }
}

export default DateTab;
