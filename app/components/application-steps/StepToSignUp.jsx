// step page to complete sign up process.
import React from 'react';
import { browserHistory } from 'react-router';
import { autobind } from 'core-decorators'

import { Step, Stepper, StepLabel } from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import { blue500 } from 'material-ui/styles/colors';
import Dialog from 'material-ui/Dialog';
import FaCheckCircle from 'react-icons/lib/fa/check-circle'

import WaitForSubmit from '../universal/WaitForSubmit';

@autobind
class StepToSignUpComp extends React.Component {
  constructor(props) {
    super(props);
    const queryParam = this.props.location.query.reschedule;
    this.state = {
      stepIndex: queryParam === 'true' ? 2 : 0,
      confirmDialogueOpen: false,
      isFinished: false,
    };
    this.clickNextBtn = this.clickNextBtn.bind(this)
  }

  @autobind
  handleNext() {
    const { stepIndex } = this.state;

    if (stepIndex < 2) {
      this.setState({
        stepIndex: stepIndex + 1,
      });
    }
  }

  @autobind
  handlePrev() {
    const { stepIndex } = this.state;

    if (stepIndex > 0) {
      this.setState({
        stepIndex: stepIndex - 1,
      });
    }
  }

  displayLoader() {
    this.refs.loader.displayLoader();
  }

  displaySuccess() {
    this.refs.loader.displaySuccess(this.handleNext, this);
  }

  displayError() {
    this.refs.loader.displayError();
  }

  handleClose() {
    this.setState({
      confirmDialogueOpen: false,
    });
  }

  handleOpen() {
    this.setState({
      confirmDialogueOpen: true,
    });
  }

  displaySuccessWorlds() {
    const { stepIndex } = this.state
    this.setState({
      isFinished: true,
      stepIndex: stepIndex + 1,
    });
  }

  handleYes() {
    this.refs.scheduleInterview.getWrappedInstance().handleSubmit();
    this.handleClose();
  }

  clickNextBtn() {
    const { stepIndex } = this.state
    switch (stepIndex) {
      case 0: {
        const basicInfoForm = this.refs.basicInfo.getWrappedInstance()
        basicInfoForm.wrappedInstance.handleSubmit(basicInfoForm.values)
        break;
      }
      default: {
        const teachingExperienceForm = this.refs.teachingExperience.getWrappedInstance()
        teachingExperienceForm.wrappedInstance.handleSubmit(teachingExperienceForm.values)
        break;
      }
    }
  }

  setProposedTime({ timeCN, timeLoc }) {
    this.setState({
      timeCN,
      timeLoc,
    })
  }

  componentDidUpdate() {
    const { isFinished } = this.state
    /* eslint no-undef: 0 */
    if (isFinished) {
      addthis.init()
      addthis.toolbox('.addthis_inline_share_toolbox')
    }
      /* eslint no-undef: 1 */
  }

  render() {
    const stepperStyle = {
      width: '100%',
      paddingLeft: 74,
      paddingRight: 74,
      marginBottom: 20,
    };

    const { stepIndex, isFinished } = this.state

    const rightButton = stepIndex !== 2 ? (
      <RaisedButton
        className="submit-btn"
        labelStyle={{ fontSize: 24 }}
        style={{ width: 176, height: 50 }}
        primary
        label="Next"
        onTouchTap={this.clickNextBtn}
        disabled={stepIndex === 2}
      />
    ) : (
      <RaisedButton
        labelStyle={{ fontSize: 24 }}
        style={{ width: 176, height: 50 }}
        primary
        label="Finish"
        onTouchTap={this.handleClose()}
      />
    )

    const { timeCN, timeLoc } = this.state

    const content = isFinished ? (
      <div className="successful-words">
        <div id="toolbox" />
        <p className="thank-you text-center"><FaCheckCircle className="fa fa-check-circle" /><span style={{ color: blue500, fontSize: '30px', fontWeight: 'bold', marginLeft: 10 }}>Thank you!</span></p>
        <p>You proposed an interview time for:</p>
        <div className="two-times">
          <p><span className="title">China standard time</span><span className="time">{timeCN}</span></p>
          <p><span className="title">Your local time</span><span className="time">{timeLoc}</span></p>
        </div>
        <p className="note">
          We are now reviewing your application. We will let you know if we can proceed at least 24 hours before your proposed interview time.
          We have sent you an email with the details of your proposed interview and a link in case you need to reschedule.
        </p>
        <div className="self-study-link">Please complete a few self-study moduals: <RaisedButton style={{ marginLeft: 50 }} label="Here" primary className="go-to-test" onClick={() => browserHistory.push('/teacher-online-test')} /></div>
        <p>In the meantime, if you would like to invite a friend to apply as a teacher to WeTeach, please click share bttons below.</p>
        <div className="text-center share-btns">
          <div style={{ display: 'inline-block' }} className="addthis_inline_share_toolbox addthis_toolbox addthis_default_style addthis_32x32_style">
            <a className="addthis_button_email" style={{ cursor: 'pointer' }}></a>
            <a className="addthis_button_facebook" style={{ cursor: 'pointer' }}></a>
            <a className="addthis_button_twitter" style={{ cursor: 'pointer' }}></a>
            <a className="addthis_button_linkedin" style={{ cursor: 'pointer' }}></a>
          </div>
        </div>
      </div>
    ) : (
      <div>
        {this.getContent(stepIndex)}
        <div className="text-center two-buttons">
          <div className="btn-group">
            <FlatButton
              disabled={!stepIndex}
              label="Back"
              style={{ marginRight: 12 }}
              onTouchTap={this.handlePrev}
            />
            {rightButton}
            <div style={{ display: 'inline-block' }}>
              <WaitForSubmit
                ref="loader"
                successMessage="Saved"
                failMessage="Error"
                style={{ verticalAlign: 'middle' }}
              />
            </div>
          </div>
        </div>
      </div>
    );

    const actions = [
      <RaisedButton
        className="dialog-button"
        label="No"
        default
        onTouchTap={this.handleClose}
      />,
      <RaisedButton
        className="dialog-button"
        label="Yes"
        primary
        onTouchTap={this.handleYes}
      />,
    ];

    const stepLabelStyle = {
      fontSize: 20,
      color: '#2196f3',
    };

    return (
      <section className="step-to-sign-up">
        <div className="container">
          <div className="stepper-wrap">
            <Stepper style={stepperStyle} activeStep={this.state.stepIndex}>
              <Step>
                <StepLabel className="step-label" style={stepLabelStyle}>Personal profile</StepLabel>
              </Step>
              <Step>
                <StepLabel className="step-label" style={stepLabelStyle}>Teaching experience</StepLabel>
              </Step>
              <Step>
                <StepLabel className="step-label" style={stepLabelStyle}>Interview propose</StepLabel>
              </Step>
            </Stepper>
            <div className="step-content">
              <section className="content">
                {content}
              </section>
            </div>
          </div>
          <Dialog
            actions={actions}
            modal={false}
            open={this.state.confirmDialogueOpen}
            onRequestClose={this.handleClose}
            autoScrollBodyContent
          >
            <h2 style={{ marginBottom: 30 }} className="confirm-words text-center">Please note:</h2>
            <h2 style={{ marginBottom: 30 }} className="confirm-words text-center">Once you submit your application you will not be able to make any changes.</h2>
            <h2 className="confirm-words text-center">Would you like to confirm your application?</h2>
          </Dialog>
        </div>
      </section>
    )
  }
}

export default StepToSignUpComp;
