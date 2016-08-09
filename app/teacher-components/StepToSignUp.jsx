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
                <StepLabel>Select campaign settings</StepLabel>
              </Step>
              <Step>
                <StepLabel>Create an ad group</StepLabel>
              </Step>
              <Step>
                <StepLabel>Create an ad</StepLabel>
              </Step>
            </Stepper>
          </div>
        </div>
      </section>
    )
  }
}

export default StepToSignUp;
