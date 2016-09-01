import React from 'react';
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import Notification from './Notification';
import nprogress from 'nprogress';
import api from '../network/api';

class Week extends React.Component {

  constructor (props) {
    super (props);

    this.timesData = [
      "0:00", "", "1:00", "", "2:00", "", "3:00", "", "4:00", "", "5:00", "", "6:00", "", "7:00", "",
      "8:00", "", "9:00", "", "10:00", "", "11:00", "", "12:00", "", "13:00", "", "14:00", "", "15:00", "", "16:00", "",
      "17:00", "", "18:00", "", "19:00", "", "20:00", "", "21:00", "", "22:00", "", "23:00", "", "24:00"
    ];
    this.weekDays = [];

    this.lessonsSelected = [];
    this.lessonsAdded = [];
    this.lessonsDeleted = [];

    this.state = {
      defaultScrollTop: "",
      notification: "",
      lessonsSelected: []
    };

  }

  notify (message) {
    if (!!message.length) {
      this.setState({
        notification: message
      }, () => {
        this.refs.notification.handleNotificationOpen();
      });
    }
  }

  render () {

    const weeklyTimetable = this.props.weeklyTimetable;
    console.log(weeklyTimetable);

    const times = [
      "0:00", "", "1:00", "", "2:00", "", "3:00", "", "4:00", "", "5:00", "", "6:00", "", "7:00", "",
      "8:00", "", "9:00", "", "10:00", "", "11:00", "", "12:00", "", "13:00", "", "14:00", "", "15:00", "", "16:00", "",
      "17:00", "", "18:00", "", "19:00", "", "20:00", "", "21:00", "", "22:00", "", "23:00", "", "24:00"
    ];

    const toRenderTableColums = [
      "12 AM", "1 AM", "2 AM", "3 AM", "4 AM", "5 AM", "6 AM", "7 AM",
      "8 AM", "9 AM", "10 AM", "11 AM", "noon", "1 PM", "2 PM", "3 PM", "4 PM",
      "5 PM", "6 PM", "7 PM", "8 PM", "9 PM", "10 PM", "11 PM",
      "12 AM", "1 AM", "2 AM", "3 AM", "4 AM", "5 AM", "6 AM", "7 AM",
      "8 AM", "9 AM", "10 AM", "11 AM", "noon", "1 PM", "2 PM", "3 PM", "4 PM",
      "5 PM", "6 PM", "7 PM", "8 PM", "9 PM", "10 PM", "11 PM"
    ];

    const tableHeaderStyles = {
      textAlign: "center",
      fontSize: "18px",
      fontWeight: 100,
      color: "#333"
    };

    const months = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    const today = new Date();

    const currentWeekDays = [];

    const oneDayMilSeconds = 1000 * 60 * 60 * 24;

    var prevNDate = (n) => {
      return new Date(today.getTime() - n * oneDayMilSeconds);
    };

    var postNDate = (n) => {
      return new Date(today.getTime() + n * oneDayMilSeconds);
    }

    var currentDay = today.getDay();
    var index = today.getDay();

    currentWeekDays[currentDay] = today.getDate();

    this.weekDays[currentDay] = today.toDateString();

    while (index > 1) {
      index--;
      this.weekDays[index] = prevNDate(currentDay - index).toDateString();
      currentWeekDays[index] = prevNDate(currentDay - index).getDate();
    }

    index = currentDay;

    while (index < 7) {
      index++;
      this.weekDays[index] = postNDate(index - currentDay).toDateString();
      currentWeekDays[index] = postNDate(index - currentDay).getDate();
    }

    const month = months[today.getMonth()];
    const year = today.getFullYear();

    return (
      <div className="one-week">
        <h1 className="week-title">
          <span className="week-month">{month}</span>
          <span className="week-year">{year}</span>
        </h1>
        <ul className="time-labels" onScroll={this.labelScroll.bind(this)}>
          {
            times.map((item, index) => {
              return (
                <li key={index}><span className="label">{item}</span></li>
              )
            })
          }
        </ul>
        <Table selectable={false} multiSelectable={false}>
          <TableHeader displaySelectAll={false}
            adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn style={tableHeaderStyles}>Mon <span className="week-date">{currentWeekDays[1]}</span></TableHeaderColumn>
              <TableHeaderColumn style={tableHeaderStyles}>Tue <span className="week-date">{currentWeekDays[2]}</span></TableHeaderColumn>
              <TableHeaderColumn style={tableHeaderStyles}>Wed <span className="week-date">{currentWeekDays[3]}</span></TableHeaderColumn>
              <TableHeaderColumn style={tableHeaderStyles}>Thu <span className="week-date">{currentWeekDays[4]}</span></TableHeaderColumn>
              <TableHeaderColumn style={tableHeaderStyles}>Fri <span className="week-date">{currentWeekDays[5]}</span></TableHeaderColumn>
              <TableHeaderColumn style={tableHeaderStyles}>Sat <span className="week-date">{currentWeekDays[6]}</span></TableHeaderColumn>
              <TableHeaderColumn style={tableHeaderStyles}>Sun <span className="week-date">{currentWeekDays[7]}</span></TableHeaderColumn>
            </TableRow>
          </TableHeader>
        </Table>
        <div className="table-wrap" onScroll={this.tableScroll.bind(this)}>
          <Table onCellClick={this.cellClick.bind(this)} selectable={false} multiSelectable={false} className="table">
            <TableBody displayRowCheckbox={false} showRowHover={false} style={{position: "relative"}}>
              {
                toRenderTableColums.map((item, index) => {
                  return (
                    <TableRow key={index} hoverable={true}>
                      <TableRowColumn data-x="1" data-y={index} onMouseEnter={this.cellHover.bind(this)} onMouseLeave={this.cellLeave}><span className="unselected">unAvailable</span></TableRowColumn>
                      <TableRowColumn data-x="2" data-y={index} onMouseEnter={this.cellHover.bind(this)} onMouseLeave={this.cellLeave}><span className="unselected">unAvailable</span></TableRowColumn>
                      <TableRowColumn data-x="3" data-y={index} onMouseEnter={this.cellHover.bind(this)} onMouseLeave={this.cellLeave}><span className="unselected">unAvailable</span></TableRowColumn>
                      <TableRowColumn data-x="4" data-y={index} onMouseEnter={this.cellHover.bind(this)} onMouseLeave={this.cellLeave}><span className="unselected">unAvailable</span></TableRowColumn>
                      <TableRowColumn data-x="5" data-y={index} onMouseEnter={this.cellHover.bind(this)} onMouseLeave={this.cellLeave}><span className="unselected">unAvailable</span></TableRowColumn>
                      <TableRowColumn data-x="6" data-y={index} onMouseEnter={this.cellHover.bind(this)} onMouseLeave={this.cellLeave}><span className="unselected">unAvailable</span></TableRowColumn>
                      <TableRowColumn data-x="7" data-y={index} onMouseEnter={this.cellHover.bind(this)} onMouseLeave={this.cellLeave}><span className="unselected">unAvailable</span></TableRowColumn>
                    </TableRow>
                  )
                })
              }
            </TableBody>
          </Table>
        </div>
        <div className="save clearfix">
          <RaisedButton className="left" label="Scroll to Recommended time range" onTouchTap={this.scrollBack.bind(this)}></RaisedButton>
          <RaisedButton className="right" label="Save the Time Table" primary={true} onTouchTap={this.handleSubmit.bind(this)}></RaisedButton>
        </div>
        <Notification ref="notification" message={this.state.notification}></Notification>
      </div>
    )
  }

