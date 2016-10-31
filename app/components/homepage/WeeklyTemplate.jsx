import React from 'react';

import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import { Step, Stepper, StepLabel } from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';

import api from "../network/api";
import nprogress from 'nprogress';

import {connect} from 'react-redux';
import {dashboardActions, notificationActions} from '../actions';

class OneWeekTemplateComp extends React.Component {

  constructor(props) {
    super(props);

    const tpl = this.props.tpl;

    this.state = {
      open: false,
      notification: "",
      existedTemplate: tpl.existedTemplate || [],

      teacherTimezone: tpl.teacherTimezone,
      studentTimezone: tpl.studentTimezone,
      timezoneOffset: tpl.timezoneOffset,
      defaultScrollTop: "",

      defaultStartTime: tpl.defaultStartTime,
      defaultDuration: tpl.defaultDuration,

      saveResultMessage: "",
      lessonsSelected: tpl.existedTemplate || [],

      timeSwitched: false,

      fullHours: [
        "0:00", "", "1:00", "", "2:00", "", "3:00", "", "4:00", "", "5:00", "", "6:00", "", "7:00", "",
        "8:00", "", "9:00", "", "10:00", "", "11:00", "", "12:00", "", "13:00", "", "14:00", "", "15:00", "", "16:00", "",
        "17:00", "", "18:00", "", "19:00", "", "20:00", "", "21:00", "", "22:00", "", "23:00", "", "24:00"
      ],

      studentHours: [],

      displayTime: [],
      displayTimezone: tpl.displayTimezone,

      toggled: false,

      welcomeOpen: false,
      stepIndex: 0
    };

    this.hoursRawData = [
      "0:00", "0:30", "1:00", "1:30", "2:00", "2:30", "3:00", "3:30", "4:00", "4:30", "5:00", "5:30", "6:00", "6:30", "7:00", "7:30",
      "8:00", "8:30", "9:00", "9:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
      "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00", "22:30", "23:00", "23:30", "24:00"
    ];
  }

  componentWillReceiveProps (nextProps) {
    if (JSON.stringify(nextProps) !== JSON.stringify(this.props)) {
      var tpl = nextProps.tpl;
      var self = this;
      this.setState({
        displayTimezone: tpl.displayTimezone,
        defaultDuration: tpl.defaultDuration,
        defaultStartTime: tpl.defaultStartTime,
        existedTemplate: tpl.existedTemplate,

        teacherTimezone: tpl.teacherTimezone,
        studentTimezone: tpl.studentTimezone,
        timezoneOffset: tpl.timezoneOffset
      }, () => {
        self.initialDomRender();
        self.renderData();
      });
    }
  }

