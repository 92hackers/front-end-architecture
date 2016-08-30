
import React from 'react';
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import {connect} from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import api from "../network/api";
import Notification from './Notification';
import dashboardDisplay from '../actions/dashboardDisplay';
import nprogress from 'nprogress';


class OneWeekTemplateClass extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      open: false,
      hasTemplate: false,
      notification: "",
      existedTemplate: [],

      teacherTimezone: "",
      studentTimezone: "",
      timezoneOffset: "",
      defaultScrollTop: "",

      defaultStartTime: "",
      defaultDuration: "",

      saveResultMessage: "",
      lessonsSelected: [],

      timeSwitched: false,

      fullHours: [
        "0:00", "", "1:00", "", "2:00", "", "3:00", "", "4:00", "", "5:00", "", "6:00", "", "7:00", "",
        "8:00", "", "9:00", "", "10:00", "", "11:00", "", "12:00", "", "13:00", "", "14:00", "", "15:00", "", "16:00", "",
        "17:00", "", "18:00", "", "19:00", "", "20:00", "", "21:00", "", "22:00", "", "23:00", "", "24:00"
      ],

      studentHours: [],

      displayTime: [],
      displayTimezone: "",

      toggled: false
    };
    this.token = this.props.token || "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9hcGkueWl5b3VhYmMuY29tIiwiYXVkIjoiaHR0cDpcL1wvYXBpLnlpeW91YWJjLmNvbSIsImlhdCI6MTQ3MjUyNjg4MiwibmJmIjoxNDcyNTI2ODgyLCJqdGkiOjJ9.08bYiYxsUmmzppEN5PhUAFPEF5mKCLMb9-b--N8b0P0";
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

  changeTime () {
    var offset = this.state.timezoneOffset;
    var fullHours = this.state.fullHours;

    var numericHours =  fullHours.map((v, i) => {
      var numericHour = parseInt(v);
      var result = numericHour + offset;

      if (isNaN(result)) {
        return "";
      } else if (result < 0) {
        return result + 24 + ":00";
      } else if (result > 24) {
        return result - 24 + ":00";
      } else {
        return result + ":00";
      }

    });

    this.setState({
      studentHours: numericHours
    });

    return numericHours;
  }

  switchTimezone (e) {
    e.preventDefault();

    var time = "";
    var timezone = "";
    var switched = "";

    if (!this.state.timeSwitched) {
      time = this.state.studentHours.length ? this.state.studentHours : this.changeTime();
      timezone = this.state.studentTimezone;
      switched = true;
    } else {
      timezone = this.state.teacherTimezone;
      time = this.state.fullHours;
      switched = false;
    }

    this.setState({
      displayTime: time,
      displayTimezone: timezone,
      timeSwitched: switched
    });

  }

  scheduleLessons () {
    this.handleClose();
    console.log("dispatch schedule.");
    this.props.dispatch(dashboardDisplay("schedule"));
  }

  render () {

    const times = this.state.displayTime;
    const timezone = this.state.displayTimezone;

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

    const actions = [
      <RaisedButton
        label="Schedule lessons"
        primary={true}
        onTouchTap={this.scheduleLessons.bind(this)}
      />
    ];

    return (
      <div className="one-week">
        <div className="head-content clearfix">
          <h1 className="week-title">{timezone}</h1>
          <RaisedButton style={{verticalAlign: "middle", float: "right", marginTop: "9px"}} label="Switch Timezone" primary={true} onClick={this.switchTimezone.bind(this)}></RaisedButton>
        </div>
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
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn style={tableHeaderStyles}>Mon</TableHeaderColumn>
              <TableHeaderColumn style={tableHeaderStyles}>Tue</TableHeaderColumn>
              <TableHeaderColumn style={tableHeaderStyles}>Wed</TableHeaderColumn>
              <TableHeaderColumn style={tableHeaderStyles}>Thu</TableHeaderColumn>
              <TableHeaderColumn style={tableHeaderStyles}>Fri</TableHeaderColumn>
              <TableHeaderColumn style={tableHeaderStyles}>Sat</TableHeaderColumn>
              <TableHeaderColumn style={tableHeaderStyles}>Sun</TableHeaderColumn>
            </TableRow>
          </TableHeader>
        </Table>
        <div className="table-wrap" onScroll={this.tableScroll.bind(this)}>
          <Table onCellClick={this.cellClick.bind(this)} selectable={false} multiSelectable={false} className="table">
            <TableBody className="table-body-wrap" displayRowCheckbox={false} showRowHover={false} style={{position: "relative"}}>
              {
                toRenderTableColums.map((item, index) => {
                  return (
                    <TableRow key={index} hoverable={true}>
                      <TableRowColumn style={{height: 50, cursor: "pointer"}}></TableRowColumn>
                      <TableRowColumn style={{height: 50, cursor: "pointer"}}></TableRowColumn>
                      <TableRowColumn style={{height: 50, cursor: "pointer"}}></TableRowColumn>
                      <TableRowColumn style={{height: 50, cursor: "pointer"}}></TableRowColumn>
                      <TableRowColumn style={{height: 50, cursor: "pointer"}}></TableRowColumn>
                      <TableRowColumn style={{height: 50, cursor: "pointer"}}></TableRowColumn>
                      <TableRowColumn style={{height: 50, cursor: "pointer"}}></TableRowColumn>
                    </TableRow>
                  )
                })
              }
            </TableBody>
          </Table>
        </div>
        <div className="save clearfix">
          <RaisedButton className="left" label="Scroll to Recommended time range" onTouchTap={this.scrollBack.bind(this)}></RaisedButton>
          <RaisedButton className="right" label="Save the Template" primary={true} onTouchTap={this.handleSubmit.bind(this)}></RaisedButton>
        </div>
        <Dialog
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose.bind(this)}
        >
          <h1>Weekly timetable updated!</h1>
        </Dialog>
        <Notification ref="notification" message={this.state.notification}></Notification>
      </div>
    )
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
    var lessonsSelected = this.state.lessonsSelected;

    if (!lessonsSelected.length) {
      self.notify("please click the time table cell to set your weekly template.");
      return;
    }

    var data = {
      "tpl": lessonsSelected
    };
    console.log(data);
    nprogress.start();
    api.NewLessonTemplate(data,
      { "Authorization": self.token },
      "",
      (resp) => {
        nprogress.done();
        if (resp.success) {
          self.handleOpen();
        } else {
          self.notify("network is busy, please try again later.");
        }
      },
      (err) => {
        nprogress.done();
        console.log(err);
        self.notify("network is busy, please try again later.");
      }
    );
  }

  handleClose () {
    this.setState({
      open: false
    });
  }

  handleOpen () {
    this.setState({
      open: true
    });
  }

  componentDidMount () {
    var self = this;

    var tableWrap = document.getElementsByClassName("table-wrap")[0];
    var timeLabel = document.getElementsByClassName("time-labels")[0];

    this.setState({
      displayTime: this.state.fullHours
    });

    api.LessonTemplateInfo("",
      { "Authorization": self.token },
      "",
      (resp) => {
        if (resp.success) {
          var data = resp.data;

          console.log(data);

          self.setState({
            existedTemplate: data.tpl,
            hasTemplate: data.tpl.length > 0,
            teacherTimezone: data.timezone,
            studentTimezone: data.studentTimezone,
            timezoneOffset: data.studentTimeoffset / 3600,          //  unit:   hour.
            displayTimezone: data.timezone,
            defaultDuration: data.hours,
            defaultStartTime: data.hourFrom
          });

          tableWrap.style.height = data.hours * 100 + 2 * 50 + "px";
          timeLabel.style.height = data.hours * 100 + 2 * 50 + "px";

          var count = 0;
          var fullHours = self.state.fullHours;

          for (; count < fullHours.length; count++) {
            if (data.hourFrom === fullHours[count]) {
              break;
            }
          }

          var scrollTop = (count - 1) * 50;

          self.setState({
            defaultScrollTop: scrollTop
          });

          tableWrap.scrollTop = scrollTop;
          timeLabel.scrollTop = scrollTop;

        } else {
          console.log("Something wrong, returns failure.");
        }
      },
      (err) => {
        console.log("Something wrong.");
      }
    );

  }

  cellClick (rowNumber, columnId, e) {

    var target = e.currentTarget;
    var lessonsSelected = this.state.lessonsSelected;
    var fullHours = this.state.fullHours;
    var beginTime = "";
    var lessonClicked = "";

    if (rowNumber % 2) {
      beginTime = fullHours[rowNumber - 1].replace(/00/, "30");
    } else {
      beginTime = fullHours[rowNumber];
    }

    lessonClicked = {
      weekday: columnId - 1,
      beginTime: beginTime
    };

    if (!target.dataset.clicked) {
      target.style.backgroundColor = "#ddd";
      target.dataset.clicked = "clicked";
      lessonsSelected.push(lessonClicked);
    } else {
      lessonsSelected.splice(lessonsSelected.indexOf(lessonClicked), 1);
      target.style.backgroundColor = "#fff";
      target.dataset.clicked = "";
    }

    console.log(lessonsSelected);
    this.setState({
      lessonsSelected: lessonsSelected
    });

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

}

var OneWeekTemplate = connect()(OneWeekTemplateClass);

export default OneWeekTemplate;
