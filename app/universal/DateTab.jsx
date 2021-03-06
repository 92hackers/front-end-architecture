// use calendar component.

import React from 'react';
import MultipleDatePicker from './MultipleDatePicker';
import moment from 'moment';

class DateTab extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      highlightDays: [],
      lessonInfo: [],
      prevMonth: "",
      nextMonth: ""
    };
    this.goToNextMonth = this.goToNextMonth.bind(this)
    this.goToPreviousMonth = this.goToPreviousMonth.bind(this)
  }

  render() {
    return (
      <div className="date">
        <MultipleDatePicker
          highlightDays={this.state.highlightDays}
          lessonInfo={this.state.lessonInfo}
          dayClick={this.dayClickCallback.bind(this)}
          dayHover={this.dayHoverCallback.bind(this)}
          callbackContext={this}
          goToNextMonth={this.goToNextMonth}
          goToPreviousMonth={this.goToPreviousMonth}
        />
      </div>
    )
  }

  componentDidMount() {
    this.generateHighlightDays(this.props.monthlyTimetable);
  }

  shouldComponentUpdate() {
    return true;
  }

  goToNextMonth() {
    const {nextMonth} = this.state

    this.props.monthlyTimetableReq(nextMonth)
  }

  goToPreviousMonth() {
    const {prevMonth} = this.state
    this.props.monthlyTimetableReq(prevMonth)
  }

  generateHighlightDays(dataSource) {
    var monthlyTimetable = dataSource.timetable || [];
    var filteredData = [];

    const {pervMonth, nextMonth} = dataSource

    this.setState({prevMonth: pervMonth, nextMonth});

    for (let i = 0; i < monthlyTimetable.length; i++) {
      let tmp = monthlyTimetable[i];
      const { lessonDate, status, studentName, studentId, lessonTime, trialFlag } = tmp
      let lessonData = {
        status,
        studentName,
        studentId,
        lessonTime,
        trialFlag,
      };
      let data = {
        date: lessonDate,
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

    var myHighlightDays = filteredData.map((item, index) => {
      return {
        day: moment(item.date),
        notSelectable: true,
        selected: true,
        title: item.date
      };
    });

    this.setState({highlightDays: myHighlightDays, lessonInfo: filteredData});

  }

  componentWillReceiveProps(nextProps) {
    if (JSON.stringify(nextProps.monthlyTimetable) !== JSON.stringify(this.props.monthlyTimetable)) {
      this.generateHighlightDays(nextProps.monthlyTimetable);
    }
  }

  dayClickCallback() {
    return false;
  }

  dayHoverCallback() {
    return false;
  }

}

export default DateTab;
