import React from 'react'
import { Field, FieldArray, reduxForm } from 'redux-form'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import { TextField } from 'redux-form-material-ui'
import Select from 'react-select'
import api from '../network/api'
import TableDialog from './TableDialog'
import WrappedSelect from '../universal/WrappedSelect'
import TimezoneLocalTime from '../universal/TimezoneLocalTime'
import AvatarUploadBtn from '../universal/AvatarUploadBtn'

class BasicInfo extends React.Component {
  constructor (props) {
    super(props);
    this.degreeList = [
      { label: 'Associate', value: 'Associate' },
      { label: "Bachelor's", value: "Bachelor's" },
      { label: "Master's", value: "Master's" },
      { label: 'Doctorate', value: 'Doctorate' },
    ];
    this.certList = [
      { label: "TEFL", value: "TEFL", },
      { label: "TESL", value: "TESL", },
      { label: "TESOL", value: "TESOL", },
      { label: "CELTA", value: "CELTA", },
      { label: "DELTA", value: "DELTA", },
      { label: 'Other', value: 'Other', },
    ];
    this.jobType = [
      { label: 'Online', value: 'Online' },
      { label: 'Offline', value: 'Offline' },
      { label: 'Both', value: 'Both' },
    ];
    this.experiences = [
      { value: 1, label: "Less than 5 years" },
      { value: 2, label: "Between 5 to 15 years" },
      { value: 3, label: "More than 15 years" },
    ]
  }

  componentWillMount() {
    const {
      getNationalityList,
      getCountryList,
      getTimezoneList,
      getRegionList,
      getCityList,
      initialValues,
      timezoneIndex,
    } = this.props
    const {
      residence_n,
      residence_p,
      residence_c,
      avatar,
    } = initialValues
    if (!!residence_n) getRegionList(residence_n)
    if (!!residence_p) getCityList(residence_p)
    getNationalityList()
    getCountryList()
    getTimezoneList()
  }

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  render() {
    const styles = {
      radioButton: {
        width: 183,
        display: "inline-block",
      },
    };

    const   {
      initialValues,
      nationalityList,
      countryList,
      regionList,
      cityList,
      timezoneList,
      timezoneIndex,
      handleSubmit,
      pristine,
      getRegionList,
      getCityList,
      showNotification,
      change,
    } = this.props

    const {
      workexp,
      eduexp,
      certs,
      timezone,
      timeAdjust,
      avatar,
      gender,
      isNative,
    } = initialValues

    var labelStyle = { color: '#666666', fontWeight: 'bold'};

    return (
      <div className="basic-info">
        <form onSubmit={handleSubmit(this.handleSubmit.bind(this))}>
          <div className="meta-data-picture clearfix">
            <div className="meta-data">
              <ul>
                <li className="data-item">
                  <div className="name">
                    <span className="required-icon">*</span>
                    <div className="icon-wrap"><i className="fa fa-user"></i></div>
                    <Field
                      floatingLabelStyle={labelStyle}
                      className="field"
                      name="firstname"
                      component={TextField}
                      style={{ width: 130, marginRight: 20 }}
                    />
                    <i className="vertical-line"></i>
                    <Field
                      floatingLabelStyle={labelStyle}
                      className="field"
                      name="lastname"
                      component={TextField}
                      style={{ width: 130, marginLeft: 20 }}
                    />
                  </div>
                </li>
                <li className="data-item">
                  <div className="gender">
                    <span className="required-icon">*</span>
                    <div className="field">
                      <RadioButtonGroup
                        name="gender"
                        defaultSelected={gender || 0}
                        onChange={({...rest}) => change('gender', rest.target.value)}
                      >
                        <RadioButton
                          labelStyle={{ color: '#999' }}
                          style={styles.radioButton}
                          value={1}
                          label="Male"
                        />
                        <RadioButton
                          labelStyle={{ color: '#999' }}
                          style={styles.radioButton}
                          value={0}
                          label="Female"
                        />
                      </RadioButtonGroup>
                    </div>
                  </div>
                </li>
                <li className="data-item">
                  <div className="nationality">
                    <span className="required-icon">*</span>
                    <div className="dropdown-icon-wrap"><i className="fa fa-globe"></i></div>
                    <Field
                      name="nationality"
                      component={WrappedSelect}
                      options={nationalityList}
                      placeholder="Your Nationality"
                    />
                  </div>
                </li>
                <li className="data-item">
                  <div className="native-speaker">
                    <span className="required-icon">*</span>
                    <div className="field">
                      <RadioButtonGroup
                        name="isNative"
                        defaultSelected={isNative || 0}
                        onChange={({...rest}) => change('isNative', rest.target.value)}
                      >
                        <RadioButton
                          labelStyle={{ color: '#999' }}
                          style={{ width: 'initial', display: 'inline-block' }}
                          value={1}
                          label="Native English speaker"
                        />
                        <RadioButton
                          labelStyle={{ color: '#999' }}
                          style={styles.radioButton}
                          value={0}
                          label="Non-native English speaker"
                        />
                      </RadioButtonGroup>
                    </div>
                  </div>
                </li>
                <li className="data-item">
                  <div className="phone-num">
                    <span className="required-icon">*</span>
                    <div className="icon-wrap"><i className="fa fa-phone"></i></div>
                    <div className="country-code-wrap">
                      <span className="plus-icon">+</span>
                      <Field
                        floatingLabelStyle={labelStyle}
                        name="tel_code"
                        style={{ width: 113, marginRight: 20 }}
                        component={TextField}
                        type="text"
                      />
                    </div>
                    <i className="vertical-line"></i>
                    <Field
                      name="tel_num"
                      component={TextField}
                      type="text"
                      floatingLabelStyle={labelStyle}
                      style={{ width: 130, marginLeft: 20 }}
                    />
                  </div>
                </li>
              </ul>
            </div>
            <AvatarUploadBtn
              change={change}
              avatar={avatar}
              showNotification={showNotification}
            />
          </div>
          <div className="residence-timezone clearfix">
            <div className="residence">
              <span className="required-icon">*</span>
              <div className="dropdown-icon-wrap"><i className="fa fa-map-marker"></i></div>
              <Field
                name="residence_n"
                placeholder="Country"
                component={WrappedSelect}
                options={countryList}
                onChange={getRegionList.bind(this)}
              />
              <i className="vertical-line"></i>
              <Field
                name="residence_p"
                placeholder="Region"
                component={WrappedSelect}
                options={regionList}
                onChange={getCityList.bind(this)}
              />
              <i className="vertical-line"></i>
              <Field
                name="residence_c"
                placeholder="City"
                component={WrappedSelect}
                options={cityList}
              />
            </div>
          </div>
          <TimezoneLocalTime
            change={change}
            timezone={timezone}
            timezoneList={timezoneList}
            timezoneIndex={timezoneIndex}
            timeAdjust={timeAdjust}
          />
          <div className="education-background table-dialog-wrap">
            <FieldArray
              name="eduexp"
              component={TableDialog}
              title="Education background"
              dialogTitle="education background"
              valueListItems={eduexp}
              showNotification={showNotification}
              iconClassName="fa-graduation-cap"
              dropdownItem={{ index: 0, options: this.degreeList }}
              schemas={['degree', 'major', 'institution', 'timefrom', 'timeto']}
              tableMenus={['Degree', 'Field of study', 'Institution', 'From', 'To']}
            />
          </div>
          <div className="teaching-certificates table-dialog-wrap">
            <FieldArray
              name="certs"
              component={TableDialog}
              title="Teaching certificates"
              dialogTitle="teaching certificates"
              valueListItems={certs}
              showNotification={showNotification}
              iconClassName="fa-certificate"
              dropdownItem={{ index: 0, options: this.certList }}
              notRequired={{ index: 3 }}
              schemas={['cert', 'institution', 'dateobt', 'remark']}
              tableMenus={['Certificates', 'Institution', 'Date obtained', 'Remark']}
            />
          </div>
          <div className="teaching-experience-list table-dialog-wrap">
            <div className="select-years">
              <Field
                id="teach-experience"
                name="experience"
                component={WrappedSelect}
                style={{ verticalAlign: 'middle' }}
                placeholder="Select..."
                options={this.experiences}
              />
            </div>
            <FieldArray
              name='workexp'
              component={TableDialog}
              title="Teaching experience"
              dialogTitle="teaching experience"
              valueListItems={workexp}
              showNotification={showNotification}
              iconClassName="fa-briefcase"
              dropdownItem={{ index: 2, options: this.jobType }}
              schemas={['position', 'company', 'onoff', 'timefrom', 'timeto']}
              tableMenus={['Position', 'Employer', 'Online/Offline', 'From', 'To']}
            />
          </div>
        </form>
      </div>
    )
  }

