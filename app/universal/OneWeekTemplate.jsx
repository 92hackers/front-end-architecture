
import React from 'react';
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';

class OneWeekTemplate extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      open: false,
      saveResultMessage: "",
      timeSwitched: false,
      localTimes: [
        "0:00", "", "1:00", "", "2:00", "", "3:00", "", "4:00", "", "5:00", "", "6:00", "", "7:00", "",
        "8:00", "", "9:00", "", "10:00", "", "11:00", "", "12:00", "", "13:00", "", "14:00", "", "15:00", "", "16:00", "",
        "17:00", "", "18:00", "", "19:00", "", "20:00", "", "21:00", "", "22:00", "", "23:00", "", "24:00"
      ],
      beijingTimes: [
        "16:00", "", "17:00", "", "18:00", "", "19:00", "", "20:00", "", "21:00", "", "22:00", "", "23:00", "",
        "24:00", "", "1:00", "", "2:00", "", "3:00", "", "4:00", "", "5:00", "", "6:00", "", "7:00", "", "8:00", "",
        "9:00", "", "10:00", "", "11:00", "", "12:00", "", "13:00", "", "14:00", "", "15:00", "", "16:00"
      ],
      displayTime: [],
      displayTimezone: "",
      localTimezone: "(GMT+09:00) Osaka",
      beijingTimezone: "(GMT+08:00) Beijing",

      toggled: false
    };
  }

  switchTimezone (e) {
    e.preventDefault();

    var time = "";
    var timezone = "";
    var switched = "";

    if (!this.state.timeSwitched) {
      time = this.state.beijingTimes;
      timezone = this.state.beijingTimezone;
      switched = true;
    } else {
      time = this.state.localTimes;
      timezone = this.state.localTimezone;
      switched = false;
    }

    this.setState({
      displayTime: time,
      displayTimezone: timezone,
      timeSwitched: switched
    });

  }

  xx () {}

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
        label="Ok"
        primary={true}
        onTouchTap={this.handleClose.bind(this)}
      />
    ];

    return (
      <div className="one-week" style={{width: "50%"}}>
        <div className="head-content">
          <h1 className="week-title">{timezone}</h1>
          <RaisedButton style={{verticalAlign: "middle"}} label="Switch Timezone" primary={true} onClick={this.switchTimezone.bind(this)}></RaisedButton>
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
            <TableBody displayRowCheckbox={false} showRowHover={false} style={{position: "relative"}}>
              {
                toRenderTableColums.map((item, index) => {
                  return (
                    <TableRow key={index} hoverable={true}>
                      <TableRowColumn style={{height: 50}}></TableRowColumn>
                      <TableRowColumn style={{height: 50}}></TableRowColumn>
                      <TableRowColumn style={{height: 50}}></TableRowColumn>
                      <TableRowColumn style={{height: 50}}></TableRowColumn>
                      <TableRowColumn style={{height: 50}}></TableRowColumn>
                      <TableRowColumn style={{height: 50}}></TableRowColumn>
                      <TableRowColumn style={{height: 50}}></TableRowColumn>
                    </TableRow>
                  )
                })
              }
            </TableBody>
          </Table>
        </div>
        <div className="save">
          <RaisedButton label="Save the Template" primary={true} onTouchTap={this.handleOpen.bind(this)}></RaisedButton>
        </div>
        <Dialog
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose.bind(this)}
        >
          {this.state.saveResultMessage}
        </Dialog>
      </div>
    )
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

    this.setState({
      displayTime: this.state.localTimes,
      displayTimezone: this.state.localTimezone
    });

    var tableWrap = document.getElementsByClassName("table-wrap")[0];

    tableWrap.scrollTop = 17.5 * 100;

  }

  cellClick (rowNumber, columnId, e) {

    var target = e.currentTarget;

    if (!target.dataset.clicked) {
      target.style.backgroundColor = "#ddd";
      target.dataset.clicked = "clicked";
    } else {
      target.style.backgroundColor = "#fff";
      target.dataset.clicked = "";
    }

    console.log(columnId, rowNumber);
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

export default OneWeekTemplate;