  renderData () {
    if (this.state.existedTemplate.length > 0) {
      let self = this;
      let elems = document.getElementsByClassName("cell");
      let tpl = this.state.existedTemplate.map((item, index) => {
        return {
          week: parseInt(item.weekday) + 1,
          beginTime: self.hoursRawData.indexOf(item.beginTime)
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
            elem.style.backgroundColor = "#a8d8ff";
            break;
          }
        }

        if (matched === tpl.length) {
          break;
        }
      }

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
    this.props.dashboardDisplay("schedule");
  }

  handleWelcomeClose () {
    this.setState({
      welcomeOpen: false,
      stepIndex: 0
    });
  }

  render () {

    const times = this.state.displayTime || "";
    const timezone = this.state.displayTimezone || "";

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

    const stepIndex = this.state.stepIndex;

    return (
      <div className="one-week">
        <div className="head-content clearfix">
          <h1 className="week-title">{timezone}</h1>
          <RaisedButton style={{verticalAlign: "middle", float: "right", marginTop: "9px"}} label="Switch Time Zone" primary={true} onClick={this.switchTimezone.bind(this)}></RaisedButton>
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
                      <TableRowColumn className="cell" data-x="1" data-y={index} onMouseEnter={this.cellHover.bind(this)} onMouseLeave={this.cellLeave}></TableRowColumn>
                      <TableRowColumn className="cell" data-x="2" data-y={index} onMouseEnter={this.cellHover.bind(this)} onMouseLeave={this.cellLeave}></TableRowColumn>
                      <TableRowColumn className="cell" data-x="3" data-y={index} onMouseEnter={this.cellHover.bind(this)} onMouseLeave={this.cellLeave}></TableRowColumn>
                      <TableRowColumn className="cell" data-x="4" data-y={index} onMouseEnter={this.cellHover.bind(this)} onMouseLeave={this.cellLeave}></TableRowColumn>
                      <TableRowColumn className="cell" data-x="5" data-y={index} onMouseEnter={this.cellHover.bind(this)} onMouseLeave={this.cellLeave}></TableRowColumn>
                      <TableRowColumn className="cell" data-x="6" data-y={index} onMouseEnter={this.cellHover.bind(this)} onMouseLeave={this.cellLeave}></TableRowColumn>
                      <TableRowColumn className="cell" data-x="7" data-y={index} onMouseEnter={this.cellHover.bind(this)} onMouseLeave={this.cellLeave}></TableRowColumn>
                    </TableRow>
                  )
                })
              }
            </TableBody>
          </Table>
        </div>
        <div className="save clearfix">
          <RaisedButton className="left" label="Peak Times" onTouchTap={this.scrollBack.bind(this)}></RaisedButton>
          <RaisedButton className="right" label="Save Template" primary={true} onTouchTap={this.handleSubmit.bind(this)}></RaisedButton>
        </div>
        <Dialog
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose.bind(this)}
        >
          <h1 className="text-center" style={{marginBottom: 20}}>Template updated successfully!</h1>
          <h3 className="text-center">Now, please click the button below to schedule lessons.</h3>
        </Dialog>
        <Dialog
          modal={false}
          className="welcomeDialog"
          bodyClassName="welcomeBody"
          autoScrollBodyContent={true}
          contentClassName="welcomeContent"
          open={this.state.welcomeOpen}
          onRequestClose={this.handleWelcomeClose.bind(this)}
          contentStyle={{width: "100%", maxWidth: "100%", transform: 0}}
          overlayStyle={{backgroundColor: "transparent"}}
          bodyStyle={{padding: 0}}
        >
          <i className="fa fa-times" style={{position: "absolute", right: 24, top: 14, cursor: "pointer", fontSize: "50px", color: "#fff"}} onClick={this.handleWelcomeClose.bind(this)}></i>
          <Stepper activeStep={stepIndex}></Stepper>
          <div className="back-arrow" onClick={this.handlePrev.bind(this)} style={stepIndex === 0 ? {"display": "none"} : {"display": "block"}}><i className="fa fa-angle-left fa-3"></i></div>
          <div className="step-content" style={{width: "100%", height: "100%", display: "inline-block", verticalAlign: "top", overflow: "hidden", borderRadius: 3}}>
            {this.getStepContent(stepIndex)}
          </div>
          <div className="next-arrow" onClick={this.handleNext.bind(this)}>{stepIndex === 2 ? <span className="finish-btn">End</span> : <i className="fa fa-angle-right fa-3"></i>}</div>
        </Dialog>
      </div>
    )
  }

  handleGuideImgResize (e) {
    var elem = document.querySelector(".step");
    if (!!elem) {
      document.querySelector(".step").style.height = window.innerHeight + "px";
      document.querySelector(".step").style.width = window.innerWidth + "px";
    }
  }

  componentWillUnmount () {
    window.removeEventListener("resize", this.handleGuideImgResize);
  }

  handleNext () {
    var index = this.state.stepIndex;
    if (index < 2) {
      this.setState({
        stepIndex: index + 1
      });
    } else {
      this.handleWelcomeClose();
    }
  }

  handlePrev () {
    var index = this.state.stepIndex;
    if (index > 0) {
      this.setState({
        stepIndex: index - 1
      });
    }
  }

  getStepContent(stepIndex) {

    var styles = {
      width: "100%",
      height: "100%"
    };

    switch (stepIndex) {
      case 0 :
        return <div className="step step-one" style={styles}><img style={styles} src="/images/guide-1.jpg" alt="guide img."/></div>;

      case 1 :
        return <div className="step step-two" style={styles}><img style={styles} src="/images/guide-2.jpg" alt="step two img."/></div>;

      case 2 :
        return <div className="step step-three" style={styles}><img style={styles} src="/images/guide-3.jpg" alt="step 3."/></div>;

      default :
        return <h1>Something Wrong.</h1>;
    }
  }

  cellHover (r,c,e) {
    var ele = r.target;
    if (!ele.dataset.clicked) {
      ele.style.backgroundColor = "#ecf0f1";
    }
  }

  cellLeave (r) {
    var ele = r.target;
    if (!ele.dataset.clicked) {
      ele.style.backgroundColor = "transparent";
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
    var lessonsSelected = this.state.lessonsSelected;

    if (!lessonsSelected.length) {
      self.props.showNotification("Please enter your availability in the timetable to set your weekly timetable template.");
      return;
    }

    var data = {
      "tpl": lessonsSelected
    };

    nprogress.start();
    api.NewLessonTemplate(data,
      { "Authorization": self.props.token },
      "",
      (resp) => {
        nprogress.done();
        if (resp.success) {
          self.props.templateReq();
          self.handleOpen();
        } else {
          self.props.networkError();
        }
      },
      (err) => {
        nprogress.done();
        self.props.networkError();
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

  initialDomRender () {

    var self = this;
    var tableWrap = document.getElementsByClassName("table-wrap")[0];
    var timeLabel = document.getElementsByClassName("time-labels")[0];

    this.setState({
      displayTime: this.state.fullHours
    });

    var tpl = this.props.tpl;

    tableWrap.style.height = tpl.defaultDuration * 100 + 2 * 50 + "px";
    timeLabel.style.height = tpl.defaultDuration * 100 + 2 * 50 + "px";

    var count = 0;
    var fullHours = self.state.fullHours;

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

  componentDidMount () {

    if (this.props.newUser) {
      this.setState({
        welcomeOpen: true
      }, () => {
        var elem = document.querySelector(".step");
        if (!!elem) {
          document.querySelector(".step").style.height = window.innerHeight + "px";
          document.querySelector(".step").style.width = window.innerWidth + "px";
        }
      });
    }

    window.addEventListener("resize", this.handleGuideImgResize);
    this.initialDomRender();
    this.renderData();

  }

  cellClick (rowNumber, columnId, e) {

    var target = e.currentTarget;
    var lessonsSelected = this.state.lessonsSelected;
    var fullHours = this.state.fullHours;
    var beginTime = this.hoursRawData[rowNumber];
    var lessonClicked = "";

    lessonClicked = {
      weekday: columnId - 1,
      beginTime: beginTime
    };


    if (!target.dataset.clicked) {
      target.style.backgroundColor = "#a8d8ff";
      target.dataset.clicked = "clicked";
      lessonsSelected.push(lessonClicked);
    } else {
      lessonsSelected.forEach((item, index) => {
        if (parseInt(item.weekday) === lessonClicked.weekday && item.beginTime === lessonClicked.beginTime) {
          lessonsSelected.splice(index, 1);
        }
      });

      target.style.backgroundColor = "#ecf0f1";
      target.dataset.clicked = "";
    }

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

const mapDispatchToProps = (dispatch) => {
  return {
    showNotification: (message) => {
      dispatch(notificationActions.showNotification(message));
    },
    networkError: () => {
      dispatch(notificationActions.networkError());
    },
    dashboardDisplay: (comp) => {
      dispatch(dashboardActions.dashboardDisplay(comp));
    }
  }
}

const OneWeekTemplate = connect(null, mapDispatchToProps)(OneWeekTemplateComp);

export default OneWeekTemplate;
