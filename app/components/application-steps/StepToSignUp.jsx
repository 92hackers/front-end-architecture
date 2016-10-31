// step page to complete sign up process.
import React from 'react';
import { browserHistory, Link } from 'react-router';

import CircularProgress from 'material-ui/CircularProgress';
import { Step, Stepper, StepLabel } from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import SelectField from 'material-ui/SelectField';
import Dropdown from 'react-dropdown';
import MenuItem from 'material-ui/MenuItem';
import Dialog from 'material-ui/Dialog';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import { red500 } from 'material-ui/styles/colors';

import AvatarUpload from '../universal/AvatarUpload';
import SiteLoading from '../containers/SiteLoading';
import TAvatar from './TAvatar';
import WaitForSubmit from '../universal/WaitForSubmit';

import BasicInfo from './application-steps/BasicInfo'
import TeachingExperience from './TeachingExp'
import scheduleInterview from './application-steps/interviewTime'

class StepToSignUpComp extends React.Component {

  constructor (props) {
    super (props);
    this.state = {
      stepIndex: 0,
      timezoneId: "",
      confirmDialogueOpen: false,
      isFinished: false,
    };
  }

  handleNext () {
    var self = this;
    const {stepIndex} = this.state;

    if (stepIndex < 2) {
      this.setState({
        stepIndex: stepIndex + 1
      });
    }

  }

  handlePrev () {
    var self = this;
    const {stepIndex} = this.state;

    if (stepIndex > 0) {
      this.setState({
        stepIndex: stepIndex - 1
      });
    }

  }

  setTimezoneId (id) {
    this.setState({
      timezoneId: id
    });
  }

  getContent (stepIndex) {

    const profile = this.props.profile;

    switch (stepIndex) {
      case 0:
        return <BasicInfo stepToNext={this.handleNext.bind(this)} displayLoader={this.displayLoader.bind(this)} displaySuccess={this.displaySuccess.bind(this)} displayError={this.displayError.bind(this)} showNotification={this.props.showNotification} profile={profile} setTimezoneId={this.setTimezoneId.bind(this)} ref="basicInfo" token={this.props.token}></BasicInfo>;
      case 1:
        var experience = "";

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
            experience = "";
        }

        return <TeachingExperience stepToNext={this.handleNext.bind(this)} displayLoader={this.displayLoader.bind(this)} displaySuccess={this.displaySuccess.bind(this)} displayError={this.displayError.bind(this)} parent={this} showNotification={this.props.showNotification} profile={profile} teachExpValue={experience} ref="teachingExperience" token={this.props.token}></TeachingExperience>;
      case 2:
        return <ScheduleInterview getProfile={this.props.getProfile} showNotification={this.props.showNotification} timezoneId={this.state.timezoneId} displaySuccessWorlds={this.displaySuccessWorlds.bind(this)} ref="scheduleInterview" token={this.props.token}></ScheduleInterview>;
      default:
        return (<h1>some thing wrong.</h1>);
    }
  }

  handleFinish () {
    var self = this;

    this.handleOpen();

  }

  displayLoader () {
    this.refs.loader.displayLoader();
  }

  displaySuccess () {
    this.refs.loader.displaySuccess(this.handleNext, this);
  }

  displayError () {
    this.refs.loader.displayError();
  }

  handleClose () {
    this.setState({
      confirmDialogueOpen: false
    });
  }

  handleOpen () {
    this.setState({
      confirmDialogueOpen: true
    });
  }

  handleNo () {
    this.handleClose();
  }

  displaySuccessWorlds () {
    var stepIndex = this.state.stepIndex;
    this.setState({
      isFinished: true,
      stepIndex: stepIndex + 1
    });
  }

  handleYes () {
    // submit interview data.
    const {stepIndex} = this.state;
    this.refs.scheduleInterview.handleSubmit();
    this.handleClose();
  }

  clickNextBtn () {
    switch (this.state.stepIndex) {
      case 0:
        this.refs.basicInfo.handleSubmit();
        break;
      case 1:
        this.refs.teachingExperience.handleSubmit();
        break;
    }
  }

  render () {

    const stepperStyle = {
      width: "100%",
      paddingLeft: 74,
      paddingRight: 74,
      marginBottom: 60
    };

    const stepIndex = this.state.stepIndex;

    const rightButton = stepIndex !== 2 ? <RaisedButton className="submit-btn" labelStyle={{fontSize: 24}} style={{width: 176, height: 50}} primary={true} label="Next" onTouchTap={this.clickNextBtn.bind(this)} disabled={stepIndex === 2}></RaisedButton> : <RaisedButton labelStyle={{fontSize: 24}} style={{width: 176, height: 50}} primary={true} label="Finish" onTouchTap={this.handleFinish.bind(this)}></RaisedButton>;

    var content = this.state.isFinished ? (
      <div className="successful-words">
        <p>Thanks for completing the Personal Details Form!</p>
        <p>We will review the form within 24hrs and provide you with an interview invitation via email.</p>
        <p>In preparation for your interview,</p>
        <p>Please complete a few self-study moduals: <Link style={{color: red500}} to="/teacher-online-test" className="go-to-test">Here</Link></p>
        <br/>
        <p>Regards!</p>
        <br/>
        <p>WeTeach Team</p>
      </div>
    ) : (
      <div>
        {this.getContent(stepIndex)}
        <div className="text-center two-buttons">
          <div className="btn-group">
            <FlatButton disabled={!stepIndex} label="Back" style={{marginRight: 12}} onTouchTap={this.handlePrev.bind(this)}></FlatButton>
            {rightButton}
            <div style={{display: "inline-block"}}>
              <WaitForSubmit ref="loader" successMessage="Saved" failMessage="Error" style={{verticalAlign: "middle"}}></WaitForSubmit>
            </div>
          </div>
        </div>
      </div>
    );

    const actions = [
      <RaisedButton
        className="dialog-button"
        label="No"
        default={true}
        onTouchTap={this.handleNo.bind(this)}
      />,
      <RaisedButton
        className="dialog-button"
        label="Yes"
        primary={true}
        onTouchTap={this.handleYes.bind(this)}
      />
    ];

    const stepLabelStyle = {
      fontSize: 20,
      color: '#2196f3'
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
                !this.props.pendingCounter ? (<section className="content">{content}</section>) : <SiteLoading></SiteLoading>
              }
            </div>
          </div>
          <Dialog
            actions={actions}
            modal={false}
            open={this.state.confirmDialogueOpen}
            onRequestClose={this.handleClose.bind(this)}
          >
            <h2 style={{marginBottom: 30}} className="confirm-words text-center">Please note:</h2>
            <h2 style={{marginBottom: 30}} className="confirm-words text-center">Once you submit your application you will not be able to make any changes.</h2>
            <h2 className="confirm-words text-center">Would you like to confirm your application?</h2>
          </Dialog>
        </div>
      </section>
    )
  }

  componentDidMount () {
    //  get profile data.
  }

}

export default StepToSignUpComp;
