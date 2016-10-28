// Teacher online test.

import React from 'react';
import { Link } from 'react-router';
import { autobind } from 'core-decorators';

import { Step, Stepper, StepLabel } from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import { blue500, red500 } from 'material-ui/styles/colors';

import WaitForSubmit from '../../universal/WaitForSubmit';

import OnlineClassroomGuide from './OnlineClassroomGuide';
import ESL from './ESL';
import BestPracitices from './BestPracitices';
import LessonGuide from './LessonGuide';
import SpecialConsiderations from './SpecialConsiderations';

class OnlineTestComp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      stepIndex: this.props.examon - 1 || 0,
      notification: '',
      isFinished: this.props.examon === 5 || false,
    };
    this.stepTitles = [
      'Online Classroom Guide',
      'ESL Concepts and Principles',
      'Online Teaching Best Pracitices',
      'Special Considerations for Chinese students',
      'WeTeach Lesson Guide',
    ];
  }

  getStepContent(stepIndex) {
    const { getTestQuestions, clearTestQuestions } = this.props
    switch (stepIndex) {
      case 0 :
        return (
          <OnlineClassroomGuide
            getTestQuestions={getTestQuestions}
            clearTestQuestions={clearTestQuestions}
          />
        )
      case 1 :
        return (
          <ESL
            getTestQuestions={getTestQuestions}
            clearTestQuestions={clearTestQuestions}
          />
        )
      case 2 :
        return (
          <BestPracitices
            getTestQuestions={getTestQuestions}
            clearTestQuestions={clearTestQuestions}
          />
        )
      case 3 :
        return (
          <SpecialConsiderations
            getTestQuestions={getTestQuestions}
            clearTestQuestions={clearTestQuestions}
          />
        )
      case 4 :
        return (
          <LessonGuide
            getTestQuestions={getTestQuestions}
            clearTestQuestions={clearTestQuestions}
          />
        )
      default:
        return <div />
    }
  }

  handleNext() {
    const stepIndex = this.state.stepIndex;
    if (stepIndex === 4) {
      this.setState({
        isFinished: true,
      });
    }
    if (stepIndex < 5) {
      this.setState({
        stepIndex: stepIndex + 1,
      })
    }
  }

  @autobind
  handleSubmit() {
    const self = this;
    const stepIndex = this.state.stepIndex;
    const elem0 = document.querySelector("input[name='quiz0']:checked");
    const elem1 = document.querySelector("input[name='quiz1']:checked");

    const { showNotification, checkAnswer, getProfile } = this.props

    if (!elem0 || !elem1) {
      showNotification('Please complete all questions.');
      return;
    }

    const data = {
      answer: [
        {
          qid: elem0.dataset.qid,
          ans: elem0.dataset.label,
        },
        {
          qid: elem1.dataset.qid,
          ans: elem1.dataset.label,
        },
      ],
    };

    const { loader } = this.refs

    loader.displayLoader();

    const param = stepIndex + 1;

    checkAnswer(param, data).then((res) => {
      if (res.payload.success) {
        window.scrollTo(0, 0)
        loader.displaySuccess(self.handleNext, self)

        if (param === 5) {
          getProfile()
        }
      } else {
        loader.displayError()
      }
    })
  }

  render() {
    const { stepIndex, isFinished } = this.state

    const articleContent = isFinished ? (
      <div className="successful-words text-center ">
        <p style={{ color: blue500, fontSize: 24, marginBottom: 20 }}>
          Thanks for completing the self-study moduals.
        </p>
        <p style={{ color: blue500, fontSize: 24 }}>
          You could click<Link style={{ color: red500 }} className="go-to-dashboard" to="/teacher-homepage">Here</Link>to go to your homepage.
        </p>
      </div>
    ) : (
      <div>
        {this.getStepContent(stepIndex)}
        <div className="submit">
          <RaisedButton className="submit-btn" label="Next" primary onClick={this.handleSubmit} />
          <WaitForSubmit ref="loader" successMessage="Correct!" failMessage="Incorrect!" />
        </div>
      </div>
    );

    return (
      <div className="online-test">
        <div>
          {
            !this.props.pendingCounter ? (
              <div className="container">
                <Stepper activeStep={stepIndex}>
                  {
                    this.stepTitles.map((item, index) => (
                      <Step key={index}>
                        <StepLabel>{item}</StepLabel>
                      </Step>
                    ))
                  }
                </Stepper>
                <div className="step-content">
                  <Paper className="article" zDepth={1}>
                    {articleContent}
                  </Paper>
                </div>
              </div>
                ) : <div />
          }
        </div>
      </div>
    )
  }
}

export default OnlineTestComp;
