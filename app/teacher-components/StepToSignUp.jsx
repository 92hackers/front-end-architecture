// step page to complete sign up process.

import React from 'react';
import {browserHistory} from 'react-router';
import {connect} from 'react-redux';
import {Typeahead} from 'react-typeahead';

import { Step, Stepper, StepLabel } from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Dialog from 'material-ui/Dialog';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

import api from '../network/api';
import Notification from '../universal/Notification';
import AvatarUpload from '../universal/AvatarUpload';
import TAvatar from './TAvatar';

class BasicInfo extends React.Component {

  constructor (props) {
    super (props);
    this.state = {
      nationalityList: [
        'china',
        'russia',
        'america',
        'korea',
        'japan',
        'north korea',
        'england'
      ],
      nationalityValue: null,
      countryList: [
        'china',
        'russia',
        'america',
        'korea',
        'japan',
        'north korea',
        'england'
      ],
      countryValue: null,
      regionList: [
        'shagnhai',
        'guangdong',
        'guizhou',
        'jilin',
        'xizang',
        'xinjiang'
      ],
      regionValue: null,
      cityList: [
        'shanghai',
        'guiyang',
        'heilongjiang',
        'shenzheng'
      ],
      cityValue: null,
      timezoneList: [
        'gmt+8:00 shanghai',
        'gmt+0:00 gelinnizhi',
        'gmt+8:00 shanghai',
        'gmt+0:00 gelinnizhi',
        'gmt+8:00 shanghai',
        'gmt+0:00 gelinnizhi',
        'gmt+8:00 shanghai',
        'gmt+0:00 gelinnizhi',
      ],
      timezoneValue: null,

      avatarUrl: "",
      profilePictureSrc: "",

      eduList: [],
      eduListItems: [],
      eduDialogOpen: false
    };
  }

  changeNationality (e, value) {
    this.setState({
      nationalityValue: value
    });
  }

  changeCity (e, value) {
    this.setState({
      cityValue: value
    });
  }

  changeCountry (e, value) {
    this.setState({
      countryValue: value
    });
  }

  changeRegion (e, value) {
    this.setState({
      regionValue: value
    });
  }

  changeTimezone (e, value) {
    this.setState({
      timezoneValue: value
    });
  }

  profilePictureSelect (e) {
    e.preventDefault();
  }

  setAvatarUrl () {

  }

  showFullDetail () {
    // TODO: show full detail.
  }

  addEduExp (e) {
    e.preventDefault();
    this.setState({
      eduDialogOpen: true
    });
  }

  addEducation () {

  }

  handleEduDialogClose () {
    this.setState({
      eduDialogOpen: false
    });
  }