  validTime (r, c) {
    var fullHours = this.timesData;
    var time = "";

    if (r % 2) {
      time = fullHours[r - 1].replace(/00/, "30");
    } else {
      time = fullHours[r];
    }

    var date = this.weekDays[c];
    console.log(new Date(date + " " + time));
    return new Date(date + " " + time) > new Date();
  }

  cellHover (r,c,e) {

    var ele = r.target;
    var data = ele.dataset;

    if (this.validTime(data.y, data.x)) {
      if (!data.clicked) {
        ele.style.backgroundColor = "#ddd";
      }
    } else {
      ele.children[0].style.display = "block";
    }

  }

  cellLeave (r) {
    var ele = r.target;

    console.log(ele.children[0]);

    if (!ele.dataset.clicked) {
      ele.style.backgroundColor = "#fff";
    }
    if (ele.children[0].style.display === "block") {
      ele.children[0].style.display = "none";
    }
  }

  scrollBack () {

    var tableWrap = document.getElementsByClassName("table-wrap")[0];
    var timeLabel = document.getElementsByClassName("time-labels")[0];

    var scrollY = this.state.defaultScrollTop;
    tableWrap.scrollTop = scrollY;
    timeLabel.scrollTop = scrollY;

  }

  handleSubmit () {

    var self = this;
    var lessonsAdded = this.lessonsAdded;

    if (!lessonsAdded.length) {
      self.notify("please click the time table cell to schedule your lessons.");
      return;
    }

    var data = {
      "add": lessonsAdded
    };

    console.log(data);
    nprogress.start();

    api.NewLessonTimeTable(data,
      { "Authorization": self.props.token },
      "",
      (resp) => {
        nprogress.done();
        if (resp.success) {
          self.notify("Save Time Table Successfully");
        } else {
          self.notify("Please Select Future Date and Time Correctly.");
        }
      },
      (err) => {
        nprogress.done();
        console.log(err);
        self.notify("network is busy, please try again later.");
      }
    );
  }

