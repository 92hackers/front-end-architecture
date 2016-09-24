// Teacher online test.

import React from 'react';
import {connect} from 'react-redux';

import { Step, Stepper, StepLabel } from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';

import WaitForSubmit from '../../universal/WaitForSubmit';
import Notification from '../../universal/Notification';
import api from '../../network/api';

import OnlineClassroomGuide from './OnlineClassroomGuide';
import ESL from './ESL';
import BestPracitices from './BestPracitices';
import LessonGuide from './LessonGuide';
import SpecialConsiderations from './SpecialConsiderations';


class OnlineTest extends React.Component {

  constructor (props) {
    super (props);
    this.state = {
      stepIndex: 0,
      notification: "",
      finished: false
    };
    this.token = this.props.token || "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9hcGkueWl5b3VhYmMuY29tIiwiYXVkIjoiaHR0cDpcL1wvYXBpLnlpeW91YWJjLmNvbSIsImlhdCI6MTQ3MzM4ODkwNiwibmJmIjoxNDczMzg4OTA2LCJqdGkiOjJ9.HJe0eHGwNU8W4oO8RUA1eVx_JdVZACB1ZYOsdN3Dqno";
    this.stepTitles = [
      "Online Classroom Guide",
      "ESL Concepts and Principles",
      "Online Teaching Best Pracitices",
      "Special Considerations for Chinese students",
      "WeTeach Lesson Guide"
    ];
  }

  handleNext () {
    var stepIndex = this.state.stepIndex;
    if (stepIndex < 4) {
      this.setState({
        stepIndex: stepIndex + 1
      });
    }
  }

  getStepContent (stepIndex) {

    switch (stepIndex) {
      case 0 :
        return <OnlineClassroomGuide token={this.token}></OnlineClassroomGuide>;
        break;
      case 1 :
        return <ESL token={this.token}></ESL>;
        break;
      case 2 :
        return <BestPracitices token={this.token}></BestPracitices>;
        break;
      case 3 :
        return <SpecialConsiderations token={this.token}></SpecialConsiderations>
        break;
      case 4 :
        return <LessonGuide token={this.token}></LessonGuide>;
        break;
      default:
    }

  }

  componentWillMount () {

  }

  render () {
    var stepIndex = this.state.stepIndex;
    return (
      <div className="online-test">
        <MuiThemeProvider>
          <div>
            <div className="container">
              <Stepper activeStep={stepIndex}>
                {
                  this.stepTitles.map((item, index) => {
                    return (
                      <Step key={index}>
                        <StepLabel>{item}</StepLabel>
                      </Step>
                    );
                  })
                }
              </Stepper>
              <div className="step-content">
                <Paper className="article" zDepth={1}>
                  {this.getStepContent(stepIndex)}
                  <div className="submit">
                    <RaisedButton className="submit-btn" label="Next" primary={true} onClick={this.handleSubmit.bind(this)}></RaisedButton>
                    <WaitForSubmit ref="loader" successMessage="Correct!" failMessage="Incorrect!"></WaitForSubmit>
                  </div>
                </Paper>
              </div>
            </div>
            <Notification ref="notification" message={this.state.notification}></Notification>
          </div>
        </MuiThemeProvider>
      </div>
    )
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

  handleSubmit () {
    var self = this;
    var stepIndex = this.state.stepIndex;
    var elem0 = document.querySelector("input[name='quiz0']:checked");
    var elem1 = document.querySelector("input[name='quiz1']:checked");

    if (!elem0 || !elem1) {
      this.notify("Please Answer All Questions !");
      return ;
    }

    var data = {
      answer: [
        {
          qid: elem0.dataset.qid,
          ans: elem0.dataset.label
        },
        {
          qid: elem1.dataset.qid,
          ans: elem1.dataset.label
        }
      ]
    };

    console.log(data);

    this.refs.loader.displayLoader();

    var param = stepIndex + 1;

    api.OnlineTestCheck(data,
      { "Authorization": self.token },
      param,
      (resp) => {
        if (resp.success) {
          self.refs.loader.displaySuccess(self.handleNext, self);
        } else {
          self.refs.loader.displayError();
        }
      },
      (err) => {
        alert("network error.");
      }
    );

  }

  componentDidMount () {
    var self = this;

  }

}

export default OnlineTest;