  render () {

    const styles = {
      radioButtonGroup: {
        marginBottom: -20
      },
      radioButton: {
        width: "initial",
        display: "inline-block",
        "marginRight": 50
      }
    };

    const uploadPictureStyle = {
      cursor: 'pointer',
      position: 'absolute',
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
      width: '100%',
      opacity: 0,
      zIndex: 1000,
      fontSize: 20,
      height: "100%"
    };

    const eduTableStyle = {
      display: this.state.eduList.length ? "table" : "none"
    };

    const addEduExpActions = [
      <RaisedButton
        className="dialog-button"
        label="Cancel"
        default={true}
        onTouchTap={this.handleEduDialogClose.bind(this)}
      />,
      <RaisedButton
        className="dialog-button"
        id="submitEdu"
        label="Add"
        primary={true}
        onTouchTap={this.addEducation.bind(this)}
      />
    ];

    return (
      <div className="basic-info">
        <div className="meta-data-picture clearfix">
          <div className="meta-data">
            <ul>
              <li className="data-item">
                <div className="name">
                  <div className="icon-wrap"><i className="fa fa-user"></i></div>
                  <TextField name="FirstName" floatingLabelText="FirstName" style={{width: 130, marginRight: 20}}></TextField>
                  <i className="vertical-line"></i>
                  <TextField name="LastName" floatingLabelText="LastName" style={{width: 130, marginLeft: 20}}></TextField>
                </div>
              </li>
              <li className="data-item">
                <div className="gender">
                  <p id="gender-caption" className="primary-color">Gender</p>
                  <RadioButtonGroup name="gender" style={styles.RadioButtonGroup}>
                    <RadioButton labelStyle={{color: "#999"}} value="male" label="Male" style={styles.radioButton}/>
                    <RadioButton labelStyle={{color: "#999"}} value="female" label="Female" style={styles.radioButton}/>
                  </RadioButtonGroup>
                </div>
              </li>
              <li className="data-item">
                <div className="nationality">
                  <div className="icon-wrap"><i className="fa fa-globe"></i></div>
                  <SelectField style={{width: 300}} id="nationality" maxHeight={300} value={this.state.nationalityValue} onChange={this.changeNationality.bind(this)} floatingLabelText="Your Nationality">
                    {
                      this.state.nationalityList.map((nationality, index) => {
                        return <MenuItem key={index} value={index} primaryText={nationality} style={{cursor: "pointer"}}></MenuItem>;
                      })
                    }
                  </SelectField>
                </div>
              </li>
              <li className="data-item">
                <div className="phone-num">
                  <div className="icon-wrap"><i className="fa fa-phone"></i></div>
                  <TextField name="country-code" floatingLabelText="Country Code" style={{width: 130, marginRight: 20}}></TextField>
                  <i className="vertical-line"></i>
                  <TextField name="phone-number" floatingLabelText="Phone Number" style={{width: 130, marginLeft: 20}}></TextField>
                </div>
              </li>
            </ul>
          </div>
          <div className="picture">
            <div className="avatar">
              <TAvatar avatarUrl={this.state.avatarUrl}></TAvatar>
            </div>
            <br/>
            <RaisedButton icon={<i style={{fontSize: 20, color: "#fff"}} className="fa fa-camera"></i>} primary={true} id="upload-profile-picture" label="Upload Profile Picture" style={{width: "50%", margin: '0 auto', display: "block"}}>
              <input type="file" style={uploadPictureStyle} onChange={this.profilePictureSelect.bind(this)}/>
            </RaisedButton>
            <AvatarUpload ref="avatarUpload" src={this.state.profilePictureSrc} setAvatarUrl={this.setAvatarUrl.bind(this)}></AvatarUpload>
          </div>
        </div>
        <div className="residence-timezone clearfix">
          <div className="residence">
            <div className="icon-wrap"><i className="fa fa-map-marker"></i></div>
            <SelectField floatingLabelText="Country" maxHeight={300} id="residence-country" value={this.state.countryValue} onChange={this.changeCountry.bind(this)} style={{width: 130, marginRight: 20, verticalAlign: "middle", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap"}}>
              {
                this.state.countryList.map((country, index) => {
                  return <MenuItem key={index} value={index} primaryText={country} style={{cursor: "pointer"}}></MenuItem>;
                })
              }
            </SelectField>
            <i className="vertical-line" style={{marginTop: 30}}></i>
            <SelectField floatingLabelText="State/Region" maxHeight={300} id="residence-region" value={this.state.regionValue} onChange={this.changeRegion.bind(this)} style={{width: 130, marginLeft: 20, marginRight: 20, verticalAlign: "middle", textOverflow: "ellipsis", whiteSpace: "nowrap"}}>
              {
                this.state.regionList.map((region, index) => {
                  return <MenuItem key={index} value={index} primaryText={region} style={{cursor: "pointer"}}></MenuItem>;
                })
              }
            </SelectField>
            <i className="vertical-line" style={{marginTop: 30}}></i>
            <SelectField floatingLabelText="City" maxHeight={300} id="residence-city" value={this.state.cityValue} onChange={this.changeCity.bind(this)} style={{width: 130, marginLeft: 20, verticalAlign: "middle", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap"}}>
              {
                this.state.cityList.map((city, index) => {
                  return <MenuItem key={index} value={index} primaryText={city} style={{cursor: "pointer"}}></MenuItem>;
                })
              }
            </SelectField>
          </div>
          <div className="timezone">
            <div className="icon-wrap"><i className="fa fa-clock-o"></i></div>
            <SelectField floatingLabelText="TimeZone" maxHeight={300} id="timezone" value={this.state.timezoneValue} onChange={this.changeTimezone.bind(this)} style={{width: 300}}>
              {
                this.state.timezoneList.map((timezone, index) => {
                  return <MenuItem key={index} value={index} primaryText={timezone} style={{cursor: "pointer"}}></MenuItem>;
                })
              }
            </SelectField>
          </div>
        </div>
        <div className="education-background">
          <div className="title">
            <h1 className="primary-color">Education Background</h1>
            <RaisedButton label="Add" style={{verticalAlign: "middle"}} icon={<i style={{color: "#ffffff", fontSize: 18}} className="fa fa-graduation-cap"></i>} primary={true} onClick={this.addEduExp.bind(this)}></RaisedButton>
            <Dialog title="Add Your Education Experience" actions={addEduExpActions} modal={false} open={this.state.eduDialogOpen} onRequestClose={this.handleEduDialogClose.bind(this)}>
              <div className="t-edu-form-wrap">
                <div className="clearfix">
                  <TextField className="left" style={{width: "40%"}} id="t-edu-start-year" floatingLabelText="Start Year"></TextField>
                  <TextField className="right" style={{width: "40%"}} id="t-edu-end-year" floatingLabelText="End Year"></TextField>
                </div>
                <TextField id="t-edu-school" type="text" floatingLabelText="School"></TextField>
                <br/>
                <TextField id="t-edu-major" type="text" floatingLabelText="Major"></TextField>
                <br/>
                <TextField id="t-edu-degree" type="text" floatingLabelText="Degree"></TextField>
              </div>
            </Dialog>
          </div>
          <Table style={eduTableStyle} onRowSelection={this.showFullDetail.bind(this)}>
            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
              <TableRow>
                <TableHeaderColumn>Start Time</TableHeaderColumn>
                <TableHeaderColumn>End Time</TableHeaderColumn>
                <TableHeaderColumn>School</TableHeaderColumn>
                <TableHeaderColumn>Degree</TableHeaderColumn>
                <TableHeaderColumn>Major</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false} showRowHover={true}>
              {
                this.state.eduListItems.map((item, index) => {
                  return (
                    <TableRow key={index} data-index={index} hoverable={true} style={{cursor: "pointer"}}>
                      <TableRowColumn>{item.degree}</TableRowColumn>
                      <TableRowColumn>{item.institution}</TableRowColumn>
                    </TableRow>
                  )
                })
              }
            </TableBody>
          </Table>
        </div>
      </div>
    )
  }
}

class TeachingExperience extends React.Component {

  constructor (props) {
    super (props);
    this.state = {
      teachExpValue: null
    };
  }

  handleChange (e, index) {
    this.setState({
      teachExpValue: index
    });
  }

  render () {
    return (
      <div className="teaching-experience">
        <div className="select-years">
          <span className="title">Teaching Experience</span>
          <SelectField id="teach-experience" value={this.state.teachExpValue} onChange={this.handleChange.bind(this)} floatingLabelText="Teaching Experience">
            <MenuItem style={{cursor: "pointer"}} value={1} primaryText="Less than 5 years" />
            <MenuItem style={{cursor: "pointer"}} value={2} primaryText="Between 5 to 15 years" />
            <MenuItem style={{cursor: "pointer"}} value={3} primaryText="More than 15 years" />
          </SelectField>
        </div>
        <ul>
          <li className="words-item">
            <div className="caption">
              <span className="index">1</span>
              <p className="title">What important qualities should an ESL teacher possess?</p>
            </div>
            <div className="input-box">
              <TextField id="self-intro" multiLine={true} rows={5} rowsMax={10} type="textarea"></TextField>
            </div>
          </li>
          <li className="words-item">
            <div className="caption">
              <span className="index">2</span>
              <p className="title">Name 5 factors to consider when lesson planning.</p>
            </div>
            <div className="input-box">
              <TextField id="teach-style" multiLine={true} rows={5} rowsMax={10} type="textarea"></TextField>
            </div>
          </li>
          <li className="words-item">
            <div className="caption">
              <span className="index">3</span>
              <p className="title">How do you plan to keep young learners motivated and engaged in an online classroom setting?</p>
            </div>
            <div className="input-box">
              <TextField id="why-a-teacher" multiLine={true} rows={5} rowsMax={10} type="textarea"></TextField>
            </div>
          </li>
          <li className="words-item">
            <div className="caption">
              <span className="index">4</span>
              <p className="title">Is there any other useful information you'd like to provide about yourself? (optional)</p>
            </div>
            <div className="input-box">
              <TextField id="addition" multiLine={true} rows={5} rowsMax={10} type="textarea"></TextField>
            </div>
          </li>
        </ul>
      </div>
    )
  }
}

class ScheduleInterview extends React.Component {

  constructor (props) {
    super (props);
    this.state = {
      dateValue: 0,
      timeValue: 0
    }
  }

  bookTheViewDateChange () {

  }

  bookTheViewTimeChange () {

  }

  render () {
    return (
      <div className="schedule-interview">
        <h1>Schedule Video Interview</h1>
        <div className="input-box">
          <SelectField value={this.state.dateValue} onChange={this.bookTheViewDateChange.bind(this)}>
            {
              this.state.availableDate.map((item, index) => {
                return <MenuItem style={menuItemStyle} value={index} key={index} primaryText={item}></MenuItem>;
              })
            }
          </SelectField>
          <br/>
          <SelectField id="interview-time" value={this.state.timeValue} onChange={this.bookTheViewTimeChange.bind(this)}>
            {
              this.state.availableTime.map((item, index) => {
                return <MenuItem style={menuItemStyle} value={index} key={index} primaryText={item.period}></MenuItem>;
              })
            }
          </SelectField>
        </div>
      </div>
    )
  }
}

class StepToSignUp extends React.Component {

  constructor (props) {
    super (props);
    this.state = {
      stepIndex: 0
    };
  }

  handleNext () {
    var self = this;
    const {stepIndex} = this.state;

    this.setState({
      stepIndex: stepIndex + 1
    });

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

  getContent (stepIndex) {
    switch (stepIndex) {
      case 0:
      return <BasicInfo></BasicInfo>;
      case 1:
      return <TeachingExperience></TeachingExperience>;
      case 2:
      return <ScheduleInterview></ScheduleInterview>;
      default:
      return (<h1>some thing wrong.</h1>);
    }
  }

  render () {

    const stepperStyle = {
      width: "100%",
      paddingLeft: 74,
      paddingRight: 74,
      marginBottom: 60
    };

    return (
      <section className="step-to-sign-up">
        <div className="container">
          <div className="stepper-wrap">
            <Stepper style={stepperStyle} activeStep={this.state.stepIndex}>
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
            <div className="step-content">
              <section className="content">
                {this.getContent(this.state.stepIndex)}
                <div className="text-center">
                  <div className="btn-group">
                    <FlatButton disabled={!this.state.stepIndex} label="back" style={{marginRight: 12}} onTouchTap={this.handlePrev.bind(this)}></FlatButton>
                    <RaisedButton labelStyle={{fontSize: 24}} style={{width: 300, height: 50}} primary={true} label="Next" onTouchTap={this.handleNext.bind(this)} disabled={this.state.stepIndex === 2}></RaisedButton>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default StepToSignUp;
