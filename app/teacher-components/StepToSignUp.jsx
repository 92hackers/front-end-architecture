// step page to complete sign up process.

import React from 'react';
import { Step, Stepper, StepLabel } from 'material-ui/Stepper';

class StepToSignUp extends React.Component {

  constructor (props) {
    super (props);
    this.state = {
      stepIndex: 0
    };
  }

  render () {
    return (
      <section className="step-to-sign-up">
        <div className="container">
          <div className="row">
            <Stepper activeStep={this.state.stepIndex}>
              <Step>
                <StepLabel>Complete profile</StepLabel>
              </Step>
              <Step>
                <StepLabel>Teaching experience</StepLabel>
              </Step>
              <Step>
                <StepLabel>Schedule interview</StepLabel>
              </Step>
            </Stepper>
          </div>
        </div>
      </section>
    )
  }
}

export default StepToSignUp;
