
import React from 'react';

class Day extends React.Component {

  constructor(props) {
    super (props);
  }

  render () {

    const times = ["12 AM", "", "1 AM", "", "2 AM", "", "3 AM", "", "4 AM", "", "5 AM", "", "6 AM", "", "7 AM", "",
      "8 AM", "", "9 AM", "", "10 AM", "", "11 AM", "", "noon", "", "1 PM", "", "2 PM", "",  "3 PM", "",  "4 PM", "",
      "5 PM", "", "6 PM", "", "7 PM", "", "8 PM", "", "9 PM", "", "10 PM", "", "11 PM", "", "12 AM"
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
            return (
              <li key={index} className="time-point row">
                <div className="time-tag col-3"><span className="inner-time-value">{time}</span></div>
                <div className="time-line col-9"></div>
              </li>
            )
          })
        }
        </ul>
      </section>
    )
  }

  componentDidMount () {
    var self = this;
    var targetBox = document.getElementById("day-time-box");
    targetBox.scrollTop =  17.5 * 100;
  }

}

export default Day;
