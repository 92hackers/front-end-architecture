
// Teacher online test.

import React from 'react';
import { Step, Stepper, StepLabel } from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';

class OnlineTest extends React.Component {

  constructor (props) {
    super (props);
    this.state = {
      stepIndex: 0,
      finished: false
    };
    this.token = this.props.token || "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9hcGkueWl5b3VhYmMuY29tIiwiYXVkIjoiaHR0cDpcL1wvYXBpLnlpeW91YWJjLmNvbSIsImlhdCI6MTQ3MzM4ODkwNiwibmJmIjoxNDczMzg4OTA2LCJqdGkiOjJ9.HJe0eHGwNU8W4oO8RUA1eVx_JdVZACB1ZYOsdN3Dqno";
    this.stepTitles = [
      "Trial Lessons",
      "Special Considerations",
      "Concepts and Principles",
      "Online Resources",
      "Normal Lessons",
      "Online Teaching Game"
    ];
  }

  handlePrev () {

  }

  handleNext () {

  }

  getStepContent (stepIndex) {

    var trialLesson = (
      <div>
        <h1>Teacher’s Guide to New Student Trial Lessons</h1>
        <p>A Trial Lesson marks the beginning of what we hope will be a fruitful and long-lasting relationship between the you and your new student. The student’s experience during the Trial Lesson will determine whether or not he or she will continue studying with you.</p>
        <h2>Preparation</h2>
        <h3>Lesson objectives</h3>
        <p>The Trial Lesson’s objectives differ from those of a Returning Student Lesson. There are three main aims:</p>
        <ul>
          <li>Begin building rapport with the student.</li>
          <li>Determine the student’s starting Oxford Level.</li>
          <li>Present and practice new language in selected text (if time permits).</li>
        </ul>
        <h3>Virtual classroom setup</h3>
        <p>Make sure you have installed Zoom on your machine and that you are comfortable using its basic functions. (Refer to the Teacher’s Guide to Online Resources for more information.)</p>
        <h3>Recommended lesson texts</h3>
        <p>Open the following 6 Oxford Owl texts, each in a separate internet browser tab or window:</p>
        <ul>
          <li>Can You See Me? (Oxford Level 1+)</li>
          <li>The Toys’ Party (Oxford Level 2)</li>
          <li>What’s the Weather Like Today? (Oxford Level 3)</li>
          <li>The Scarf (Oxford Level 4)</li>
          <li>Kipper and the Trolls (Oxford Level 5)</li>
          <li>Land of the Dinosaurs (Oxford Level 6)</li>
        </ul>
        <p>Be sure to go through each page of the different texts so that they will fully load in your browser.</p>
      </div>
    );

    switch (stepIndex) {
      case 0 :
        return trialLesson;
        break;
      case 1 :

        break;
      case 2 :

        break;
      case 3 :

        break;
      case 4 :

        break;
      case 5 :

        break;
      default:

    }
  }

  render () {
    var stepIndex = this.state.stepIndex;
    return (
      <div className="online-test">
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
            </Paper>
          </div>
        </div>
      </div>
    )
  }

  componentDidMount () {
    var self = this;


  }

}

export default OnlineTest;
