// use calendar component.

import React, { PropTypes } from 'react';
import moment from 'moment';
import MultipleDatePicker from './MultipleDatePicker';

class DateTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      highlightDays: [],
      lessonInfo: [],
      prevMonth: '',
      nextMonth: '',
    };
    this.goToNextMonth = this.goToNextMonth.bind(this)
    this.goToPreviousMonth = this.goToPreviousMonth.bind(this)
  }

  componentDidMount() {
    this.generateHighlightDays(this.props.monthlyTimetable);
  }

  componentWillReceiveProps(nextProps) {
    const { monthlyTimetable: newOne } = nextProps
    const { monthlyTimetable: oldOne } = this.props
    if (JSON.stringify(newOne) !== JSON.stringify(oldOne)) {
      this.generateHighlightDays(newOne);
    }
  }

  goToNextMonth() {
    const { nextMonth } = this.state
    this.props.monthlyTimetableReq(nextMonth)
  }

  goToPreviousMonth() {
    const { prevMonth } = this.state
    this.props.monthlyTimetableReq(prevMonth)
  }

  generateHighlightDays(dataSource) {
    const monthlyTimetable = dataSource.timetable || [];
    const filteredData = [];

    const { pervMonth, nextMonth } = dataSource

    this.setState({ prevMonth: pervMonth, nextMonth });

    for (let i = 0; i < monthlyTimetable.length; i + 1) {
      const tmp = monthlyTimetable[i];
      const lessonData = {
        status: tmp.status,
        studentName: tmp.studentName,
        studentId: tmp.studentId,
        lessonTime: tmp.lessonTime,
      };
      const data = {
        date: tmp.lessonDate,
        lessons: [lessonData],
      };
      if (filteredData.length === 0) {
        filteredData.push(data);
      } else {
        const filteredDates = filteredData.map(item => item.date);
        const searchIndex = filteredDates.indexOf(tmp.lessonDate);

        if (searchIndex === -1) {
          filteredData.push(data)
        } else {
          filteredData[searchIndex].lessons.push(lessonData);
        }
      }
    }
    const myHighlightDays = filteredData.map(item => (
      {
        day: moment(item.date),
        notSelectable: true,
        selected: true,
        title: item.date,
      }
    ));

    this.setState({ highlightDays: myHighlightDays, lessonInfo: filteredData });
  }

  render() {
    return (
      <div className="date">
        <MultipleDatePicker
          highlightDays={this.state.highlightDays}
          lessonInfo={this.state.lessonInfo}
          dayClick={() => false}
          dayHover={() => false}
          callbackContext={this}
          goToNextMonth={this.goToNextMonth}
          goToPreviousMonth={this.goToPreviousMonth}
        />
      </div>
    )
  }
}

DateTab.propTypes = {
  monthlyTimetable: PropTypes.shape({
    pervMonth: PropTypes.string.isRequired,
    nextMonth: PropTypes.string.isRequired,
    timetable: PropTypes.array.isRequired,
  }),
  monthlyTimetableReq: PropTypes.func,
}

export default DateTab;
