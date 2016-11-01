/* eslint react/sort-comp: 0*/
import React from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import nprogress from 'nprogress';
import { autobind } from 'core-decorators'

export default class Week extends React.Component {

  constructor(props) {
    super(props);

    this.timesData = [
      '0:00', '', '1:00', '', '2:00', '', '3:00', '', '4:00', '', '5:00', '', '6:00', '', '7:00', '',
      '8:00', '', '9:00', '', '10:00', '', '11:00', '', '12:00', '', '13:00', '', '14:00', '', '15:00', '', '16:00', '',
      '17:00', '', '18:00', '', '19:00', '', '20:00', '', '21:00', '', '22:00', '', '23:00', '', '24:00',
    ];
    this.weekDays = [];

    this.lessonsAdded = [];
    this.lessonsDeleted = [];

    this.state = {
      defaultScrollTop: '',
      notification: '',
      existedTemplate: this.props.tpl.existedTemplate,
      lessonsSelected: [],
      month: '',
      year: '',
      currentWeekDays: [],
      historyData: false,
      weekDays: [],
      prevWeek: '',
      nextWeek: '',
      reqParam: '',
      timetableClicked: false,
    };

    this.hoursRawData = [
      '0:00', '0:30', '1:00', '1:30', '2:00', '2:30', '3:00', '3:30', '4:00', '4:30', '5:00', '5:30', '6:00', '6:30', '7:00', '7:30',
      '8:00', '8:30', '9:00', '9:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
      '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00', '22:30', '23:00', '23:30', '24:00',
    ];
  }

  componentWillMount() {
    const weeklyData = this.props.weeklyTimetable;
    this.setState({
      prevWeek: weeklyData.pervWeek,
      nextWeek: weeklyData.nextWeek,
    });
  }

  componentDidMount() {
    const self = this;

    const weeklyData = this.props.weeklyTimetable;

    this.renderMetaData(new Date(weeklyData.weekFrom));

    //  hightlight today.
    this.highlightToday();

    // scroll the scrollbar to recommended time range.
    const tableWrap = document.getElementsByClassName('table-wrap')[0];
    const timeLabel = document.getElementsByClassName('time-labels')[0];

    const tpl = this.props.tpl;

    tableWrap.style.height = `${(tpl.defaultDuration * 100) + 100}px`
    timeLabel.style.height = `${(tpl.defaultDuration * 100) + 100}px`

    let count = 0;
    const fullHours = self.timesData;

    for (; count < fullHours.length; count++) {
      if (tpl.defaultStartTime === fullHours[count]) {
        break;
      }
    }

    const scrollTop = (count - 1) * 50;

    self.setState({
      defaultScrollTop: scrollTop,
    });

    tableWrap.scrollTop = scrollTop;
    timeLabel.scrollTop = scrollTop;

    // 优先加载 weekly 已经设置的数据， 如果没有，则设置 template 的数据。

    const weeklyTimetable = weeklyData.timetable || [];
    const existedTemplate = this.state.existedTemplate || [];


    if (weeklyTimetable.length > 0) {
      this.renderData(weeklyTimetable, true);
    } else if (existedTemplate.length > 0) {
      this.renderData(existedTemplate);

      existedTemplate.forEach((item) => {
        const date = self.weekDays[parseInt(item.weekday)];
        if (new Date(`${date} ${item.beginTime}`) > new Date()) {
          self.lessonsAdded.push({
            lessonDate: date,
            lessonTime: item.beginTime,
            student_id: 0,
          });
        }
      });
    }
  }

  @autobind
  goPrevWeek() {
    const prevWeek = this.state.prevWeek;

    if (this.state.timetableClicked) {
      this.props.showNotification('Please enter and save your availability before moving on to the next week.');
      return;
    }

    this.lessonsAdded = [];
    this.lessonsDeleted = [];

    this.setState({
      reqParam: prevWeek,
    });
    nprogress.start();
    this.cleanData();
    this.renderMetaData(new Date(prevWeek));
    this.props.weeklyTimetableReq(prevWeek);
    if (new Date(prevWeek) < new Date()) {
      this.setState({
        historyData: true,
      });
    }
    this.highlightToday();
  }

