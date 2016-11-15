import React from 'react';
import {connect} from 'react-redux';
import { isEqual } from 'lodash';
import moment from 'moment';
import {notificationActions} from '../actions';

import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import nprogress from 'nprogress';
import api from '../network/api';

class WeekComp extends React.Component {

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
    this.templateData = [];

    this.state = {
      defaultScrollTop: "",
      notification: "",
      existedTemplate: this.props.tpl.existedTemplate,
      lessonsSelected: [],
      month: "",
      year: "",
      currentWeekDays: [],
      historyData: false,
      weekDays: [],
      prevWeek: "",
      nextWeek: "",
      reqParam: "",
    };

    this.hoursRawData = [
      "0:00", "0:30", "1:00", "1:30", "2:00", "2:30", "3:00", "3:30", "4:00", "4:30", "5:00", "5:30", "6:00", "6:30", "7:00", "7:30",
      "8:00", "8:30", "9:00", "9:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
      "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00", "22:30", "23:00", "23:30", "24:00"
    ];

  }

  renderData (lessonData, immutable = false) {
      let self = this;
      let elems = document.getElementsByClassName("cell");
      let tpl = lessonData.map((item, index) => {
        // var time = item.beginTime ? item.beginTime : item.lessonTime;
        var time = item.beginTime || item.lessonTime;

        return {
         week: parseInt(item.weekday),
    beginTime: self.hoursRawData.indexOf(time),
       status: item.status || "",
           id: item.id || "",
  studentName: item.studentName || "",
    trialFlag: item.trialFlag || '',
        };

      });

      var matched = 0;

      for (let i = 0; i < elems.length; i++) {
        for (let j = 0; j < tpl.length; j++) {

          let elem = elems[i];
          let dataset = elems[i].dataset;
          let oneTpl = tpl[j];

          var x = parseInt(dataset.x);
          var y = parseInt(dataset.y);

          if (x === oneTpl.week && y === oneTpl.beginTime) {

            if (!immutable && !this.validTime(y, x))  {
              break;
            }

            matched++;
            elem.dataset.clicked = "clicked";

            // 下面的代码是已经保存过后的当周的课程，渲染出来过后，需要在上面记录一些内容。
            if (immutable) {
              elem.dataset.immutable = "immutable";
              if (oneTpl.status !== undefined) {
                elem.dataset.status =  oneTpl.status;
              }
              elem.dataset.id = oneTpl.id;

              let backgroundColor = "";
              switch (parseInt(oneTpl.status)) {
                case 0 :
                  backgroundColor = "#ff9c00";
                  break;
                case 1 :
                  backgroundColor = "#b7b7b7";
                  break;
                case 2 :
                  backgroundColor = "#5cc92b";
                  break;
                case 3 :
                case 4 :
                case 5 :
                case 6 :
                  backgroundColor = "#ed391d";
                  break;
                case 9 :
                  backgroundColor = "#ff9c00";
                  break;
                case 10 :
                  backgroundColor = "#6ca4f8";
                  break;
                default :
                  backgroundColor = "transparent";
              }
              elem.style.backgroundColor = backgroundColor;

              const star = elem.children[1];
              const student = elem.children[2];

              if (parseInt(oneTpl.trialFlag) === 1) {
                star.children[0].style.display = 'inline-block'
              } else {
                student.style.paddingLeft = '20px'
              }

              const enName = student.children[0]
              const cnName  = student.children[1]

              const { studentName } = oneTpl
              if (studentName.length > 0) {
                student.style.display = 'inline-block'
                const nameArr = studentName.split('(')
                enName.innerText = nameArr[0]
                cnName.innerText = `(${nameArr[1]}`
              }
            } else {
              elem.style.backgroundColor = "#a8d8ff";
            }
            break;
          }
        }

        if (matched === tpl.length) {
          break;
        }
      }
  }

  cleanData () {
    var elems = document.getElementsByClassName("cell");
    var count = 0;
    for (let i = 0; i < elems.length; i++) {
      let item = elems[i];
      if (item.dataset.clicked === "clicked") {
        item.dataset.clicked = "";
        item.dataset.immutable = "";
        item.dataset.status = "";
        item.dataset.id = "";
        item.style.backgroundColor = "transparent";
        item.children[1].style.display = 'none';
        item.children[2].children[0].innerText = '';
        item.children[2].children[1].innerText = '';
        count++;
      }
      if (count === elems.length) {
        break;
      }
    }

    var dateElems = document.getElementsByClassName("week-date");

    for (let i = 0; i < dateElems.length; i++) {
      let item = dateElems[i];
      if (item.dataset.today === "today") {
        item.style.backgroundColor = "transparent";
        item.style.color = "inherit";
        item.style.lineHeight = "inherit";
        item.style.width = "inherit";
        item.style.borderRadius = "inherit";
      }
    }

  }

  goPrevWeek () {
    var prevWeek = this.state.prevWeek;

    if (this.templateData.length > 0) {
      if (this.isTemplateDataChanged()) {
        this.props.showNotification("Please enter and save your availability before moving on to the next week.");
        return;
      }
    } else {
      if (this.lessonsAdded.length > 0 || this.lessonsDeleted.length > 0) {
        this.props.showNotification("Please enter and save your availability before moving on to the next week.");
        return;
      }
    }

    this.lessonsAdded = [];
    this.lessonsDeleted = [];
    this.templateData = [];

    this.setState({
      reqParam: prevWeek
    });
    nprogress.start();
    this.cleanData();
    this.renderMetaData(prevWeek);
    this.props.weeklyTimetableReq(prevWeek);
    if (moment(prevWeek) < moment()) {
      this.setState({
        historyData: true         // 因为有历史数据为空的情况，未来数据为空的情况，只能设置这样一个标记来进行区分，历史数据为空的情况可以不予考虑,但是未来数据为空需要加载周模板。
      });
    }
  }

  goNextWeek () {
    var nextWeek = this.state.nextWeek;

    if (this.templateData.length > 0) {
      if (this.isTemplateDataChanged()) {
        this.props.showNotification("Please enter and save your availability before moving on to the next week.");
        return;
      }
    } else {
      if (this.lessonsAdded.length > 0 || this.lessonsDeleted.length > 0) {
        this.props.showNotification("Please enter and save your availability before moving on to the next week.");
        return;
      }
    }

    this.lessonsAdded = [];
    this.lessonsDeleted = [];
    this.templateData = [];

    this.setState({
      reqParam: nextWeek
    });
    nprogress.start();
    this.cleanData();
    this.renderMetaData(nextWeek);
    this.props.weeklyTimetableReq(nextWeek);
    if (moment(nextWeek) > moment()) {
      this.setState({
        historyData: false
      });
    }
  }

  isTemplateDataChanged() {
    const lessonsAdded = this.lessonsAdded;
    const weeklyData = this.props.weeklyTimetable;
    const weeklyTimetable = weeklyData.timetable || [];
    const existedTemplate = this.state.existedTemplate || [];

    const dateCompare = (a, b) => {
      return new Date(`${a.lessonDate} ${a.lessonTime}`) - new Date(`${b.lessonDate} ${b.lessonTime}`)
    }

    if (!weeklyTimetable.length && existedTemplate.length > 0) {
      return !(isEqual(lessonsAdded.sort(dateCompare), this.templateData.sort(dateCompare)));
    }
  }

  renderMetaData (date) {

    var today = moment(date).toDate() || moment().toDate();     // default today.

    const months = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const currentWeekDays = [];

    const oneDayMilSeconds = 1000 * 60 * 60 * 24;

    var prevNDate = (n) => {
      return new Date(today.getTime() - n * oneDayMilSeconds);
    };

    var postNDate = (n) => {
      return new Date(today.getTime() + n * oneDayMilSeconds);
    }

    var currentDay = today.getDay() - 1 === -1 ? 6 : today.getDay() - 1;
    var index = currentDay;

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

    this.highlightToday(this.weekDays)

    this.setState({
      year: year,
      month: month,
      weekDays: this.weekDays,
      currentWeekDays: currentWeekDays
    });

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

    const tableCellStyles = {
      overflow: 'visible',
      whiteSpace: 'pre-line',
      textOverflow: 'inherit',
      wordWrap: 'break-word',
      // position: 'relative',
      paddingLeft: 0,
      paddingRight: 0,
    }

    const currentWeekDays = this.state.currentWeekDays;

    var month = this.state.month || "";
    var year = this.state.year || "";

    return (
      <div className="one-week">
        <h1 className="week-title">
          <span className="arrow" onClick={this.goPrevWeek.bind(this)} title="Previous Week">&lt;</span>
          <span className="month">
            <span className="week-month">{month}</span>
            <span className="week-year">{year}</span>
          </span>
          <span className="arrow" onClick={this.goNextWeek.bind(this)} title="Next Week">&gt;</span>
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
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
          >
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
                      {
                        [0,1,2,3,4,5,6].map((innerItem, innerKey) => {
                          return (
                            <TableRowColumn
                              key={innerKey}
                              style={tableCellStyles}
                              className="cell"
                              data-x={innerItem}
                              data-y={index}
                              onMouseEnter={this.cellHover.bind(this)}
                              onMouseLeave={this.cellLeave}
                            >
                              <span className="unselected">Unavailable</span>
                              <span className="star-wrap">
                                <i className="fa fa-star" />
                              </span>
                              <div className="student-name">
                                <div className="en-name"></div>
                                <div className="cn-name"></div>
                              </div>
                            </TableRowColumn>
                          )
                        })
                      }
                    </TableRow>
                  )
                })
              }
            </TableBody>
          </Table>
        </div>
        <div className="save clearfix">
          <RaisedButton className="left" label="Peak Times" onTouchTap={this.scrollBack.bind(this)}></RaisedButton>
          <RaisedButton className="right" label="Save Timetable" primary={true} onTouchTap={this.handleSubmit.bind(this)}></RaisedButton>
        </div>
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
    } else if (!data.status && ele.children[0]) {
      ele.children[0].style.display = "block";
    }

  }

  cellLeave (r) {
    var ele = r.target;

    if (!ele.dataset.clicked && ele.className === "cell") {
      ele.style.backgroundColor = "transparent";
    }

    if (ele.className === "unselected") {
      ele.style.display = "none";
    } else if ( ele.className === "cell" && ele.children[0].style.display === "block") {
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

    if (!lessonsAdded.length && !lessonsDeleted.length) {         //  判断 add, delete 数组 是否为空。
      this.props.showNotification("Please enter your availability in the timetable before saving.");
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
          self.props.showNotification("Timetable saved successfully.");
          let param = self.state.reqParam;
          self.props.weeklyTimetableReq(param);
          self.props.monthlyTimetableReq(param);
          self.lessonsAdded = [];
          self.lessonsDeleted = [];
          self.templateData = [];
        } else {
          self.props.showNotification("Please select future date and time correctly.");
        }
      },
      (err) => {
        nprogress.done();
        self.props.networkError();
      }
    );

  }

  cellClick (rowNumber, columnId, e) {
    const self = this;
    var target = e.currentTarget;
    var dataset = target.dataset;
    var fullHours = this.timesData;
    var time = "";

    if (!this.validTime(rowNumber, columnId - 1)) {
      return;
    }
    // if status > 0, the lesson had been booked.

    if (dataset.immutable === "immutable" && dataset.status > 0) {
      self.props.showNotification("This lesson has already been booked by a student.");
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

      target.style.backgroundColor = "#ff9c00";
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
    var self = this;
    if (JSON.stringify(nextProps) !== JSON.stringify(this.props)) {

      nprogress.done();

      if (!this.state.prevWeek && !this.state.nextWeek) {
        this.renderMetaData(nextProps.weeklyTimetable.weekFrom);
      }

      var weeklyTimetable = nextProps.weeklyTimetable.timetable || [];
      var existedTemplate = this.state.existedTemplate || [];

      var weeklyData = nextProps.weeklyTimetable;
      this.setState({
        prevWeek: weeklyData.pervWeek,
        nextWeek: weeklyData.nextWeek
      });

      if (weeklyTimetable.length > 0) {
        this.renderData(weeklyTimetable, true);
      } else if (existedTemplate.length > 0 && !this.state.historyData) {
        this.renderData(existedTemplate);
        existedTemplate.forEach((item, index) => {
          var date = self.weekDays[parseInt(item.weekday)];
          if (moment(date + " " + item.beginTime) > moment()) {
            const data = {
              lessonDate: date,
              lessonTime: item.beginTime,
              "student_id": 0
            }
            self.lessonsAdded.push(data);
            self.templateData.push(data);
          }
        });
      }
    }
  }

  highlightToday(weekDays) {
    var today = new Date();

    if (weekDays.indexOf(today.toDateString()) === -1) {
      return ;
    }

    var weekIndex = "";
    var dateElems = document.getElementsByClassName("week-date");

    weekIndex = today.getDay() === 0 ? 6 : today.getDay() - 1;

    dateElems[weekIndex].dataset.today = "today";
    dateElems[weekIndex].style.lineHeight = "30px";
    dateElems[weekIndex].style.borderRadius = "50%";
    dateElems[weekIndex].style.backgroundColor = "rgb(255, 64, 129)";
    dateElems[weekIndex].style.color = "white";
    dateElems[weekIndex].style.display = "inline-block";
    dateElems[weekIndex].style.width = "30px";
  }

  componentDidMount () {
    var self = this;

    var weeklyData = this.props.weeklyTimetable;

    this.renderMetaData(weeklyData.weekFrom);

    this.setState({
      prevWeek: weeklyData.pervWeek,
      nextWeek: weeklyData.nextWeek
    });

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

    var weeklyTimetable = weeklyData.timetable || [];
    var existedTemplate = this.state.existedTemplate || [];


    if (weeklyTimetable.length > 0) {
      this.renderData(weeklyTimetable, true);
    } else if (existedTemplate.length > 0) {
      this.renderData(existedTemplate);

    existedTemplate.forEach((item, index) => {
      var date = self.weekDays[parseInt(item.weekday)];
      if (moment(date + " " + item.beginTime) > moment()) {
        const data = {
          lessonDate: date,
          lessonTime: item.beginTime,
          "student_id": 0
        }
        self.lessonsAdded.push(data);
        self.templateData.push(data);
      }
    });

    }

  }

}

const mapDispatchToProps = (dispatch) => {
  return {
    showNotification: (message) => {
      dispatch(notificationActions.showNotification(message));
    },
    networkError: () => {
      dispatch(notificationActions.networkError());
    }
  }
}

const Week = connect(null, mapDispatchToProps)(WeekComp);

export default Week;
