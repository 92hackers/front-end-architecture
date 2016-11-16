// step page to complete sign up process.
import React from 'react'
import { Link } from 'react-router'
import { autobind } from 'core-decorators'

import { Step, Stepper, StepLabel } from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import { red500 } from 'material-ui/styles/colors';

import SiteLoading from '../../containers/SiteLoading';
import WaitForSubmit from '../universal/WaitForSubmit';

import BasicInfo from './BasicInfo'
import TeachingExperience from './TeachingExperience'
import ScheduleInterview from './ScheduleInterview'

export default class StepToSignUp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      stepIndex: 0,
      timezoneId: '',
      confirmDialogueOpen: false,
      isFinished: false,
    }
  }

  componentDidMount() {
    const {
      getNationalityList,
      getCountryList,
      getTimezoneList,
      getRegionList,
      getCityList,

      residence_n,
      residence_p,
    } = this.props
    if (residence_n) getRegionList(residence_n)
    if (residence_p) getCityList(residence_p)
    getNationalityList()
    getCountryList()
    getTimezoneList()
  }

  handleNext() {
    const { stepIndex } = this.state;
    if (stepIndex < 2) {
      this.setState({
        stepIndex: stepIndex + 1,
      });
    }
  }

  handlePrev() {
    const { stepIndex } = this.state;
    if (stepIndex > 0) {
      this.setState({
        stepIndex: stepIndex - 1,
      });
    }
  }

  setTimezoneId(id) {
    this.setState({
      timezoneId: id,
    })
  }

  getContent(stepIndex) {
    const {
      profile,
      timezoneId,
      showNotification,
      networkError,
      getProfile,
      nationalityList,
      countryList,
      regionList,
      cityList,
      timezoneList,
      getRegionList,
      getCityList,
      updateBasicInfo,
      updateInterview,
      updateTeachingExp,
      changeTimezoneAtApplication,
      getInterviewList,
      interviewTimeList,
    } = this.props

    switch (stepIndex) {
      case 0: {
        let experience = '';

        switch (profile.experience) {
          case 3 :
            experience = 2;
            break;
          case 2 :
            experience = 1;
            break;
          case 1 :
            experience = 0;
            break;
          default:
            experience = '';
        }

        return (
          <BasicInfo
            {...{
              profile,
              showNotification,
              networkError,
              nationalityList,
              countryList,
              regionList,
              cityList,
              timezoneList,
              getRegionList,
              getCityList,
              timezoneId,
              updateBasicInfo,
              changeTimezoneAtApplication,
            }}
            stepToNext={this.handleNext}
            displayLoader={this.displayLoader}
            displaySuccess={this.displaySuccess}
            displayError={this.displayError}
            teachExpValue={experience}
            ref="basicInfo"
          />
        )
      }
      case 1:
        return (
          <TeachingExperience
            stepToNext={this.handleNext}
            displayLoader={this.displayLoader}
            displaySuccess={this.displaySuccess}
            displayError={this.displayError}
            parent={this}
            showNotification={showNotification}
            networkError={networkError}
            profile={profile}
            updateTeachingExp={updateTeachingExp}
            ref="teachingExperience"
          />
        )
      case 2:
        return (
          <ScheduleInterview
            getProfile={getProfile}
            showNotification={showNotification}
            networkError={networkError}
            timezoneId={timezoneId}
            displaySuccessWorlds={this.displaySuccessWorlds}
            updateInterview={updateInterview}
            getInterviewList={getInterviewList}
            interviewTimeList={interviewTimeList}
            ref="scheduleInterview"
          />
        )
      default:
        return (<h1>some thing wrong.</h1>);
    }
  }

  @autobind
  displayLoader() {
    this.refs.loader.displayLoader();
  }

  @autobind
  displaySuccess() {
    this.refs.loader.displaySuccess(this.handleNext, this);
  }

  @autobind
  displayError() {
    this.refs.loader.displayError();
  }

  @autobind
  handleClose() {
    this.setState({
      confirmDialogueOpen: false,
    });
  }

  @autobind
  handleOpen() {
    this.setState({
      confirmDialogueOpen: true,
    });
  }

  @autobind
  displaySuccessWorlds() {
    const stepIndex = this.state.stepIndex;
    this.setState({
      isFinished: true,
      stepIndex: stepIndex + 1,
    })
  }

  @autobind
  handleYes() {
    // submit interview data.
    this.refs.scheduleInterview.handleSubmit();
    this.handleClose();
  }

  @autobind
  clickNextBtn() {
    const { stepIndex } = this.state
    switch (stepIndex) {
      case 0:
        this.refs.basicInfo.handleSubmit();
        break;
      case 1:
        this.refs.teachingExperience.handleSubmit();
        break;
      default:
        return
    }
  }

  render() {
    const stepperStyle = {
      width: '100%',
      paddingLeft: 74,
      paddingRight: 74,
      marginBottom: 60,
    }

    const { stepIndex } = this.state

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
        onTouchTap={this.handleOpen}
      />
    )

    /* eslint max-len: 0 */
    const content = this.state.isFinished ? (
      <div className="successful-words">
        <p>Thanks for completing the Personal Details Form!</p>
        <p>We will review the form within 24hrs and provide you with an interview invitation via email.</p>
        <p>In preparation for your interview,</p>
        <p>Please complete a few self-study moduals: <Link style={{ color: red500 }} to="/teacher-online-test" className="go-to-test">Here</Link></p>
        <br />
        <p>Regards!</p>
        <br />
        <p>WeTeach Team</p>
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
    )

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
    ]

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
                <StepLabel className="step-label" style={stepLabelStyle}>Interview schedule</StepLabel>
              </Step>
            </Stepper>
            <div className="step-content">
              {
                !this.props.pendingCounter ? (
                  <section className="content">
                    {content}
                  </section>
                    ) : <SiteLoading />
              }
            </div>
          </div>
          <Dialog
            actions={actions}
            modal={false}
            open={this.state.confirmDialogueOpen}
            onRequestClose={this.handleClose}
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