  @autobind
  goNextWeek() {
    const nextWeek = this.state.nextWeek;

    if (this.state.timetableClicked) {
      this.props.showNotification('Please enter and save your availability before moving on to the next week.');
      return;
    }

    this.lessonsAdded = [];
    this.lessonsDeleted = [];

    this.setState({
      reqParam: nextWeek,
    });
    nprogress.start();
    this.cleanData();
    this.renderMetaData(new Date(nextWeek));
    this.props.weeklyTimetableReq(nextWeek);
    if (new Date(nextWeek) > new Date()) {
      this.setState({
        historyData: false,
      });
    }
    this.highlightToday();
  }

  @autobind
  cleanData() {
    const elems = document.getElementsByClassName('cell');
    let count = 0;
    for (let i = 0; i < elems.length; i + 1) {
      const item = elems[i];
      if (item.dataset.clicked === 'clicked') {
        item.dataset.clicked = '';
        item.dataset.immutable = '';
        item.dataset.status = '';
        item.dataset.id = '';
        item.style.backgroundColor = 'transparent';
        item.children[1].innerText = '';
        count += 1
      }
      if (count === elems.length) {
        break;
      }
    }

    const dateElems = document.getElementsByClassName('week-date');

    for (let i = 0; i < dateElems.length; i + 1) {
      const item = dateElems[i];
      if (item.dataset.today === 'today') {
        item.style.backgroundColor = 'transparent';
        item.style.color = 'inherit';
        item.style.lineHeight = 'inherit';
        item.style.width = 'inherit';
        item.style.borderRadius = 'inherit';
      }
    }
  }

  @autobind
  renderMetaData(date = new Date()) {
    const today = date

    const months = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December',
    ];
    const currentWeekDays = [];

    const oneDayMilSeconds = 1000 * 60 * 60 * 24;

    const prevNDate = n => new Date(today.getTime() - (n * oneDayMilSeconds));

    const postNDate = n => new Date(today.getTime() + (n * oneDayMilSeconds));

    const currentDay = today.getDay() - 1 === -1 ? 6 : today.getDay() - 1;
    let index = currentDay;

    currentWeekDays[currentDay] = today.getDate();

    this.weekDays[currentDay] = today.toDateString();

    while (index > 0) {
      index += 1;
      this.weekDays[index] = prevNDate(currentDay - index).toDateString();
      currentWeekDays[index] = prevNDate(currentDay - index).getDate();
    }

    index = currentDay;

    while (index < 6) {
      index += 1
      this.weekDays[index] = postNDate(index - currentDay).toDateString()
      currentWeekDays[index] = postNDate(index - currentDay).getDate()
    }

    const month = months[today.getMonth()];
    const year = today.getFullYear();

