import React from 'react';
import { autobind } from 'core-decorators'
import { browserHistory } from 'react-router'

import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';

export default class WeeklyTemplate extends React.Component {
  constructor(props) {
    super(props);

    this.lessonsSelected = []
    this.fullHours = [
      '0:00', '', '1:00', '', '2:00', '', '3:00', '', '4:00', '', '5:00', '', '6:00', '', '7:00', '',
      '8:00', '', '9:00', '', '10:00', '', '11:00', '', '12:00', '', '13:00', '', '14:00', '', '15:00', '', '16:00', '',
      '17:00', '', '18:00', '', '19:00', '', '20:00', '', '21:00', '', '22:00', '', '23:00', '', '24:00',
    ]

    this.state = {
      open: false,
      timeSwitched: false,
      defaultScrollTop: 0,
      currentTimezone: '',
      currentTime: '',
      studentHours: '',
    };

    this.hoursRawData = [
      '0:00', '0:30', '1:00', '1:30', '2:00', '2:30', '3:00', '3:30', '4:00', '4:30', '5:00', '5:30', '6:00', '6:30', '7:00', '7:30',
      '8:00', '8:30', '9:00', '9:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
      '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00', '22:30', '23:00', '23:30', '24:00',
    ];
  }

  componentWillMount() {
    const { getWeekTemplate } = this.props
    getWeekTemplate()
  }

  componentDidMount() {
    const { profile, displayHelpBox } = this.props
    const { status } = profile
    if (status === 10) {
      displayHelpBox()
    }

    this.initialDomRender();
    this.renderData();
  }

  renderData() {
    const { lessonTemplate } = this.props
    if (lessonTemplate.length > 0) {
      const elems = document.getElementsByClassName('cell');
      const tpl = lessonTemplate.map(item => ({
        week: parseInt(item.weekday) + 1,
        beginTime: this.hoursRawData.indexOf(item.beginTime),
      }))

      let matched = 0;

      for (let i = 0; i < elems.length; i++) {
        for (let j = 0; j < tpl.length; j++) {
          const elem = elems[i];
          const dataset = elems[i].dataset;
          const oneTpl = tpl[j];

          if (parseInt(dataset.x) === oneTpl.week && parseInt(dataset.y) === oneTpl.beginTime) {
            matched += 1
            elem.dataset.clicked = 'clicked'
            elem.style.backgroundColor = '#a8d8ff'
            break
          }
        }

        if (matched === tpl.length) {
          break
        }
      }
    }
  }

  @autobind
  changeTime() {
    const fullHours = this.fullHours;
    const { studentTimeoffset: offset } = this.props.lessonTemplate

    const numericHours = fullHours.map((v) => {
      const numericHour = parseInt(v);
      const result = numericHour + (offset / 3600);

      if (isNaN(result)) {
        return '';
      } else if (result < 0) {
        return `${result + 24}:00`
      } else if (result > 24) {
        return `${result - 24}:00`
      }

      return `${result}:00`
    });

    this.setState({
      studentHours: numericHours,
    });

    return numericHours;
  }

  @autobind
  switchTimezone(e) {
    e.preventDefault();

    const { timeSwitched, studentHours } = this.state
    const { studentTimezone, timezone } = this.props

    let newTime = '';
    let newTimezone = '';
    let switched = '';

    if (!timeSwitched) {
      newTime = studentHours.length ? studentHours : this.changeTime()
      newTimezone = studentTimezone
      switched = true;
    } else {
      newTimezone = timezone
      newTime = this.state.fullHours;
      switched = false;
    }

    this.setState({
      currentTime: newTime,
      currentTimezone: newTimezone,
      timeSwitched: switched,
    });
  }

  @autobind
  scheduleLessons() {
    this.handleClose();
    browserHistory.replace('/teacher-homepage/timetables')
  }

  cellHover(r) {
    const ele = r.target;
    if (!ele.dataset.clicked) {
      ele.style.backgroundColor = '#ecf0f1';
    }
  }

