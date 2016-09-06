// use calendar component.

import React from 'react';
import MultipleDatePicker from './MultipleDatePicker';
import moment from 'moment';

class DateTab extends React.Component {

  constructor (props) {
    super (props);
    this.state = {
      highlightDays: []
    };
  }


  render () {
    return (
      <div className="date">
        <MultipleDatePicker
          highlightDays={this.state.highlightDays} //details below
          // dayClick={this.dayClickCallback.bind(this)} //details below
          // dayHover={this.dayHoverCallback.bind(this)} //details below
          // changeMonth={this.monthChangeCallback.bind(this)} //details below
          callbackContext={this} //context given to every callback
        />
      </div>
    )
  }

  shouldComponentUpdate () {
    return true;
  }

  componentDidMount () {
    this.generateHighlightDays(this.props.monthlyTimetable);
  }

  generateHighlightDays (dataSource) {
    var monthlyTimetable = dataSource;
    var myHighlightDays = monthlyTimetable.timetable.map((item, index) => {
      return {
        day: moment(item.lessonDate),
        notSelectable: true,
        selected: true,
        title: item.lessonDate
      }
    });

    this.setState({
      highlightDays: myHighlightDays
    });
  }

  componentWillReceiveProps (nextProps) {
    if (JSON.stringify(nextProps.monthlyTimetable) !== JSON.stringify(this.props.monthlyTimetable)) {
      this.generateHighlightDays(nextProps.monthlyTimetable);
    }
  }

  dayClickCallback () {

  }

  dayHoverCallback () {

  }

  monthChangeCallback () {

  }

}

export default DateTab;
