import React from 'react';
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn}
  from 'material-ui/Table';

class Week extends React.Component {

  constructor (props) {
    super (props);
  }

  render () {

    const times = ["12 AM", "", "1 AM", "", "2 AM", "", "3 AM", "", "4 AM", "", "5 AM", "", "6 AM", "", "7 AM", "",
      "8 AM", "", "9 AM", "", "10 AM", "", "11 AM", "", "noon", "", "1 PM", "", "2 PM", "", "3 PM", "", "4 PM", "",
      "5 PM", "", "6 PM", "", "7 PM", "", "8 PM", "", "9 PM", "", "10 PM", "", "11 PM", "", "12 AM"
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

    var tableWeekdayStyles = {
      textAlign: "center",
      fontSize: "18px",
      fontWeight: 100,
      color: "#ccc"
    };

    const months = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    const today = new Date();

    const currentWeekDays = [];

    const oneDayMilSeconds = 1000 * 60 * 60 * 24;

    var prevNDate = (n) => {
      return new Date(today.getTime() - n * oneDayMilSeconds).getDate();
    };

    var postNDate = (n) => {
      return new Date(today.getTime() + n * oneDayMilSeconds).getDate();
    }

    var currentDay = today.getDay();
    var index = today.getDay();

    currentWeekDays[currentDay] = today.getDate();

    while (index > 0) {
      index--;
      currentWeekDays[index] = prevNDate(currentDay - index);
    }

    index = currentDay;

    while (index < 6) {
      index++;
      currentWeekDays[index] = postNDate(index - currentDay);
    }

    const month = months[today.getMonth()];
    const year = today.getFullYear();

    console.log(currentWeekDays);
    return (
      <div className="one-week">
        <h1 className="week-title">
          <span className="week-month">{month}</span>
          <span className="week-year">{year}</span>
        </h1>
        <ul className="time-labels">
        {
          times.map((item, index) => {
            return (
              <li key={index}><span className="label">{item}</span></li>
            )
          })
        }
        </ul>
        <Table selectable={false} multiSelectable={false} className="table">
          <TableHeader displaySelectAll={false}
            adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn style={tableWeekdayStyles}>Sun <span className="week-date">{currentWeekDays[0]}</span></TableHeaderColumn>
              <TableHeaderColumn style={tableHeaderStyles}>Mon <span className="week-date">{currentWeekDays[1]}</span></TableHeaderColumn>
              <TableHeaderColumn style={tableHeaderStyles}>Tue <span className="week-date">{currentWeekDays[2]}</span></TableHeaderColumn>
              <TableHeaderColumn style={tableHeaderStyles}>Wed <span className="week-date">{currentWeekDays[3]}</span></TableHeaderColumn>
              <TableHeaderColumn style={tableHeaderStyles}>Thu <span className="week-date">{currentWeekDays[4]}</span></TableHeaderColumn>
              <TableHeaderColumn style={tableHeaderStyles}>Fri <span className="week-date">{currentWeekDays[5]}</span></TableHeaderColumn>
              <TableHeaderColumn style={tableWeekdayStyles}>Sat <span className="week-date">{currentWeekDays[6]}</span></TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false} showRowHover={false} style={{position: "relative"}}>
            {
              toRenderTableColums.map((item, index) => {
                return (
                  <TableRow key={index}>
                    <TableRowColumn></TableRowColumn>
                    <TableRowColumn></TableRowColumn>
                    <TableRowColumn></TableRowColumn>
                    <TableRowColumn></TableRowColumn>
                    <TableRowColumn></TableRowColumn>
                    <TableRowColumn></TableRowColumn>
                    <TableRowColumn></TableRowColumn>
                  </TableRow>
                )
              })
            }
          </TableBody>
        </Table>
      </div>
    )
  }

  componentDidMount () {
    var self = this;

    var today = new Date();

    var dateElems = document.getElementsByClassName("week-date");
    console.log(dateElems);

    for (let i = 0; i < dateElems.length; i++) {
      if (dateElems[i].innerText.trim() === today.getDay().toString()) {
        dateElems[i].style.lineHeight = "30px";
        dateElems[i].style.borderRadius = "50%";
        dateElems[i].style.backgroundColor = "rgb(252, 61, 57)";
        dateElems[i].style.color = "white";
        dateElems[i].style.display = "inline-block";
        dateElems[i].style.width = "30px";
      }
    }
  }
}

export default Week;