  cellLeave(r) {
    const ele = r.target;
    if (!ele.dataset.clicked) {
      ele.style.backgroundColor = 'transparent';
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
    const self = this
    const lessonsSelected = this.state.lessonsSelected;
    const { updateWeekTemplate, getWeekTemplate, networkError } = this.props

    if (!lessonsSelected.length) {
      self.props.showNotification('Please enter your availability in the timetable to set your weekly timetable template.');
      return;
    }

    const data = {
      tpl: lessonsSelected,
    }

    updateWeekTemplate(data)
    .then((res) => {
      if (res.payload.success) {
        getWeekTemplate()
        self.handleOpen()
      } else {
        networkError()
      }
    })
    .catch(() => networkError())
  }

  @autobind
  handleClose() {
    this.setState({
      open: false,
    });
  }

  handleOpen() {
    this.setState({
      open: true,
    });
  }

  initialDomRender() {
    const tableWrap = document.getElementsByClassName('table-wrap')[0];
    const timeLabel = document.getElementsByClassName('time-labels')[0];
    const { fullHours } = this.state
    const { lessonTemplate } = this.props
    const { hours, hourFrom } = lessonTemplate

    this.setState({
      currentTime: fullHours,
    })

    tableWrap.style.height = `${(hours * 100) + (2 * 100)}px`
    timeLabel.style.height = `${(hours * 100) + (2 * 100)}px`

    let count = 0;

    for (; count < fullHours.length; count++) {
      if (hourFrom === fullHours[count]) {
        break;
      }
    }

    const scrollTop = (count - 1) * 50;

    self.setState({
      defaultScrollTop: scrollTop,
    });

    tableWrap.scrollTop = scrollTop;
    timeLabel.scrollTop = scrollTop;
  }

  cellClick(rowNumber, columnId, e) {
    const target = e.currentTarget;
    const beginTime = this.hoursRawData[rowNumber];
    let lessonClicked = '';

    lessonClicked = {
      weekday: columnId - 1,
      beginTime,
    };

    if (!target.dataset.clicked) {
      target.style.backgroundColor = '#a8d8ff';
      target.dataset.clicked = 'clicked';
      this.lessonsSelected.push(lessonClicked);
    } else {
      this.lessonsSelected.forEach((item, index) => {
        const { weekday, beginTime: clickedTime } = lessonClicked
        if (parseInt(item.weekday) === weekday && item.beginTime === clickedTime) {
          this.lessonsSelected.splice(index, 1);
        }
      });

      target.style.backgroundColor = '#ecf0f1';
      target.dataset.clicked = '';
    }
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

  render() {
    const times = this.state.displayTime || '';
    const timezone = this.state.displayTimezone || '';

    const toRenderTableColums = [
      '12 AM', '1 AM', '2 AM', '3 AM', '4 AM', '5 AM', '6 AM', '7 AM',
      '8 AM', '9 AM', '10 AM', '11 AM', 'noon', '1 PM', '2 PM', '3 PM', '4 PM',
      '5 PM', '6 PM', '7 PM', '8 PM', '9 PM', '10 PM', '11 PM',
      '12 AM', '1 AM', '2 AM', '3 AM', '4 AM', '5 AM', '6 AM', '7 AM',
      '8 AM', '9 AM', '10 AM', '11 AM', 'noon', '1 PM', '2 PM', '3 PM', '4 PM',
      '5 PM', '6 PM', '7 PM', '8 PM', '9 PM', '10 PM', '11 PM',
    ];

    const tableHeaderStyles = {
      textAlign: 'center',
      fontSize: '18px',
      fontWeight: 100,
      color: '#333',
    };

    const actions = [
      <RaisedButton
        label="Schedule lessons"
        primary
        onTouchTap={this.scheduleLessons}
      />,
    ];

    return (
      <div className="one-week">
        <div className="head-content clearfix">
          <h1 className="week-title">{timezone}</h1>
          <RaisedButton
            style={{ verticalAlign: 'middle', float: 'right', marginTop: '9px' }}
            label="Switch Time Zone"
            primary
            onClick={this.switchTimezone}
          />
        </div>
        <ul className="time-labels" onScroll={this.labelScroll}>
          {
            times.map((item, index) => (<li key={index}><span className="label">{item}</span></li>))
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
        <div className="table-wrap" onScroll={this.tableScroll}>
          <Table onCellClick={this.cellClick} selectable={false} multiSelectable={false} className="table">
            <TableBody className="table-body-wrap" displayRowCheckbox={false} showRowHover={false} style={{ position: 'relative' }}>
              {
                toRenderTableColums.map((item, index) => (
                  <TableRow key={index} hoverable>
                    {
                      [1, 2, 3, 4, 5, 6, 7].map((innerItem, innerIndex) => (
                        <TableRowColumn
                          className="cell"
                          key={innerIndex}
                          data-x={innerItem}
                          data-y={index}
                          onMouseEnter={this.cellHover}
                          onMouseLeave={this.cellLeave}
                        />
                      ))
                    }
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </div>
        <div className="save clearfix">
          <RaisedButton
            className="left"
            label="Peak Times"
            onTouchTap={this.scrollBack}
          />
          <RaisedButton
            className="right"
            label="Save Template"
            primary
            onTouchTap={this.handleSubmit}
          />
        </div>
        <Dialog
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <h1 className="text-center" style={{ marginBottom: 20 }}>Template updated successfully!</h1>
          <h3 className="text-center">Now, please click the button below to schedule lessons.</h3>
        </Dialog>
      </div>
    )
  }
}
