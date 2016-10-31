/* eslint-disable */
import React from 'react';

export default class Day extends React.Component {

  componentDidMount() {
    const self = this;
    const targetBox = document.getElementById('gday-time-box');
    targetBox.scrollTop = 17.5 * 100;

    var timeData = ["10:30 PM", "6:30 PM", "1:30 PM", "4:30 AM"];

    //TODO:  fetch data from server.

    var timeLineElems = document.getElementsByClassName("time-line");

    var count = 0;

    for (let i = 0; i < timeLineElems.length; i++) {
      for (let j = 0; j < timeData.length; j++) {
        if (timeLineElems[i].dataset.time === timeData[j]){
          count++;
          timeLineElems[i].style.backgroundColor = "#ddd";
          break;
        }
      }
      if (count === timeData.length) {
        break;
      }
    }
  }

  render() {
    const times = [
      "12 AM", "12:30 AM", "1 AM", "1:30 AM", "2 AM", "2:30 AM", "3 AM", "3:30 AM", "4 AM", "4:30 AM", "5 AM", "5:30 AM", "6 AM", "6:30 AM", "7 AM", "7:30 AM",
      "8 AM", "8:30 AM", "9 AM", "9:30 AM", "10 AM", "10:30 AM", "11 AM", "11:30 AM", "12:00", "12:30", "1 PM", "1:30 PM", "2 PM", "2:30 PM", "3 PM", "3:30 PM", "4 PM", "4:30 PM",
      "5 PM", "5:30 PM", "6 PM", "6:30 PM", "7 PM", "7:30 PM", "8 PM", "8:30 PM", "9 PM", "9:30 PM", "10 PM", "10:30 PM", "11 PM", "11:30 PM", "12 AM"
    ];

    const months = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday",
      "Friday", "Saturday"
    ];

    var today = new Date();

    var month = months[today.getMonth()];

    var weekday = weekdays[today.getDay()];

    return (
      <section className="day-picker clearfix">
        <div className="row">
          <div className="day-title-wrap col-9">
            <h1 className="day-title">
              <span className="day-month">{month}</span>
              <span className="day-date">{today.getDate()}</span>
              <span className="day-dot">,</span>
              <span className="day-year">{today.getFullYear()}</span>
            </h1>
            <h3 className="day-weekday">{weekday}</h3>
          </div>
        </div>
        <ul id="day-time-box">
          {
            times.map((time, index) => {
              let data = "";
              let regExp = /:30/;
              if (regExp.test(time)) {
                data = "";
              } else {
                data = time;
              }
              return (
                <li key={index} className="time-point row">
                  <div className="time-tag col-3"><span className="inner-time-value">{data}</span></div>
                  <div data-time={time} className="time-line col-9"></div>
                </li>
              )
            })
          }
        </ul>
      </section>
    )
  }
}