    this.setState({
      year,
      month,
      weekDays: this.weekDays,
      currentWeekDays,
    });
  }

  @autobind
  renderData(lessonData, immutable = false) {
    const self = this;
    const elems = document.getElementsByClassName('cell');
    const tpl = lessonData.map((item) => {
      // const time = item.beginTime ? item.beginTime : item.lessonTime;
      const time = item.beginTime || item.lessonTime;

      return {
        week: parseInt(item.weekday, 10),
        beginTime: self.hoursRawData.indexOf(time),
        status: item.status || '',
        id: item.id || '',
        studentName: item.studentName || '',
      };
    });

    let matched = 0;

    for (let i = 0; i < elems.length; i + 1) {
      for (let j = 0; j < tpl.length; j + 1) {
        const elem = elems[i];
        const dataset = elems[i].dataset;
        const oneTpl = tpl[j];

        const x = parseInt(dataset.x, 10);
        const y = parseInt(dataset.y, 10);

        if (x === oneTpl.week && y === oneTpl.beginTime) {
          if (!immutable && !this.validTime(y, x)) {
            break;
          }

          matched += 1;
          elem.dataset.clicked = 'clicked';

          // 下面的代码是已经保存过后的当周的课程，渲染出来过后，需要在上面记录一些内容。
          if (immutable) {
            elem.dataset.immutable = 'immutable';
            if (oneTpl.status !== undefined) {
              elem.dataset.status = oneTpl.status;
            }
            elem.dataset.id = oneTpl.id;

            let backgroundColor = '';
            switch (parseInt(oneTpl.status, 10)) {
              case 0 :
                backgroundColor = '#ff9c00';
                break;
              case 1 :
                backgroundColor = '#b7b7b7';
                break;
              case 2 :
                backgroundColor = '#5cc92b';
                break;
              case 3 :
              case 4 :
              case 5 :
              case 6 :
                backgroundColor = '#ed391d';
                break;
              case 10 :
                backgroundColor = '#6ca4f8';
                break;
              default :
                backgroundColor = 'transparent';
            }
            elem.style.backgroundColor = backgroundColor;

            const children = elem.children[1];
            children.innerText = oneTpl.studentName;
            children.style.color = '#ffffff';
          } else {
            elem.style.backgroundColor = '#a8d8ff';
          }
          break;
        }
      }

      if (matched === tpl.length) {
        break;
      }
    }
  }

  render() {
    const times = [
      '0:00', '', '1:00', '', '2:00', '', '3:00', '', '4:00', '', '5:00', '', '6:00', '', '7:00', '',
      '8:00', '', '9:00', '', '10:00', '', '11:00', '', '12:00', '', '13:00', '', '14:00', '', '15:00', '', '16:00', '',
      '17:00', '', '18:00', '', '19:00', '', '20:00', '', '21:00', '', '22:00', '', '23:00', '', '24:00',
    ]

    const toRenderTableColums = [
      '12 AM', '1 AM', '2 AM', '3 AM', '4 AM', '5 AM', '6 AM', '7 AM',
      '8 AM', '9 AM', '10 AM', '11 AM', 'noon', '1 PM', '2 PM', '3 PM', '4 PM',
      '5 PM', '6 PM', '7 PM', '8 PM', '9 PM', '10 PM', '11 PM',
      '12 AM', '1 AM', '2 AM', '3 AM', '4 AM', '5 AM', '6 AM', '7 AM',
      '8 AM', '9 AM', '10 AM', '11 AM', 'noon', '1 PM', '2 PM', '3 PM', '4 PM',
      '5 PM', '6 PM', '7 PM', '8 PM', '9 PM', '10 PM', '11 PM',
    ]

    const tableHeaderStyles = {
      textAlign: 'center',
      fontSize: '18px',
      fontWeight: 100,
      color: '#333',
    }

    const currentWeekDays = this.state.currentWeekDays;

    const month = this.state.month || '';
    const year = this.state.year || '';

    return (
      <div className="one-week">
        <h1 className="week-title">
          <span className="arrow" onClick={this.goPrevWeek} title="Previous Week">&lt;</span>
          <span className="month">
            <span className="week-month">{month}</span>
            <span className="week-year">{year}</span>
          </span>
          <span className="arrow" onClick={this.goNextWeek} title="Next Week">&gt;</span>
        </h1>
        <ul className="time-labels" onScroll={this.labelScroll}>
          {
            times.map((item, index) => <li key={index}><span className="label">{item}</span></li>)
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
        <div className="table-wrap" onScroll={this.tableScroll}>
          <Table onCellClick={this.cellClick} selectable={false} multiSelectable={false} className="table">
            <TableBody displayRowCheckbox={false} showRowHover={false} style={{ position: 'relative' }}>
              {
                toRenderTableColums.map((item, index) => (
                  <TableRow key={index} hoverable>
                    <TableRowColumn className="cell" data-x="0" data-y={index} onMouseEnter={this.cellHover} onMouseLeave={this.cellLeave}><span className="unselected">Unavailable</span><span className="student-name" /></TableRowColumn>
                    <TableRowColumn className="cell" data-x="1" data-y={index} onMouseEnter={this.cellHover} onMouseLeave={this.cellLeave}><span className="unselected">Unavailable</span><span className="student-name" /></TableRowColumn>
                    <TableRowColumn className="cell" data-x="2" data-y={index} onMouseEnter={this.cellHover} onMouseLeave={this.cellLeave}><span className="unselected">Unavailable</span><span className="student-name" /></TableRowColumn>
                    <TableRowColumn className="cell" data-x="3" data-y={index} onMouseEnter={this.cellHover} onMouseLeave={this.cellLeave}><span className="unselected">Unavailable</span><span className="student-name" /></TableRowColumn>
                    <TableRowColumn className="cell" data-x="4" data-y={index} onMouseEnter={this.cellHover} onMouseLeave={this.cellLeave}><span className="unselected">Unavailable</span><span className="student-name" /></TableRowColumn>
                    <TableRowColumn className="cell" data-x="5" data-y={index} onMouseEnter={this.cellHover} onMouseLeave={this.cellLeave}><span className="unselected">Unavailable</span><span className="student-name" /></TableRowColumn>
                    <TableRowColumn className="cell" data-x="6" data-y={index} onMouseEnter={this.cellHover} onMouseLeave={this.cellLeave}><span className="unselected">Unavailable</span><span className="student-name" /></TableRowColumn>
                  </TableRow>
                )
                )
              }
            </TableBody>
          </Table>
        </div>
        <div className="save clearfix">
          <RaisedButton className="left" label="Peak Times" onTouchTap={this.scrollBack} />
          <RaisedButton className="right" label="Save Timetable" primary onTouchTap={this.handleSubmit} />
        </div>
      </div>
    )
  }

  validTime(r, c) {
    const fullHours = this.timesData;
    let time = '';

    if (r % 2) {
      time = fullHours[r - 1].replace(/00/, '30');
    } else {
      time = fullHours[r];
    }

    const date = this.weekDays[c];
    return new Date(`${date} ${time}`) > new Date();
  }

  cellHover(r) {
    const ele = r.target;
    const data = ele.dataset;

    if (this.validTime(data.y, data.x)) {
      if (!data.clicked) {
        ele.style.backgroundColor = '#ecf0f1';
      }
    } else if (!data.status) {
      ele.children[0].style.display = 'block';
    }
  }

  cellLeave(r) {
    const ele = r.target;

    if (!ele.dataset.clicked && ele.className === 'cell') {
      ele.style.backgroundColor = 'transparent';
    }

    if (ele.className === 'unselected') {
      ele.style.display = 'none';
    } else if (ele.className === 'cell' && ele.children[0].style.display === 'block') {
      ele.children[0].style.display = 'none';
    }
  }

  scrollBack() {
    const tableWrap = document.getElementsByClassName('table-wrap')[0];
    const timeLabel = document.getElementsByClassName('time-labels')[0];

    const scrollY = this.state.defaultScrollTop;
    tableWrap.scrollTop = scrollY;
    timeLabel.scrollTop = scrollY;
  }

  handleSubmit() {
    const lessonsAdded = this.lessonsAdded;
    const lessonsDeleted = this.lessonsDeleted;

    if (!lessonsAdded.length && !lessonsDeleted.length) {
      this.props.showNotification('Please enter your availability in the timetable before saving.');
      return;
    }

    const data = {
      add: lessonsAdded,
      delete: lessonsDeleted,
    };

    nprogress.start();

    const { updateWeekTimetable, showNotification } = this.props

    updateWeekTimetable(data).then((res) => {
      nprogress.done()
      if (res.payload.success) {
        showNotification('Timetable saved successfully.');
      }
    })

    //  TODO:  这里要将这个 api request 替换掉。

    // api.NewLessonTimeTable(data,
    //   { 'Authorization': self.props.token },
    //   "",
    //   (resp) => {
    //     nprogress.done();
    //     if (resp.success) {
    //       let param = self.state.reqParam;
    //       self.props.weeklyTimetableReq(param);
    //       self.props.monthlyTimetableReq(param);
    //       self.lessonsAdded = [];
    //       self.lessonsDeleted = [];
    //
    //       self.setState({
    //         timetableClicked: false
    //       });
    //     } else {
    //       self.props.showNotification("Please select future date and time correctly.");
    //     }
    //   },
    //   (err) => {
    //     nprogress.done();
    //     self.props.networkError();
    //   }
    // );
  }

  cellClick(rowNumber, columnId, e) {
    const target = e.currentTarget;
    const dataset = target.dataset;
    const fullHours = this.timesData;
    let time = '';

    if (!this.validTime(rowNumber, columnId - 1)) {
      return;
    }

    // if status > 0, the lesson had been booked.

    if (dataset.immutable === 'immutable' && dataset.status > 0) {
      this.props.showNotification('This lesson has already been booked by a student.');
      return;
    }

    if (rowNumber % 2) {
      time = fullHours[rowNumber - 1].replace(/00/, '30');
    } else {
      time = fullHours[rowNumber];
    }

    const date = this.weekDays[columnId - 1];

    const selectedLesson = {
      lessonDate: date,
      lessonTime: time,
      student_id: 0,
    };

    if (!dataset.clicked) {           //  select the item.
      if (!dataset.immutable) {          //  only add  new lesson.
        this.lessonsAdded.push(selectedLesson);
      }

      target.style.backgroundColor = '#ff9c00';
      target.dataset.clicked = 'clicked';

      if (dataset.immutable === 'immutable') {
        const index = this.lessonsDeleted.indexOf(dataset.id);
        if (index !== -1) {
          this.lessonsDeleted.splice(index, 1);
        }
      }
    } else {                          //   calcel selected.
      this.lessonsAdded.forEach((item, index) => {
        const { lessonDate, lessonTime } = item
        if (lessonDate === selectedLesson.lessonDate && lessonTime === selectedLesson.lessonTime) {
          this.lessonsAdded.splice(index, 1);
        }
      });

      if (dataset.immutable === 'immutable') {
        this.lessonsDeleted.push(dataset.id);
      }

      target.style.backgroundColor = '#ecf0f1';
      target.dataset.clicked = '';
    }

    this.setState({
      timetableClicked: true,
    });
  }

  tableScroll() {
    const timeLables = document.getElementsByClassName('time-labels')[0];
    const tableWrap = document.getElementsByClassName('table-wrap')[0];

    timeLables.scrollTop = tableWrap.scrollTop;
  }

  labelScroll() {
    const timeLables = document.getElementsByClassName('time-labels')[0];
    const tableWrap = document.getElementsByClassName('table-wrap')[0];

    tableWrap.scrollTop = timeLables.scrollTop;
  }

  componentWillReceiveProps(nextProps) {
    const self = this;
    if (JSON.stringify(nextProps) !== JSON.stringify(this.props)) {
      nprogress.done();

      if (!this.state.prevWeek && !this.state.nextWeek) {
        this.renderMetaData();
      }

      const weeklyTimetable = nextProps.weeklyTimetable.timetable || [];
      const existedTemplate = this.state.existedTemplate || [];

      const weeklyData = nextProps.weeklyTimetable;
      this.setState({
        prevWeek: weeklyData.pervWeek,
        nextWeek: weeklyData.nextWeek,
      });

      if (weeklyTimetable.length > 0) {
        this.renderData(weeklyTimetable, true);
      } else if (existedTemplate.length > 0 && !this.state.historyData) {
        this.renderData(existedTemplate);
        existedTemplate.forEach((item) => {
          const date = self.weekDays[parseInt(item.weekday, 10)];
          if (new Date(`${date} ${item.beginTime}`) > new Date()) {
            self.lessonsAdded.push({
              lessonDate: date,
              lessonTime: item.beginTime,
              student_id: 0,
            });
          }
        });
      }
      self.highlightToday();
    }
  }

  highlightToday() {
    const today = new Date();

    if (this.state.weekDays.indexOf(today.toDateString()) === -1) {
      return
    }

    let weekIndex = '';
    const dateElems = document.getElementsByClassName('week-date');

    weekIndex = today.getDay() === 0 ? 6 : today.getDay() - 1;

    dateElems[weekIndex].dataset.today = 'today';
    dateElems[weekIndex].style.lineHeight = '30px';
    dateElems[weekIndex].style.borderRadius = '50%';
    dateElems[weekIndex].style.backgroundColor = 'rgb(255, 64, 129)';
    dateElems[weekIndex].style.color = 'white';
    dateElems[weekIndex].style.display = 'inline-block';
    dateElems[weekIndex].style.width = '30px';
  }

}
