import React from 'react'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import CircularProgress from 'material-ui/CircularProgress'
import { autobind } from 'core-decorators'

class ScheduleInterview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dateValue: 0,
      timeValue: 0,
      availableDate: [],
      availableTime: [],
      allAvailableTime: [],
      timeToIdMapping: [],
      dataIsReady: false,
    };
  }

  componentWillMount() {
    const { timezoneId, getInterviewList } = this.props

    getInterviewList(timezoneId)        // 这个地方有问题，如何判断是否 timetable 是空的，已经被排满了？
    .then(() => this.setState({ dataIsReady: true }))
    .catch(() => this.setState({ dataIsReady: true }))
  }

  @autobind
  bookTheViewDateChange(e, index, value) {
    this.setState({
      dateValue: value,
      timeValue: 0,
      availableTime: this.state.allAvailableTime[index],
    });
  }

  @autobind
  bookTheViewTimeChange(e, index, value) {
    this.setState({
      timeValue: value,
    });
  }

  render() {
    const date = []
    const time = []
    const { interviewTimeList } = this.props
    /* eslint no-unused-vars: 0 */
    let allTimeBooked = false
    if (interviewTimeList.length > 0) {
      interviewTimeList.forEach((item) => {
        date.push(item.date)
        time.push(item.timeList)
      })
    } else {
      allTimeBooked = true
    }

    return (
      <div className="schedule-interview">
        <div className="wrap">
          <h1 className="title">Schedule Video Interview</h1>
          {
            this.state.dataIsReady ? (
              <div className="input-box">
                <div className="input-item">
                  <span className="interview-icon"><i className="fa fa-calendar" /></span>
                  <SelectField
                    style={{ verticalAlign: 'middle' }}
                    value={this.state.dateValue}
                    onChange={this.bookTheViewDateChange}
                  >
                    {
                      this.state.availableDate.map((item, index) => <MenuItem style={{ cursor: 'pointer' }} value={index} key={index} primaryText={item} />)
                    }
                  </SelectField>
                </div>
                <br />
                <div className="input-item">
                  <span className="interview-icon"><i className="fa fa-clock-o" /></span>
                  <SelectField
                    style={{ verticalAlign: 'middle' }}
                    id="interview-time"
                    value={this.state.timeValue}
                    onChange={this.bookTheViewTimeChange}
                  >
                    {
                      this.state.availableTime.map((item, index) => <MenuItem style={{ cursor: 'pointer' }} value={index} key={index} primaryText={item.period} />)
                    }
                  </SelectField>
                </div>
              </div>
            ) : <CircularProgress />
          }
        </div>
      </div>
    )
  }

  handleSubmit() {
    const interviewPeriod = document.getElementById('interview-time').innerText.trim();
    const {
      updateInterview,
      showNotification,
      networkError,
      displaySuccessWorlds,
      getProfile,
    } = this.props

    if (!interviewPeriod) {
      self.props.showNotification('Please select an interview time.');
      return;
    }

    // TODO:  这里需要增加 time to id 的映射。
    const interviewId = 0
    const data = {
      inter_time: interviewId,
    }

    updateInterview(data).then((res) => {
      if (res.payload.success) {
        displaySuccessWorlds()
        getProfile()
      } else {
        networkError()
      }
    }).catch(() => networkError())
  }
}

export default ScheduleInterview
