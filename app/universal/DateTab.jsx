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

    var today = new Date();
    var maxDate = new Date();

    var myHighlightDays = [
      {
        day: moment("2016-08-29"),
        // css: 'birthday', //a beautiful color for this special day
        notSelectable: true,
        selected: true,
        title: 'My birthday today !!!'
      },
      {
        day: moment("2016-08-30"),
        notSelectable: true,
        selected: true
      },
      {
        day: moment("2016-08-31"),
        notSelectable: true,
        selected: true
      },
      {
        day: moment("2016-09-01"),
        selected: true
      }
    ];

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