  handleSubmit(values) {
    var self = this;
    var notification = "";

    const {
      firstname, lastname, gender,
      nationality, isNative, tel_code,
      tel_num, residence_n, residence_p,
      residence_c, avatar, timezone,
      timeAdjust, eduexp, experience,
      certs, workexp,
    } = values

    let numericP = /^[0-9]+$/;

    if (!firstname) {
      notification = "Please enter your first name.";
    } else if (!lastname) {
      notification = "Please enter your last name.";
    } else if (!nationality) {
      notification = "Please select your nationality.";
      // } else if (!avatar.length) {                   //  å¤´åƒéžå¿…å¡«ã€‚
      //   notification = "Please upload your profile picture.";
    } else if (!residence_n) {
      notification = "Please select your country of residence.";
    } else if (!timezone) {
      notification = "Please select your location timezone.";
    } else if (!tel_num) {
      notification = "Please enter your phone number.";
    } else if (!eduexp.length) {
      notification = "Please complete your education background.";
    } else if (!certs.length) {
      notification = 'Please complete your certificates.'
    } else if (!experience) {
      notification = "Please select the number of years that you have taught.";
    } else if (!workexp.length) {
      notification = 'Please complete working experience.'
    } else if (!numericP.test(tel_num)) {
      notification = "Phone number should be numbers.";
    } else if (!!tel_code.length && !numericP.test(tel_code)) {
      notification = "Country code should be numbers.";
    } else if (!avatar) {
      notification = 'Please upload your picture.';
    }

    if (notification.length > 0) {
      self.props.showNotification(notification);
      return;
    }

    const {
      displayLoader,
      token,
      displaySuccess,
      displayError,
      getProfile,
    } = this.props

    displayLoader();

    console.log(values);

    api.TApplyStep1(values,
      {"Authorization": token},
      "",
      (resp) => {
        if (resp.success) {
          api.TGetProfile('',
          { 'Authorization': token },
          '',
          res => {
            if (res.success) {
              getProfile(res.data)
              displaySuccess();
            }
          },
          err => alert('Network is busy, please contact support: teacher@weteach.info')
          )
        } else {
          displayError();
        }
      },
      (err) => {
        displayError();
      }
    );
  }
}

BasicInfo = reduxForm({
  form: "basicInfo",
  enableReinitialize: true        // allow comp to re initialize.
})(BasicInfo)

export default BasicInfo
