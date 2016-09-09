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

    this.lessonsAdded = [];
    this.lessonsDeleted = [];

    this.state = {
      defaultScrollTop: "",
      notification: "",
      existedTemplate: this.props.tpl.existedTemplate,
      lessonsSelected: []
    };

    this.hoursRawData = [
      "0:00", "0:30", "1:00", "1:30", "2:00", "2:30", "3:00", "3:30", "4:00", "4:30", "5:00", "5:30", "6:00", "6:30", "7:00", "7:30",
      "8:00", "8:30", "9:00", "9:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
      "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00", "22:30", "23:00", "23:30", "24:00"
    ];

  }

  renderData (lessonData, immutable) {
      let self = this;
      let elems = document.getElementsByClassName("cell");
      let tpl = lessonData.map((item, index) => {
        // var time = item.beginTime ? item.beginTime : item.lessonTime;
        var time = item.beginTime || item.lessonTime;

        return {
         week: parseInt(item.weekday),
    beginTime: self.hoursRawData.indexOf(time),
       status: item.status || "",
           id:  item.id || ""
        };

      });


      var matched = 0;

      for (let i = 0; i < elems.length; i++) {
        for (let j = 0; j < tpl.length; j++) {
          let elem = elems[i];
          let dataset = elems[i].dataset;
          let oneTpl = tpl[j];

          if (parseInt(dataset.x) === oneTpl.week && parseInt(dataset.y) === oneTpl.beginTime) {
            matched++;
            elem.dataset.clicked = "clicked";

            // 下面的代码是已经保存过后的当周的课程，渲染出来过后，需要在上面记录一些内容。
            if (immutable) {
              elem.dataset.immutable = "immutable";
              if (oneTpl.status !== undefined) {
                elem.dataset.status =  oneTpl.status;
              }
              elem.dataset.id = oneTpl.id;
            }
            elem.style.backgroundColor = "#75c4ff";
            break;
          }
        }

        if (matched === tpl.length) {
          break;
        }
      }

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

    var currentDay = today.getDay() - 1 === -1 ? 6 : today.getDay() - 1;
    var index = today.getDay() - 1 === -1 ? 6 : today.getDay() - 1;

    currentWeekDays[currentDay] = today.getDate();

    this.weekDays[currentDay] = today.toDateString();

    while (index > 0) {
      index--;
      this.weekDays[index] = prevNDate(currentDay - index).toDateString();
      currentWeekDays[index] = prevNDate(currentDay - index).getDate();
    }

    index = currentDay;

    while (index < 6) {
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
              <TableHeaderColumn style={tableHeaderStyles}>Mon <span className="week-date">{currentWeekDays[0]}</span></TableHeaderColumn>
              <TableHeaderColumn style={tableHeaderStyles}>Tue <span className="week-date">{currentWeekDays[1]}</span></TableHeaderColumn>
              <TableHeaderColumn style={tableHeaderStyles}>Wed <span className="week-date">{currentWeekDays[2]}</span></TableHeaderColumn>
              <TableHeaderColumn style={tableHeaderStyles}>Thu <span className="week-date">{currentWeekDays[3]}</span></TableHeaderColumn>
              <TableHeaderColumn style={tableHeaderStyles}>Fri <span className="week-date">{currentWeekDays[4]}</span></TableHeaderColumn>
              <TableHeaderColumn style={tableHeaderStyles}>Sat <span className="week-date">{currentWeekDays[5]}</span></TableHeaderColumn>
              <TableHeaderColumn style={tableHeaderStyles}>Sun <span className="week-date">{currentWeekDays[6]}</span></TableHeaderColumn>
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
                      <TableRowColumn className="cell" data-x="0" data-y={index} onMouseEnter={this.cellHover.bind(this)} onMouseLeave={this.cellLeave}><span className="unselected">unAvailable</span></TableRowColumn>
                      <TableRowColumn className="cell" data-x="1" data-y={index} onMouseEnter={this.cellHover.bind(this)} onMouseLeave={this.cellLeave}><span className="unselected">unAvailable</span></TableRowColumn>
                      <TableRowColumn className="cell" data-x="2" data-y={index} onMouseEnter={this.cellHover.bind(this)} onMouseLeave={this.cellLeave}><span className="unselected">unAvailable</span></TableRowColumn>
                      <TableRowColumn className="cell" data-x="3" data-y={index} onMouseEnter={this.cellHover.bind(this)} onMouseLeave={this.cellLeave}><span className="unselected">unAvailable</span></TableRowColumn>
                      <TableRowColumn className="cell" data-x="4" data-y={index} onMouseEnter={this.cellHover.bind(this)} onMouseLeave={this.cellLeave}><span className="unselected">unAvailable</span></TableRowColumn>
                      <TableRowColumn className="cell" data-x="5" data-y={index} onMouseEnter={this.cellHover.bind(this)} onMouseLeave={this.cellLeave}><span className="unselected">unAvailable</span></TableRowColumn>
                      <TableRowColumn className="cell" data-x="6" data-y={index} onMouseEnter={this.cellHover.bind(this)} onMouseLeave={this.cellLeave}><span className="unselected">unAvailable</span></TableRowColumn>
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
    return new Date(date + " " + time) > new Date();
  }

  cellHover (r,c,e) {

    var ele = r.target;
    var data = ele.dataset;

    if (this.validTime(data.y, data.x)) {
      if (!data.clicked) {
        ele.style.backgroundColor = "#ecf0f1";
      }
    } else {
      ele.children[0].style.display = "block";
    }

  }

  cellLeave (r) {
    var ele = r.target;

    if (!ele.dataset.clicked) {
      ele.style.backgroundColor = "#fff";
    }

    if (ele.className === "unselected") {
      ele.style.display = "none";
    } else if ( ele.children[0].style.display === "block") {
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
    var lessonsDeleted = this.lessonsDeleted;

    if (!lessonsAdded.length && !lessonsDeleted.length) {
      self.notify("please click the time table cell to schedule your lessons.");
      return;
    }

    var data = {
      "add": lessonsAdded,
      "delete": lessonsDeleted
    };

    nprogress.start();

    api.NewLessonTimeTable(data,
      { "Authorization": self.props.token },
      "",
      (resp) => {
        nprogress.done();
        if (resp.success) {
          self.notify("Save Time Table Successfully");
          self.props.weeklyTimetableReq();
          self.props.monthlyTimetableReq();
          self.lessonsAdded = [];
          self.lessonsDeleted = [];
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
    var dataset = target.dataset;
    var fullHours = this.timesData;
    var time = "";

    if (!this.validTime(rowNumber, columnId - 1)) {
      return;
    }

    // if status > 0, the lesson had been booked.

    if (dataset.immutable === "immutable" && dataset.status > 0) {
      this.notify("This Lesson Can not be Cancelled.");
      return;
    }

    if (rowNumber % 2) {
      time = fullHours[rowNumber - 1].replace(/00/, "30");
    } else {
      time = fullHours[rowNumber];
    }

    var date = this.weekDays[columnId - 1];

    var selectedLesson = {
      "lessonDate": date,
      "lessonTime": time,
      "student_id": 0
    };

    if (!dataset.clicked) {           //  select the item.

      if (!dataset.immutable) {          //  only add  new lesson.
        this.lessonsAdded.push(selectedLesson);
      }

      target.style.backgroundColor = "#a8d8ff";
      target.dataset.clicked = "clicked";

      if (dataset.immutable === "immutable") {
        let index = this.lessonsDeleted.indexOf(dataset.id);
        if (index !== -1) {
          this.lessonsDeleted.splice(index, 1);
        }
      }

    } else {                          //   calcel selected.

      this.lessonsAdded.forEach((item, index) => {
        if (item.lessonDate === selectedLesson.lessonDate && item.lessonTime === selectedLesson.lessonTime) {
          this.lessonsAdded.splice(index, 1);
        }
      });

      if (dataset.immutable === "immutable") {
        this.lessonsDeleted.push(dataset.id);
      }

      target.style.backgroundColor = "#ecf0f1";
      target.dataset.clicked = "";
    }

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

  componentWillReceiveProps (nextProps) {
    if (JSON.stringify(nextProps) !== JSON.stringify(this.props)) {

      var weeklyTimetable = nextProps.weeklyTimetable.timetable;
      var existedTemplate = this.state.existedTemplate;

      if (weeklyTimetable.length > 0) {
        this.renderData(weeklyTimetable, true);
      } else if (existedTemplate.length > 0) {
        this.renderData(existedTemplate);

      existedTemplate.forEach((item, index) => {
        var date = self.weekDays[parseInt(item.weekday)];
        if (new Date(date + " " + item.beginTime) > new Date()) {
          self.lessonsAdded.push({
            lessonDate: date,
            lessonTime: item.beginTime,
            "student_id": 0
          });
        }
      });

      }
    }
  }

  componentDidMount () {
    var self = this;

    console.log(this.props.weeklyTimetable);

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

    // 优先加载 weekly 已经设置的数据， 如果没有，则设置 template 的数据。

    var weeklyTimetable = this.props.weeklyTimetable.timetable;
    var existedTemplate = this.state.existedTemplate;

    if (weeklyTimetable.length > 0) {
      this.renderData(weeklyTimetable, true);
    } else if (existedTemplate.length > 0) {
      this.renderData(existedTemplate);

    existedTemplate.forEach((item, index) => {
      var date = self.weekDays[parseInt(item.weekday)];
      if (new Date(date + " " + item.beginTime) > new Date()) {
        self.lessonsAdded.push({
          lessonDate: date,
          lessonTime: item.beginTime,
          "student_id": 0
        });
      }
    });

    }

  }

}

export default Week;
