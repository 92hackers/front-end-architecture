import React from 'react'
import CircularProgress from 'material-ui/CircularProgress'
import { blue500 } from 'material-ui/styles/colors'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import api from '../network/api'

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
      notification: "",
      allTimeBooked: false,
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

  fetchInterviewData() {
    var self = this;

    var token = self.props.token;

    const { showNotification } = this.props

    this.interviewDateTimeRequest = api.TInterview("",
    { "Authorization": token },
    '',
    (resp) => {
      if (resp.success) {
        self.setState({
          dataIsReady: true,
        })

        var data = resp.data;
        if (!data.timetable.length) {
          self.setState({
            allTimeBooked: true,
          })
          showNotification('All interview times are currently booked. Please contact support: teacher@weteach.info and we will try and arrange an alternative interview time as soon as possible.')
          return ;
        }
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
        var timeToIdMapping = data.timetable;
        for (let i = 0; i < interviewTime.length; i++) {
          date.push(interviewTime[i].date);
          time.push(interviewTime[i].timeList);
        }

        self.setState({
          availableDate: date || [],
          allAvailableTime: time || [],
          timeToIdMapping: timeToIdMapping || [],
          availableTime: time[0] || []
        });
      } else {
        showNotification('Fetching interview time data error. Please contact supprt: teacher@weteach.info.')
      }
    },
    (err) => {
      showNotification('Network is busy, please try again later.')
    }
  )
}

  render () {
    return (
      <div className="schedule-interview">
        <div className="wrap">
          <header>
            <h1 className="title">Propose an interview time</h1>
            <div className="notes">
              <p>Please note, all times are in China Standard Time.</p>
              <p>You can click <a href="http://timebie.com/" target="_blank" style={{ color: blue500, textDecoration: 'underline' }}>here</a> to determine the time difference between your location and China.</p>
            </div>
          </header>
          {
            this.state.dataIsReady ? (
              <div className="input-box">
                {
                  this.state.allTimeBooked ? (
                    <p className="all-time-booked">All interview times are currently booked. Please contact support: teacher@weteach.info.</p>
                  ) : (
                    <div>
                      <div className="input-item">
                        <span className="interview-icon"><i className="fa fa-calendar"></i></span>
                        <SelectField style={{verticalAlign: "middle"}} id="interview-date" value={this.state.dateValue} onChange={this.bookTheViewDateChange.bind(this)}>
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
                  )
                }
              </div>
            ) : <CircularProgress></CircularProgress>
          }
        </div>
      </div>
    )
  }

  componentDidMount() {
    window.scrollTo(0, 0)
    this.fetchInterviewData()
  }

  handleSubmit () {
    var self = this;

    if (this.state.allTimeBooked) {
      return;
    }

    const interviewDate = document.getElementById('interview-date').innerText.trim();
    const interviewPeriod = document.getElementById("interview-time").innerText.trim();

    if (!interviewDate) {
      this.props.showNotification('Please select an interview date.')
    } else if (!interviewPeriod) {
      self.props.showNotification("Please select an interview time.");
      return;
    }

    var interviewId = "";
    var timeToIdMapping = this.state.timeToIdMapping;

    for (let i = 0; i < timeToIdMapping.length; i++) {
      let tmp1 = timeToIdMapping[i]
      if (tmp1.inter_date === interviewDate) {
        for (let j = 0; j < tmp1.inter_time.length; j++) {
          let tmp2 = tmp1.inter_time[j]
          if (tmp2.period === interviewPeriod) {
            interviewId = tmp2.id;
            break;
          }
        }
        break;
      }
    }

    const { setProposedTime } = this.props

    var data = {
      "inter_time": interviewId
    };

    api.TApplyStep3(data,
      {"Authorization": self.token},
      "",
      (resp) => {
        if (resp.success) {
          const { timeCN, timeLoc } = resp.data
          setProposedTime({ timeCN, timeLoc })

          api.TGetProfile("",
          {"Authorization": self.token},
          "",
          (resp) => {
            if (resp.success) {
              self.props.displaySuccessWorlds();
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
