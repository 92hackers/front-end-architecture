import React from 'react'

class ScheduleInterview extends React.Component {

  constructor (props) {
    super (props);
    this.state = {
      dateValue: 0,
      timeValue: 0,
      availableDate: [],
      availableTime: [],
      allAvailableTime: [],
      timeToIdMapping: [],
      dataIsReady: false,
      notification: ""
    };
    this.token = this.props.token;
  }

  bookTheViewDateChange (e, index, value) {
    this.setState({
      dateValue: value,
      timeValue: 0,
      availableTime: this.state.allAvailableTime[index]
    });
  }

  bookTheViewTimeChange (e, index, value) {
    this.setState({
      timeValue: value
    });
  }

  fetchInterviewData (TimezoneId) {
    var self = this;

    var token = self.props.token;

    this.interviewDateTimeRequest = api.TInterview("",
    { "Authorization": token },
    TimezoneId,
    (resp) => {
      if (resp.success) {
        var data = resp.data;
        var interviewTime = data["timetable"].map((date, index) => {
          return {
            date: date["inter_date"],
            timeList: date["inter_time"].map((time,index) => {
              return {
                id: time.id,
                period: time.period
              };
            })
          };
        });
        var date = [];
        var time = [];
        var timeToIdMapping = [];
        for (let i = 0; i < interviewTime.length; i++) {
          date.push(interviewTime[i].date);
          time.push(interviewTime[i].timeList);
        }

        for (let j = 0; j < time.length; j++) {
          for (let k = 0; k < time[j].length; k++) {
            timeToIdMapping.push({
              id: time[j][k].id,
              period: time[j][k].period
            });
          }
        }

        self.setState({
          dataIsReady: true,
          availableDate: date || [],
          allAvailableTime: time || [],
          timeToIdMapping: timeToIdMapping || [],
          availableTime: time[0] || []
        });
      } else {
        console.log("fetch interview time data error.");
      }
    },
    (err) => {
      console.log("interview request error.");
    }
  )

}

  render () {
    return (
      <div className="schedule-interview">
        <div className="wrap">
          <h1 className="title">Schedule Video Interview</h1>
          {
            this.state.dataIsReady ? (
              <div className="input-box">
                <div className="input-item">
                  <span className="interview-icon"><i className="fa fa-calendar"></i></span>
                  <SelectField style={{verticalAlign: "middle"}} value={this.state.dateValue} onChange={this.bookTheViewDateChange.bind(this)}>
                    {
                      this.state.availableDate.map((item, index) => {
                        return <MenuItem style={{cursor: "pointer"}} value={index} key={index} primaryText={item}></MenuItem>;
                      })
                    }
                  </SelectField>
                </div>
                <br/>
                <div className="input-item">
                  <span className="interview-icon"><i className="fa fa-clock-o"></i></span>
                  <SelectField style={{verticalAlign: "middle"}} id="interview-time" value={this.state.timeValue} onChange={this.bookTheViewTimeChange.bind(this)}>
                    {
                      this.state.availableTime.map((item, index) => {
                        return <MenuItem style={{cursor: "pointer"}} value={index} key={index} primaryText={item.period}></MenuItem>;
                      })
                    }
                  </SelectField>
                </div>
              </div>
                ) : <CircularProgress></CircularProgress>
          }
        </div>
      </div>
    )
  }

  componentDidMount () {
    this.fetchInterviewData(this.props.timezoneId);
  }

  handleSubmit () {
    var self = this;
    var interviewPeriod = document.getElementById("interview-time").innerText.trim();

    if (!interviewPeriod) {
      self.props.showNotification("Please select an interview time.");
      return;
    }

    var interviewId = "";
    var timeToIdMapping = this.state.timeToIdMapping;

    for (let i = 0; i < timeToIdMapping.length; i++) {
      if (timeToIdMapping[i].period === interviewPeriod) {
        interviewId = timeToIdMapping[i].id;
      }
    }

    var data = {
      "inter_time": interviewId
    };

    api.TApplyStep3(data,
      {"Authorization": self.token},
      "",
      (resp) => {
        if (resp.success) {
          self.props.displaySuccessWorlds();
          api.TGetProfile("",
          {"Authorization": self.token},
          "",
          (resp) => {
            if (resp.success) {
              self.props.getProfile(resp.data);
            }
          },
          (err) => {
            self.props.networkError();
          }
          );
        } else {
          self.props.showNotification(resp.data.error);
        }
      },
      (err) => {
        self.props.networkError();
      }
    );

  }

}

export default ScheduleInterview
