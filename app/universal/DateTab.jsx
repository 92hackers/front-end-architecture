// use calendar component.

import React from 'react';
import MultipleDatePicker from './MultipleDatePicker';
import moment from 'moment';

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

    const monthlyTimetable = this.props.monthlyTimetable;
    console.log(monthlyTimetable);

    var today = new Date();
    var maxDate = new Date();

    var myHighlightDays = monthlyTimetable.timetable.map((item, index) => {
      return {
        day: moment(item.lessonDate),
        notSelectable: true,
        selected: true,
        title: item.lessonDate
      }
    });

    return (
      <div className="date">
        <MultipleDatePicker
          highlightDays={myHighlightDays} //details below
          // dayClick={this.dayClickCallback.bind(this)} //details below
          // dayHover={this.dayHoverCallback.bind(this)} //details below
          // changeMonth={this.monthChangeCallback.bind(this)} //details below
          callbackContext={this} //context given to every callback
        />
      </div>
    )

  }

  dayClickCallback () {

  }

  dayHoverCallback () {

  }

  monthChangeCallback () {

  }

}

export default DateTab;