  cellClick (rowNumber, columnId, e) {

    var target = e.currentTarget;
    var fullHours = this.timesData;
    var time = "";

    var weekIndex = columnId;

    if (!this.validTime(rowNumber, columnId)) {
      return;
    }

    if (rowNumber % 2) {
      time = fullHours[rowNumber - 1].replace(/00/, "30");
    } else {
      time = fullHours[rowNumber];
    }

    var date = this.weekDays[weekIndex];

    var selectedLesson = {
        "lessonDate": date,
        "lessonTime": time,
        "student_id": 0
      };

    if (!target.dataset.clicked) {

      this.lessonsAdded.push(selectedLesson);

      target.style.backgroundColor = "#a8d8ff";
      target.dataset.clicked = "clicked";

    } else {

      this.lessonsAdded.forEach((item, index) => {
        if (item.lessonDate === selectedLesson.lessonDate && item.lessonTime === selectedLesson.lessonTime) {
          this.lessonsAdded.splice(index, 1);
        }
      });

      target.style.backgroundColor = "#ddd";
      target.dataset.clicked = "";
    }

    console.log(this.lessonsAdded);
  }

  tableScroll (e) {

    var timeLables = document.getElementsByClassName("time-labels")[0];
    var tableWrap = document.getElementsByClassName("table-wrap")[0];

    timeLables.scrollTop = tableWrap.scrollTop;

  }

  labelScroll (e) {

    var timeLables = document.getElementsByClassName("time-labels")[0];
    var tableWrap = document.getElementsByClassName("table-wrap")[0];

    tableWrap.scrollTop = timeLables.scrollTop;

  }

  componentDidMount () {
    var self = this;

    //  hightlight today.
    var today = new Date().getDay();
    var weekIndex = "";
    var dateElems = document.getElementsByClassName("week-date");

    weekIndex = today === 0 ? 6 : today - 1;

    dateElems[weekIndex].style.lineHeight = "30px";
    dateElems[weekIndex].style.borderRadius = "50%";
    dateElems[weekIndex].style.backgroundColor = "rgb(255, 64, 129)";
    dateElems[weekIndex].style.color = "white";
    dateElems[weekIndex].style.display = "inline-block";
    dateElems[weekIndex].style.width = "30px";

    // scroll the scrollbar to recommended time range.

    var tableWrap = document.getElementsByClassName("table-wrap")[0];
    var timeLabel = document.getElementsByClassName("time-labels")[0];

    var tpl = this.props.tpl;
    console.log(tpl);

    tableWrap.style.height = tpl.defaultDuration * 100 + 2 * 50 + "px";
    timeLabel.style.height = tpl.defaultDuration * 100 + 2 * 50 + "px";

    var count = 0;
    var fullHours = self.timesData;

    for (; count < fullHours.length; count++) {
      if (tpl.defaultStartTime === fullHours[count]) {
        break;
      }
    }

    var scrollTop = (count - 1) * 50;

    self.setState({
      defaultScrollTop: scrollTop
    });

    tableWrap.scrollTop = scrollTop;
    timeLabel.scrollTop = scrollTop;

  }

}

export default Week;
