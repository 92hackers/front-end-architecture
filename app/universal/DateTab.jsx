// use calendar component.

import React from 'react';
import MultipleDatePicker from './MultipleDatePicker';
import moment from 'moment';

class DateTab extends React.Component {

  constructor (props) {
    super (props);
    this.state = {
      highlightDays: [],
      lessonInfo: []
    };
  }

  componentWillMount () {
    this.generateHighlightDays(this.props.monthlyTimetable);
  }

  render () {
    console.log(this.state.lessonInfo);
    return (
      <div className="date">
        <MultipleDatePicker
          highlightDays={this.state.highlightDays} //details below
          lessonInfo={this.state.lessonInfo}
          dayClick={this.dayClickCallback.bind(this)} //details below
          dayHover={this.dayHoverCallback.bind(this)} //details below
          // changeMonth={this.monthChangeCallback.bind(this)} //details below
          callbackContext={this} //context given to every callback
        />
      </div>
    )
  }

  shouldComponentUpdate () {
    return true;
  }

  generateHighlightDays (dataSource) {
    var monthlyTimetable = dataSource.timetable;
    var filteredData = [];

    for (let i = 0; i < monthlyTimetable.length; i++) {
      let tmp = monthlyTimetable[i];
      let lessonData = {
        status: tmp.status,
        studentName: tmp.studentName,
        studentId: tmp.studentId,
        lessonTime: tmp.lessonTime
      };
      let data = {
        date: tmp.lessonDate,
        lessons: [lessonData]
      };
      if (filteredData.length === 0) {
        filteredData.push(data);
      } else {
        let filteredDates = filteredData.map((item) => item.date);
        var searchIndex = filteredDates.indexOf(tmp.lessonDate);

        if (searchIndex === -1) {
          filteredData.push(data)
        } else {
          filteredData[searchIndex].lessons.push(lessonData);
        }

      }
    }

    console.log(filteredData);

    var myHighlightDays = filteredData.map((item, index) => {
      return {
        day: moment(item.date),
        notSelectable: true,
        selected: true,
        title: item.date
      };
    });

    this.setState({
      highlightDays: myHighlightDays,
      lessonInfo: filteredData
    });

  }

  componentWillReceiveProps (nextProps) {
    if (JSON.stringify(nextProps.monthlyTimetable) !== JSON.stringify(this.props.monthlyTimetable)) {
      this.generateHighlightDays(nextProps.monthlyTimetable);
    }
  }

  dayClickCallback () {
    return false;
  }

  dayHoverCallback () {
    return false;
  }

}

export default DateTab;
