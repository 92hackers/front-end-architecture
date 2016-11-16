import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { browserHistory } from 'react-router'
import { autobind } from 'core-decorators'

import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton'
import RadioButton from 'material-ui/RadioButton'
import Dialog from 'material-ui/Dialog';
import {
  TextField,
  RadioButtonGroup,
} from 'redux-form-material-ui'

import WrappedSelect from '../universal/WrappedSelect';
import Avatar from '../Avatar'
import AvatarUpload from '../universal/AvatarUpload'

class BasicInfo extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      profilePictureSrc: '',
      avatarUrl: '',

      eduExpSelectedIndex: 0,
      eduExpSelected: '',
      eduExpSelectedDialogOpen: false,
    }
  }

  componentWillMount() {
    /* eslint max-len: 0 */
    const { timezoneList } = this.props // todo: 最好是放在 redux form 的那个 initialValues里面。优先 profile里面的数据。
    const localDate = new Date();
    let defaultTimezone = '';
    let defaultTimezoneId = '';
    const localTimezone = localDate.toString().match(/GMT[+-]\d{2}/)[0];
    const regExpTimezone = localTimezone.replace('+', '\\+');

    for (let i = 0; i < timezoneList.length; i++) {
      if (timezoneList[i].label.search(new RegExp(regExpTimezone)) !== -1) {
        defaultTimezone = timezoneList[i].label;
        defaultTimezoneId = timezoneList[i].value;
        break;
      }
    }
  }

  @autobind
  profilePictureSelect(e) {
    e.preventDefault();

    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }

    const reader = new FileReader();
    reader.onload = () => {
      this.setState({
        profilePictureSrc: reader.result,
      }, () => {
        this.refs.avatarUpload.getWrappedInstance().handleOpen();        //  open the dialog.
      });
    };

    reader.readAsDataURL(files[0]);
  }

  @autobind
  setAvatarUrl(url) {
    this.setState({
      avatarUrl: url,
    });
  }

  @autobind
  showFullDetail(index) {
    if (!!index && !!this.state.eduListItems) {
      const expData = this.state.eduListItems[index[0]];

      this.setState({
        eduExpSelectedIndex: index[0],
        eduExpSelected: expData,
      }, () => {
        this.handleUpdateDiaOpen();
      });
    }
  }

  handleUpdateDiaOpen() {
    this.setState({
      eduExpSelectedDialogOpen: true,
    });
  }

  addEduExp(e) {
    e.preventDefault();

    let notification = '';
    const temp = this.state.eduListItems;
    let tempEduList = this.state.eduList;

    const getValue = ele => document.getElementById(ele).value

    const startYear = getValue('t-edu-start-year');
    const endYear = getValue('t-edu-end-year');
    const school = getValue('t-edu-school');
    const major = getValue('t-edu-major');
    const degree = getValue('t-edu-degree');


    if (!!startYear && !!endYear && !!school && !!major && !!degree) {
      const regExp = /^[0-9]+$/;

      if (startYear.length !== 4
        || endYear.length !== 4
        || !regExp.test(startYear)
        || !regExp.test(endYear)
      ) {
        notification = 'Year should be exactly 4 numbers.';
      }

      if (notification.length > 0) {
        this.props.showNotification(notification);
        return
      }

      const data = {
        timefrom: startYear,
        timeto: endYear,
        institution: school,
        major,
        degree,
      };

      temp.push(data);
      tempEduList += 1;
      this.setState({
        eduListItems: temp,
        eduDialogOpen: false,
        eduList: tempEduList,
      });
    } else {
      this.props.showNotification('Please complete all required details.');
    }
  }

  @autobind
  handleEduDialogOpen() {
    this.setState({
      eduDialogOpen: true,
    });
  }

  handleEduDialogClose() {
    this.setState({
      eduDialogOpen: false,
    });
  }

  handleEduUpdate(e) {
    e.preventDefault();
    this.handleUpdateDiaClose();

    const tmp = this.state.eduListItems;
    const updateIndex = this.state.eduExpSelectedIndex;
    const self = this;
    let notification = '';

    const getValue = ele => document.getElementById(ele).value;

    const startYear = getValue('t-edu-start-year-m');
    const endYear = getValue('t-edu-end-year-m');
    const school = getValue('t-edu-school-m');
    const major = getValue('t-edu-major-m');
    const degree = getValue('t-edu-degree-m');

    if (!!startYear && !!endYear && !!school && !!major && !!degree) {
      const regExp = /^[0-9]+$/;

      if (startYear.length !== 4
        || endYear.length !== 4
        || !regExp.test(startYear)
        || !regExp.test(endYear)
      ) {
        notification = 'Year should be exactly 4 numbers.';
      }

      if (notification.length > 0) {
        this.props.showNotification(notification);
        return
      }

      const data = {
        timefrom: startYear,
        timeto: endYear,
        institution: school,
        major,
        degree,
      };

      tmp[updateIndex] = data;

      this.setState({
        eduListItems: tmp,
      });
    } else {
      this.props.showNotification('Please Complete All Fields.');
    }
  }

  handleEduExpDel(e) {
    e.preventDefault();

    let tempEduList = this.state.eduList;
    tempEduList -= 1;

    this.handleUpdateDiaClose();
    const tmp = this.state.eduListItems;
    tmp.splice(this.state.eduExpSelectedIndex, 1);
    this.setState({
      eduListItems: tmp,
      eduList: tempEduList,
    });
  }

  handleUpdateDiaClose(e) {
    this.setState({
      eduExpSelectedDialogOpen: false,
    });
  }

  @autobind
  changeTimezone(...args) {
    const { changeTimezoneAtApplication } = this.props
    changeTimezoneAtApplication(args[0])      //  设置 schedule interview 要用的时区。
  }

  render() {
    const styles = {
      radioButtonGroup: {
        marginBottom: -20,
      },
      radioButton: {
        width: 'initial',
        display: 'inline-block',
        marginRight: 50,
      },
    };

    const eduTableStyle = {
      display: this.state.eduList ? 'table' : 'none',
    };

    const updateActions = [
      <RaisedButton
        className="dialog-button"
        label="Delete"
        default
        onTouchTap={this.handleEduExpDel}
        style={{ float: 'left' }}
      />,
      <RaisedButton
        className="dialog-button"
        label="Cancel"
        default
        onTouchTap={this.handleUpdateDiaClose}
      />,
      <RaisedButton
        className="dialog-button"
        id="submitEdu"
        label="Update"
        primary
        onTouchTap={this.handleEduUpdate}
      />,
    ];

    const addEduExpActions = [
      <RaisedButton
        className="dialog-button"
        label="Cancel"
        default
        onTouchTap={this.handleEduDialogClose}
      />,
      <RaisedButton
        className="dialog-button"
        id="submitEdu"
        label="Add"
        primary
        onTouchTap={this.addEduExp}
      />,
    ];

    const {
      profile,
      /* eslint no-unused-vars: 0 */
      initialValues,
      handleSubmit,
      nationalityList,
      countryList,
      regionList,
      cityList,
      timezoneList,
      getRegionList,
      getCityList,
    } = this.props

    const labelStyle = { color: '#666666', fontWeight: 'bold' }

    return (
      <div className="basic-info">
        <form onSubmit={handleSubmit(this.handleSubmit)}>
          <div className="meta-data-picture clearfix">
            <div className="meta-data">
              <ul>
                <li className="data-item">
                  <div className="name">
                    <div className="icon-wrap"><i className="fa fa-user" /></div>
                    <TextField
                      floatingLabelStyle={labelStyle}
                      name="firstname"
                      floatingLabelText="FirstName"
                      style={{ width: 130, marginRight: 20 }}
                    />
                    <i className="vertical-line" />
                    <TextField
                      floatingLabelStyle={labelStyle}
                      name="lastname"
                      floatingLabelText="LastName"
                      style={{ width: 130, marginLeft: 20 }}
                    />
                  </div>
                </li>
                <li className="data-item">
                  <div className="gender">
                    <p id="gender-caption" className="primary-color">Gender</p>
                    <Field name="gender" component={RadioButtonGroup}>
                      <RadioButton
                        labelStyle={{ color: '#999' }}
                        value="1"
                        label="Male"
                        style={styles.radioButton}
                      />
                      <RadioButton
                        labelStyle={{ color: '#999' }}
                        value="0"
                        label="Female"
                        style={styles.radioButton}
                      />
                    </Field>
                  </div>
                </li>
                <li className="data-item">
                  <div className="nationality">
                    <div className="dropdown-icon-wrap"><i className="fa fa-globe" /></div>
                    <Field
                      name="nationality"
                      component={WrappedSelect}
                      options={nationalityList}
                      placeholder="Your Nationality"
                    />
                  </div>
                </li>
                <li className="data-item">
                  <div className="phone-num">
                    <div className="icon-wrap"><i className="fa fa-phone" /></div>
                    <div className="country-code-wrap">
                      <span className="plus-icon">+</span>
                      <TextField
                        floatingLabelStyle={labelStyle}
                        name="tel_code"
                        floatingLabelText="Country Code"
                        style={{ width: 130, marginRight: 20 }}
                      />
                    </div>
                    <i className="vertical-line" />
                    <TextField
                      floatingLabelStyle={labelStyle}
                      name="tel_num"
                      floatingLabelText="Phone Number"
                      style={{ width: 130, marginLeft: 20 }}
                    />
                  </div>
                </li>
              </ul>
            </div>
            <div className="picture text-center">
              <div className="avatar">
                <Avatar avatarUrl={this.state.avatarUrl} />
              </div>
              <br />
              <a href="#" className="btn button-change-avatar">
                <i className="fa fa-camera" style={{ fontSize: 20, color: '#fff' }} />
                <label htmlFor="upload-profile-picture">
                  Upload profile picture
                  <input type="file" id="upload-profile-picture" onChange={this.profilePictureSelect} />
                </label>
              </a>
              <AvatarUpload ref="avatarUpload" src={this.state.profilePictureSrc} setAvatarUrl={this.setAvatarUrl} />
            </div>
          </div>
          <div className="residence-timezone clearfix">
            <div className="residence">
              <div className="dropdown-icon-wrap"><i className="fa fa-map-marker" /></div>
              <Field
                name="residence_n"
                component={WrappedSelect}
                options={countryList}
                onChange={getRegionList}
                placeholder="Country"
              />
              <i className="vertical-line" />
              <Field
                name="residence_p"
                component={WrappedSelect}
                options={regionList}
                onChange={getCityList}
                placeholder="Region/State"
              />
              <i className="vertical-line" />
              <Field
                name="residence_c"
                component={WrappedSelect}
                options={cityList}
                placeholder="City"
              />
            </div>
            <div className="timezone">
              <div className="dropdown-icon-wrap"><i className="fa fa-clock-o" /></div>
              <Field
                name="timezone"
                component={WrappedSelect}
                options={timezoneList}
                onChange={this.changeTimezone}
                placeholder="Your Time Zone"
              />
              <p className="tooltip">This is the local time on your device. Is this timezone correct ?</p>
            </div>
          </div>
          <div className="education-background">
            <div className="title">
              <h1 className="primary-color">Education Background</h1>
              <RaisedButton
                label="Add"
                style={{ verticalAlign: 'middle' }}
                icon={<i style={{ color: '#ffffff', fontSize: 18 }} className="fa fa-graduation-cap" />}
                primary
                onClick={this.handleEduDialogOpen}
              />
              <span className="education-background-tooltip" style={{ display: this.state.eduList ? 'inline-block' : 'none' }}>Click The Item To Edit!</span>
              <Dialog
                title="Add Your Education Experience"
                actions={addEduExpActions}
                modal={false}
                open={this.state.eduDialogOpen}
                onRequestClose={this.handleEduDialogClose}
              >
                <div className="t-edu-form-wrap">
                  <div className="clearfix">
                    <TextField
                      floatingLabelStyle={labelStyle}
                      className="left"
                      style={{ width: '40%' }}
                      id="t-edu-start-year"
                      floatingLabelText="Start Year"
                    />
                    <TextField
                      floatingLabelStyle={labelStyle}
                      className="right"
                      style={{ width: '40%' }}
                      id="t-edu-end-year"
                      floatingLabelText="End Year"
                    />
                  </div>
                  <TextField
                    floatingLabelStyle={labelStyle}
                    id="t-edu-school"
                    type="text"
                    floatingLabelText="School"
                  />
                  <br />
                  <TextField
                    floatingLabelStyle={labelStyle}
                    id="t-edu-major"
                    type="text"
                    floatingLabelText="Major"
                  />
                  <br />
                  <TextField
                    floatingLabelStyle={labelStyle}
                    id="t-edu-degree"
                    type="text"
                    floatingLabelText="Degree"
                  />
                </div>
              </Dialog>
              <Dialog
                title="Modify Your Education Experience"
                actions={updateActions}
                modal={false}
                open={this.state.eduExpSelectedDialogOpen}
                onRequestClose={this.handleUpdateDiaClose}
              >
                <div className="t-edu-form-wrap">
                  <div className="clearfix">
                    <TextField
                      floatingLabelStyle={labelStyle}
                      className="left"
                      style={{ width: '40%' }}
                      id="t-edu-start-year-m"
                      defaultValue={this.state.eduExpSelected.timefrom}
                      floatingLabelText="Start Year"
                    />
                    <TextField
                      floatingLabelStyle={labelStyle}
                      className="right"
                      style={{ width: '40%' }}
                      id="t-edu-end-year-m"
                      defaultValue={this.state.eduExpSelected.timeto}
                      floatingLabelText="End Year"
                    />
                  </div>
                  <TextField
                    floatingLabelStyle={labelStyle}
                    id="t-edu-school-m"
                    defaultValue={this.state.eduExpSelected.institution}
                    type="text"
                    floatingLabelText="School"
                  />
                  <br />
                  <TextField
                    floatingLabelStyle={labelStyle}
                    id="t-edu-major-m"
                    defaultValue={this.state.eduExpSelected.major}
                    type="text"
                    floatingLabelText="Major"
                  />
                  <br />
                  <TextField
                    floatingLabelStyle={labelStyle}
                    id="t-edu-degree-m"
                    defaultValue={this.state.eduExpSelected.degree}
                    type="text"
                    floatingLabelText="Degree"
                  />
                </div>
              </Dialog>
            </div>
            <Table style={eduTableStyle} onRowSelection={this.showFullDetail}>
              <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                <TableRow>
                  <TableHeaderColumn>Start Time</TableHeaderColumn>
                  <TableHeaderColumn>End Time</TableHeaderColumn>
                  <TableHeaderColumn>School</TableHeaderColumn>
                  <TableHeaderColumn>Major</TableHeaderColumn>
                  <TableHeaderColumn>Degree</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody displayRowCheckbox={false} showRowHover>
                {
                  this.state.eduListItems.map((item, index) => (
                    <TableRow key={index} data-index={index} hoverable style={{ cursor: 'pointer' }}>
                      <TableRowColumn>{item.timefrom}</TableRowColumn>
                      <TableRowColumn>{item.timeto}</TableRowColumn>
                      <TableRowColumn>{item.institution}</TableRowColumn>
                      <TableRowColumn>{item.major}</TableRowColumn>
                      <TableRowColumn>{item.degree}</TableRowColumn>
                    </TableRow>
                  ))
                }
              </TableBody>
            </Table>
          </div>
        </form>
      </div>
    )
  }

  handleSubmit() {
    const self = this;
    let notification = '';

    const {
      updateBasicInfo,
      showNotification,
      networkError,
      displaySuccess,
      displayError,
    } = this.props

    const firstName = document.querySelector("input[name='firstname']").value;
    const lastName = document.querySelector("input[name='lastname']").value;
    const checkedElem = document.querySelector('input[name="gender"]:checked');
    const nationality = this.state.nationalityId;
    const gender = checkedElem ? checkedElem.value : '';
    const avatar = this.state.avatarUrl;
    const country = this.state.countryId;
    const region = this.state.regionId;
    const city = this.state.cityId;
    const timezone = this.state.timezoneId;
    const nationCode = document.querySelector("[name='tel_code']").value;
    const phoneNum = document.querySelector("[name='tel_num']").value;
    const eduExperienceList = this.state.eduListItems;

    const numericP = /^[0-9]+$/;

    if (!firstName.length) {
      notification = 'Please enter your first name.';
    } else if (!lastName.length) {
      notification = 'Please enter your last name.';
    } else if (!nationality) {
      notification = 'Please select your nationality.';
    } else if (!gender.length) {
      notification = 'Please select your gender.';
    } else if (!avatar.length) {
      notification = 'Please upload your profile picture.';
    } else if (!country) {
      notification = 'Please select your country of residence.';
    } else if (!timezone) {
      notification = 'Please select your location timezone.';
    } else if (!phoneNum.length) {
      notification = 'Please enter your phone number.';
    } else if (!eduExperienceList.length) {
      notification = 'Please complete Education Background.';
    } else if (!numericP.test(phoneNum)) {
      notification = 'Phone number should be numbers.';
    } else if (!!nationCode.length && !numericP.test(nationCode)) {
      notification = 'Country code should be numbers.';
    }

    if (notification.length > 0) {
      showNotification(notification);
      return;
    }

    const data = {
      firstname: firstName,
      lastname: lastName,
      gender: gender === 'male' ? 1 : 0,
      residence_n: country,
      residence_p: region,
      residence_c: city,
      eduexp: eduExperienceList,
      tel_code: nationCode,
      tel_num: phoneNum,
      avatar,
      nationality,
      timezone,
    };

    updateBasicInfo(data).then((res) => {
      if (res.payload.success) {
        displaySuccess()
      } else {
        displayError()
      }
    }).catch(() => networkError())
  }
}

console.log(BasicInfo);     // TODO:  是否这里可以用 BasicInfo 取得他的里面的 props.
BasicInfo = reduxForm({
  form: 'applicationBasicInfo',
  initialValues: {

  },
})(BasicInfo)

export default BasicInfo
