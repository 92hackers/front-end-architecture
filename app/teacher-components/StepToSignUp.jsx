// step page to complete sign up process.
import React from 'react';
import {browserHistory, Link} from 'react-router';

import CircularProgress from 'material-ui/CircularProgress';
import { Step, Stepper, StepLabel } from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import SelectField from 'material-ui/SelectField';
import Dropdown from 'react-dropdown';
import MenuItem from 'material-ui/MenuItem';
import Dialog from 'material-ui/Dialog';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import {red500} from 'material-ui/styles/colors';

import api from '../network/api';
import AvatarUpload from '../universal/AvatarUpload';
import SiteLoading from '../containers/SiteLoading';
import TAvatar from './TAvatar';
import WaitForSubmit from '../universal/WaitForSubmit';

class BasicInfo extends React.Component {

  constructor (props) {
    super (props);
    this.state = {
      profile: this.props.profile,
      oldProfile: {},
      gender: "",
      countryCode: "",
      phoneNumber: "",

      nationalityList: [],
      nationalityValue: null,
      countryList: [],
      countryValue: null,
      regionList: [],
      regionValue: null,
      cityList: [],
      cityValue: null,
      timezoneList: [],
      timezoneValue: null,

      nationalityId: "",
      countryId: "",
      regionId: "",
      cityId: "",
      timezoneId: "",

      avatarUrl: "",
      profilePictureSrc: "",

      notification: "",

      eduDialogOpen: false,
      eduList: 0,
      eduListItems: [],
      eduExpSelected: "",
      eduExpSelectedIndex: "",
      eduExpSelectedDialogOpen: false,

    };
    this.token = this.props.token;
  }

  componentWillMount () {
    if (!this.token) {
      browserHistory.push("/sign-in");
    } else {
      this.setProfile(this.state.profile);
    }
  }

  setProfile (profile) {
    let eduExp = [];
    if (!!profile.eduexp) {
      eduExp = profile.eduexp;
      this.setState({
        eduListItems: eduExp,
        eduList: eduExp.length
      });
    }
    if (profile.avatar) {
      this.setState({
        avatarUrl: profile.avatar,
      });
    }
    if (profile.nation) {
      this.setState({
        nationalityValue: profile.nation
      });
    }
    if (profile.country) {
      this.setState({
        countryValue: profile.country
      });
    }
    if (profile.region) {
      this.setState({
        regionValue: profile.region
      });
    }
    if (profile.city) {
      this.setState({
        cityValue: profile.city
      });
    }
    if (profile["timezone_name"]) {
      this.setState({
        timezoneValue: profile["timezone_name"]
      });
    }
    if (profile.nationality) {
      this.setState({
        nationalityId: profile.nationality
      });
    }
    if (profile["residence_n"]) {
      this.setState({
        countryId: profile["residence_n"]
      });
    }
    if (profile["residence_p"]) {
      this.setState({
        regionId: profile["residence_p"]
      });
    }
    if (profile["residence_c"]) {
      this.setState({
        cityId: profile["residence_c"]
      });
    }
    if (profile.timezone) {
      this.setState({
        timezoneId: profile.timezone
      });
      this.props.setTimezoneId(profile.timezone);
    }

    this.setState({
      oldProfile: {
        firstname:      profile.firstname,
        lastname:       profile.lastname,
        gender:         profile.gender,
        avatar:         profile.avatar,
        nationality:    profile.nationality,
        "residence_n":  profile["residence_n"],
        "residence_p":  profile["residence_p"],
        "residence_c":  profile["residence_c"],
        "timezone":     profile.timezone,
        eduexp:         profile.eduexp,
        "tel_code":     profile["tel_code"],
        "tel_num":      profile["tel_num"]
      },
      profile: profile
    });

  }

  componentWillReceiveProps (nextProps) {
    var profile = nextProps.profile;
    if (nextProps.profile !== this.props.profile) {
      this.setProfile(profile);
    }
  }

  changeNationality (value) {
    this.setState({
      nationalityValue: value.label,
      nationalityId: value.value
    });
  }

  changeCountry (value) {
    var self = this;
    this.setState({
      countryValue: value.label,
      countryId: value.value
    });

    this.regionListRequest = api.TRegionList("",
    { "Authorization": self.token },
    value.value,
    (resp) => {
      if (resp.success) {

        const regionList = resp.data.map((region) => {
          return {
            value: region.id,
            label: region.name
          };
        });
        self.setState({
          regionList: regionList,
          regionValue: null,
          regionId: "",
          cityId: "",
          cityValue: null
        });
      } else {
        console.log("error fetching");
      }
    },
    (err) => {
      console.log(err);
    }
  );

  }


  changeRegion (value) {
    var self = this;
    this.setState({
      regionValue: value.label,
      regionId: value.value
    });

    this.cityListRequest = api.TCityList("",
    { "Authorization": self.token },
    value.value,
    (resp) => {
      if (resp.success) {
        const cityList = resp.data.map((city) => {
          return {
            value: city.id,
            label: city.name
          };
        });
        self.setState({
          cityList: cityList,
          cityValue: null,
          cityId: ""
        });
      } else {
        console.log("error fetching");
      }
    },
    (err) => {
      console.log(err);
    }
  );

  }

  changeCity (value) {
    var self = this;

    this.setState({
      cityValue: value.label,
      cityId: value.value
    });

  }

  changeTimezone (value) {
    this.setState({
      timezoneValue: value.label,
      timezoneId: value.value
    });
    this.props.setTimezoneId(value.value);
  }

  profilePictureSelect (e) {
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
        profilePictureSrc: reader.result
      }, () => {
        this.refs.avatarUpload.getWrappedInstance().handleOpen();        //  open the dialog.
      });
    };
    reader.readAsDataURL(files[0]);

  }

  setAvatarUrl (url) {
    this.setState({
      avatarUrl: url
    });
  }

  showFullDetail (index) {
    if (!!index && !!this.state.eduListItems) {
      let expData = this.state.eduListItems[index[0]];

      this.setState({
        eduExpSelectedIndex: index[0],
        eduExpSelected: expData
      }, () => {
        this.handleUpdateDiaOpen();
      });

    }
  }

  handleUpdateDiaOpen () {
    this.setState({
      eduExpSelectedDialogOpen: true
    });
  }

  addEduExp (e) {
    e.preventDefault();

    var notification = "";
    var temp = this.state.eduListItems;
    var tempEduList = this.state.eduList;

    var getValue = (ele) => {
      return document.getElementById(ele).value;
    }

    var startYear = getValue("t-edu-start-year");
    var endYear = getValue("t-edu-end-year");
    var school = getValue("t-edu-school");
    var major = getValue("t-edu-major");
    var degree = getValue("t-edu-degree");


    if (!!startYear && !!endYear && !!school && !!major && !!degree) {

      var regExp = /^[0-9]+$/;

      if (startYear.length !== 4 || endYear.length !== 4 || !regExp.test(startYear) || !regExp.test(endYear)) {
        notification = "Year should be exactly 4 numbers.";
      }

      if (!!notification.length) {
        this.props.showNotification(notification);
        return ;
      }

      let data = {
        timefrom: startYear,
        timeto: endYear,
        institution: school,
        major: major,
        degree: degree
      };

      temp.push(data);
      tempEduList++;
      this.setState({
        eduListItems: temp,
        eduDialogOpen: false,
        eduList: tempEduList
      });
    } else {
      this.props.showNotification("Please Complete All Fields");
    }

  }

  handleEduDialogOpen () {
    this.setState({
      eduDialogOpen: true
    });
  }

  handleEduDialogClose () {
    this.setState({
      eduDialogOpen: false
    });
  }

  handleEduUpdate (e) {
    e.preventDefault();
    this.handleUpdateDiaClose();

    var tmp = this.state.eduListItems;
    var updateIndex = this.state.eduExpSelectedIndex;
    var self = this;
    var notification = "";

    var getValue = (ele) => {
      return document.getElementById(ele).value;
    };

    var startYear = getValue("t-edu-start-year-m");
    var endYear = getValue("t-edu-end-year-m");
    var school = getValue("t-edu-school-m");
    var major = getValue("t-edu-major-m");
    var degree = getValue("t-edu-degree-m");

    if (!!startYear && !!endYear && !!school && !!major && !!degree) {

      var regExp = /^[0-9]+$/;

      if (startYear.length !== 4 || endYear.length !== 4 || !regExp.test(startYear) || !regExp.test(endYear)) {
        notification = "Year should be exactly 4 numbers.";
      }

      if (!!notification.length) {
        this.props.showNotification(notification);
        return ;
      }

      let data = {
        timefrom: startYear,
        timeto: endYear,
        institution: school,
        major: major,
        degree: degree
      };

      tmp[updateIndex] = data;

      this.setState({
        eduListItems: tmp
      });

    } else {
      this.props.showNotification("Please Complete All Fields.");
    }

  }

  handleEduExpDel (e) {
    e.preventDefault();

    var tempEduList = this.state.eduList;
    tempEduList--;

    this.handleUpdateDiaClose();
    var tmp = this.state.eduListItems;
    tmp.splice(this.state.eduExpSelectedIndex, 1);
    this.setState({
      eduListItems: tmp,
      eduList: tempEduList
    });
  }

  handleUpdateDiaClose (e) {
    this.setState({
      eduExpSelectedDialogOpen: false
    });
  }

  handleValueChange (e) {
    var profile = this.state.profile;

    profile[e.target.name] = e.target.value;

    this.setState({
      profile: profile
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
      display: this.state.eduList ? "table" : "none"
    };

    const updateActions = [
      <RaisedButton
        className="dialog-button"
        label="Delete"
        default={true}
        onTouchTap={this.handleEduExpDel.bind(this)}
        style={{ float: "left" }}
      />,
      <RaisedButton
        className="dialog-button"
        label="Cancel"
        default={true}
        onTouchTap={this.handleUpdateDiaClose.bind(this)}
      />,
      <RaisedButton
        className="dialog-button"
        id="submitEdu"
        label="Update"
        primary={true}
        onTouchTap={this.handleEduUpdate.bind(this)}
      />
    ];

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
        onTouchTap={this.addEduExp.bind(this)}
      />
    ];

    var profile = this.state.profile;

    var gender = profile.gender;
    var defaultGender = "";

    switch (gender) {
      case 0:
        defaultGender = "female";
        break;
      case "female":
        defaultGender = "female";
        break;
      case 1:
        defaultGender = "male";
        break;
      case "male":
        defaultGender = "male";
        break;
      default:
        defaultGender = "male";
    }

    var labelStyle = { color: "#666666", fontWeight: "bold"};

    return (
      <div className="basic-info">
        <div className="meta-data-picture clearfix">
          <div className="meta-data">
            <ul>
              <li className="data-item">
                <div className="name">
                  <div className="icon-wrap"><i className="fa fa-user"></i></div>
                  <TextField floatingLabelStyle={labelStyle} value={profile.firstname} name="firstname" floatingLabelText="FirstName" style={{width: 130, marginRight: 20}} onChange={this.handleValueChange.bind(this)}></TextField>
                  <i className="vertical-line"></i>
                  <TextField floatingLabelStyle={labelStyle} value={profile.lastname} name="lastname" floatingLabelText="LastName" style={{width: 130, marginLeft: 20}} onChange={this.handleValueChange.bind(this)}></TextField>
                </div>
              </li>
              <li className="data-item">
                <div className="gender">
                  <p id="gender-caption" className="primary-color">Gender</p>
                  <RadioButtonGroup valueSelected={defaultGender} name="gender" style={styles.RadioButtonGroup} onChange={this.handleValueChange.bind(this)}>
                    <RadioButton labelStyle={{color: "#999"}} value="male" label="Male" style={styles.radioButton}/>
                    <RadioButton labelStyle={{color: "#999"}} value="female" label="Female" style={styles.radioButton}/>
                  </RadioButtonGroup>
                </div>
              </li>
              <li className="data-item">
                <div className="nationality">
                  <div className="dropdown-icon-wrap"><i className="fa fa-globe"></i></div>
                  <Dropdown options={this.state.nationalityList} onChange={this.changeNationality.bind(this)} value={this.state.nationalityValue} placeholder="Your Nationality"></Dropdown>
                </div>
              </li>
              <li className="data-item">
                <div className="phone-num">
                  <div className="icon-wrap"><i className="fa fa-phone"></i></div>
                  <TextField floatingLabelStyle={labelStyle} value={profile["tel_code"] ? profile["tel_code"] : ""} name="tel_code" floatingLabelText="Country Code" style={{width: 130, marginRight: 20}} onChange={this.handleValueChange.bind(this)}></TextField>
                  <i className="vertical-line"></i>
                  <TextField floatingLabelStyle={labelStyle} value={profile["tel_num"] ? profile["tel_num"] : ""} name="tel_num" floatingLabelText="Phone Number" style={{width: 130, marginLeft: 20}} onChange={this.handleValueChange.bind(this)}></TextField>
                </div>
              </li>
            </ul>
          </div>
          <div className="picture">
            <div className="avatar">
              <TAvatar avatarUrl={this.state.avatarUrl}></TAvatar>
            </div>
            <br/>
            <RaisedButton className="submit-btn" icon={<i style={{fontSize: 20, color: "#fff"}} className="fa fa-camera"></i>} primary={true} id="upload-profile-picture" label="Upload Profile Picture" style={{width: "50%", margin: '0 auto', display: "block"}}>
              <input type="file" style={uploadPictureStyle} onChange={this.profilePictureSelect.bind(this)}/>
            </RaisedButton>
            <WaitForSubmit ref="loader"></WaitForSubmit>
            <AvatarUpload ref="avatarUpload" displayLoader={this.refs.loader.displayLoader.bind(this)} hideLoader={this.refs.loader.hideLoader.bind(this)} src={this.state.profilePictureSrc} setAvatarUrl={this.setAvatarUrl.bind(this)}></AvatarUpload>
          </div>
        </div>
        <div className="residence-timezone clearfix">
          <div className="residence">
            <div className="dropdown-icon-wrap"><i className="fa fa-map-marker"></i></div>
            <Dropdown options={this.state.countryList} onChange={this.changeCountry.bind(this)} value={this.state.countryValue} placeholder="Country"></Dropdown>
            <i className="vertical-line"></i>
            <Dropdown options={this.state.regionList} onChange={this.changeRegion.bind(this)} value={this.state.regionValue} placeholder="Region"></Dropdown>
            <i className="vertical-line"></i>
            <Dropdown options={this.state.cityList} onChange={this.changeCity.bind(this)} value={this.state.cityValue} placeholder="City"></Dropdown>
          </div>
          <div className="timezone">
            <div className="dropdown-icon-wrap"><i className="fa fa-clock-o"></i></div>
            <Dropdown options={this.state.timezoneList} onChange={this.changeTimezone.bind(this)} value={this.state.timezoneValue} placeholder="Your Time Zone"></Dropdown>
          </div>
        </div>
        <div className="education-background">
          <div className="title">
            <h1 className="primary-color">Education Background</h1>
            <RaisedButton label="Add" style={{verticalAlign: "middle"}} icon={<i style={{color: "#ffffff", fontSize: 18}} className="fa fa-graduation-cap"></i>} primary={true} onClick={this.handleEduDialogOpen.bind(this)}></RaisedButton>
            <span className="education-background-tooltip" style={{display: this.state.eduList ? "inline-block" : "none"}}>Click The Item To Edit!</span>
            <Dialog title="Add Your Education Experience" actions={addEduExpActions} modal={false} open={this.state.eduDialogOpen} onRequestClose={this.handleEduDialogClose.bind(this)}>
              <div className="t-edu-form-wrap">
                <div className="clearfix">
                  <TextField floatingLabelStyle={labelStyle} className="left" style={{width: "40%"}} id="t-edu-start-year" floatingLabelText="Start Year"></TextField>
                  <TextField floatingLabelStyle={labelStyle} className="right" style={{width: "40%"}} id="t-edu-end-year" floatingLabelText="End Year"></TextField>
                </div>
                <TextField floatingLabelStyle={labelStyle} id="t-edu-school" type="text" floatingLabelText="School"></TextField>
                <br/>
                <TextField floatingLabelStyle={labelStyle} id="t-edu-major" type="text" floatingLabelText="Major"></TextField>
                <br/>
                <TextField floatingLabelStyle={labelStyle} id="t-edu-degree" type="text" floatingLabelText="Degree"></TextField>
              </div>
            </Dialog>
            <Dialog title="Modify Your Education Experience" actions={updateActions} modal={false} open={this.state.eduExpSelectedDialogOpen} onRequestClose={this.handleUpdateDiaClose.bind(this)}>
              <div className="t-edu-form-wrap">
                <div className="clearfix">
                  <TextField floatingLabelStyle={labelStyle} className="left" style={{width: "40%"}} id="t-edu-start-year-m" defaultValue={this.state.eduExpSelected.timefrom} floatingLabelText="Start Year"></TextField>
                  <TextField floatingLabelStyle={labelStyle} className="right" style={{width: "40%"}} id="t-edu-end-year-m" defaultValue={this.state.eduExpSelected.timeto} floatingLabelText="End Year"></TextField>
                </div>
                <TextField floatingLabelStyle={labelStyle} id="t-edu-school-m" defaultValue={this.state.eduExpSelected.institution} type="text" floatingLabelText="School"></TextField>
                <br/>
                <TextField floatingLabelStyle={labelStyle} id="t-edu-major-m" defaultValue={this.state.eduExpSelected.major} type="text" floatingLabelText="Major"></TextField>
                <br/>
                <TextField floatingLabelStyle={labelStyle} id="t-edu-degree-m" defaultValue={this.state.eduExpSelected.degree} type="text" floatingLabelText="Degree"></TextField>
              </div>
            </Dialog>
          </div>
          <Table style={eduTableStyle} onRowSelection={this.showFullDetail.bind(this)}>
            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
              <TableRow>
                <TableHeaderColumn>Start Time</TableHeaderColumn>
                <TableHeaderColumn>End Time</TableHeaderColumn>
                <TableHeaderColumn>School</TableHeaderColumn>
                <TableHeaderColumn>Major</TableHeaderColumn>
                <TableHeaderColumn>Degree</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false} showRowHover={true}>
              {
                this.state.eduListItems.map((item, index) => {
                  return (
                    <TableRow key={index} data-index={index} hoverable={true} style={{cursor: "pointer"}}>
                      <TableRowColumn>{item.timefrom}</TableRowColumn>
                      <TableRowColumn>{item.timeto}</TableRowColumn>
                      <TableRowColumn>{item.institution}</TableRowColumn>
                      <TableRowColumn>{item.major}</TableRowColumn>
                      <TableRowColumn>{item.degree}</TableRowColumn>
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

  componentDidMount () {
    var self = this;

    if (!self.token) {
      browserHistory.push("/sign-in");
      return;
    }

    this.nationalityRequest = api.TNationalityList("",
      { "Authorization": self.token },
      "",
      (resp) => {
        if (resp.success) {
          const nationalityList = resp.data.map((nationality) => {
            return {
              value: nationality.id,
              label: nationality.name
            };
          });
          self.setState({
            nationalityList: nationalityList
          });
        } else {
          console.log("error fetching");
        }
      },
      (err) => {
        console.log(err);
      }
    );

    this.countryListRequest = api.TCountryList("",
      { "Authorization": self.token },
      "",
      (resp) => {
        if (resp.success) {
          const countryList = resp.data.map((country) => {
            return {
              value: country.id,
              label: country.name
            };
          });
          self.setState({
            countryList: countryList
          });
        } else {
          console.log("error fetching");
        }
      },
      (err) => {
        console.log(err);
      }
    );

    this.timezoneListRequest = api.TTimezone("",
      { "Authorization": self.token },
      "",
      (resp) => {
        if (resp.success) {
          const timezoneList = resp.data.map((timezone) => {
            return {
              value: timezone.id,
              label: timezone["en_name"]
            };
          });

          var localDate = new Date();
          var defaultTimezone = "";
          var defaultTimezoneId = "";
          var localTimezone = localDate.toString().match(/GMT[+-]\d{2}/)[0];
          var regExpTimezone = localTimezone.replace("+", "\\+");

          for (let i = 0; i < timezoneList.length; i++) {
            if (timezoneList[i].label.search(new RegExp(regExpTimezone)) !== -1) {
              defaultTimezone = timezoneList[i].label;
              defaultTimezoneId = timezoneList[i].value;
              break;
            }
          }

          self.setState({
            timezoneList: timezoneList,
          });

          if (!self.state.timezoneValue && !self.state.timezoneId) {      //  如果已经设置了值，就不需要这里再设置值了。
            self.props.setTimezoneId(defaultTimezoneId);
            self.setState({
              timezoneValue: defaultTimezone,
              timezoneId: defaultTimezoneId
            });
          }

        } else {
          console.log("error fetching");
        }
      },
      (err) => {
        console.log(err);
      }
    );

  }

  handleSubmit () {

    var self = this;
    var notification = "";

    let firstName = document.querySelector("input[name='firstname']").value;
    let lastName = document.querySelector("input[name='lastname']").value;
    let checkedElem = document.querySelector('input[name="gender"]:checked');
    let nationality = this.state.nationalityId;
    let gender = checkedElem ? checkedElem.value : "";
    let avatar = this.state.avatarUrl;
    let country = this.state.countryId;
    let region = this.state.regionId;
    let city = this.state.cityId;
    let timezone = this.state.timezoneId;
    let nationCode = document.querySelector("[name='tel_code']").value;
    let phoneNum = document.querySelector("[name='tel_num']").value;
    let eduExperienceList = this.state.eduListItems;

    let numericP = /^[0-9]+$/;

    if (!firstName.length) {
      notification = "Please enter your first name.";
    } else if (!lastName.length) {
      notification = "Please enter your last name.";
    } else if (!nationality) {
      notification = "Please select your nationality.";
    } else if (!gender.length) {
      notification = "Please select your gender.";
    } else if (!avatar.length) {
      notification = "Please upload your profile picture.";
    } else if (!country) {
      notification = "Please select your country of residence.";
    } else if (!timezone) {
      notification = "Please select your location timezone.";
    } else if (!phoneNum.length) {
      notification = "Please enter your phone number.";
    } else if (!eduExperienceList.length) {
      notification = "Please complete Education Background.";
    } else if (!numericP.test(phoneNum)) {
      notification = "Phone number should be numbers.";
    } else if (!!nationCode.length && !numericP.test(nationCode)) {
      notification = "Country code should be numbers.";
    }

    if (!!notification.length) {
      self.props.showNotification(notification);
      return;
    }

    var data = {
      firstname: firstName,
      lastname: lastName,
      gender: gender === "male" ? 1 : 0,
      avatar: avatar,
      nationality: nationality,
      "residence_n": country,
      "residence_p": region,
      "residence_c": city,
      "timezone": timezone,
      eduexp: eduExperienceList,
      "tel_code": nationCode,
      "tel_num": phoneNum
    };

    if (JSON.stringify(data) !== JSON.stringify(this.state.oldProfile)) {

      api.TApplyStep1(data,
        {"Authorization": self.token},
        "",
        (resp) => {
          console.log(resp);
        },
        (err) => {
          console.log("upload data error.");
        }
      );

    }

    return true;
  }
}

class TeachingExperience extends React.Component {

  constructor (props) {
    super (props);
    this.state = {
      notification: "",
      profile: this.props.profile || {},
      oldProfile: {},
      teachExpValue: this.props.teachExpValue || null
    };
    this.token = this.props.token;
  }

  setProfile (profile) {
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

    this.setState({
      profile: profile,
      teachExpValue: experience
    });
  }


  componentWillReceiveProps (nextProps) {
    var profile = nextProps.profile;

    if (profile !== this.props.profile) {
      this.setProfile(profile);
    }

  }

  componentWillMount () {
    if (!this.token) {
      browserHistory.push("/sign-in");
    } else {
      this.setProfile(this.state.profile);
    }
  }

  componentDidMount () {
    var profile = this.props.profile;
    var tmp = {
      experience: profile.experience,
      intro: profile.intro,
      style: profile.style,
      whyteach: profile.whyteach,
      additional: profile.additional
    };
    if (!!profile) {
      this.setState({
        oldProfile: tmp
      });
    }
  }

  handleChange (e, index) {
    this.setState({
      teachExpValue: index
    });
  }

  handleValueChange (e) {
    var ele = e.target;
    var profile = this.state.profile;
    profile[ele.name] = ele.value;

    this.setState({
      profile: profile
    });

  }

  render () {

    const textFieldStyle = {
      width: "100%"
    };

    var profile = this.state.profile;

    var labelStyle = {
      color: "#666666",
      fontWeight: "bold"
    };

    return (
      <div className="teaching-experience">
        <div className="select-years">
          <span className="title">Teaching Experience</span>
          <SelectField style={{verticalAlign: "middle"}} id="teach-experience" value={this.state.teachExpValue} onChange={this.handleChange.bind(this)} floatingLabelText="Select...">
            <MenuItem style={{cursor: "pointer"}} value={0} primaryText="Less than 5 years" />
            <MenuItem style={{cursor: "pointer"}} value={1} primaryText="Between 5 to 15 years" />
            <MenuItem style={{cursor: "pointer"}} value={2} primaryText="More than 15 years" />
          </SelectField>
        </div>
        <ul>
          <li className="words-item">
            <div className="caption">
              <span className="index">1</span>
              <span className="title">What important qualities should an ESL teacher possess?</span>
            </div>
            <div className="input-box">
              <TextField maxLength="500" floatingLabelStyle={labelStyle} placeholder="500 Characters Remaining" value={profile.intro ? profile.intro : ""} style={textFieldStyle} name="intro" id="self-intro" multiLine={true} rows={5} rowsMax={5} type="textarea" onChange={this.handleValueChange.bind(this)}></TextField>
            </div>
          </li>
          <li className="words-item">
            <div className="caption">
              <span className="index">2</span>
              <span className="title">Name 5 factors to consider when lesson planning.</span>
            </div>
            <div className="input-box">
              <TextField maxLength="500" floatingLabelStyle={labelStyle} placeholder="500 Characters Remaining" value={profile.style ? profile.style : ""} style={textFieldStyle} name="style" id="teach-style" multiLine={true} rows={5} rowsMax={5} type="textarea" onChange={this.handleValueChange.bind(this)}></TextField>
            </div>
          </li>
          <li className="words-item">
            <div className="caption">
              <span className="index">3</span>
              <span className="title">How do you plan to keep young learners motivated and engaged in an online classroom setting?</span>
            </div>
            <div className="input-box">
              <TextField maxLength="500" floatingLabelStyle={labelStyle} placeholder="500 Characters Remaining" value={profile.whyteach ? profile.whyteach : ""} style={textFieldStyle} name="whyteach" id="why-a-teacher" multiLine={true} rows={5} rowsMax={5} type="textarea" onChange={this.handleValueChange.bind(this)}></TextField>
            </div>
          </li>
          <li className="words-item">
            <div className="caption">
              <span className="index">4</span>
              <span className="title">Is there any other useful information you'd like to provide about yourself? (optional)</span>
            </div>
            <div className="input-box">
              <TextField maxLength="500" floatingLabelStyle={labelStyle} placeholder="500 Characters Remaining" value={profile.additional ? profile.additional : ""} style={textFieldStyle} name="additional" id="addition" multiLine={true} rows={5} rowsMax={5} type="textarea" onChange={this.handleValueChange.bind(this)}></TextField>
            </div>
          </li>
        </ul>
      </div>
    )
  }

  handleSubmit () {
    var self = this;
    var notification = "";

    let teachExperience = document.getElementById("teach-experience").innerText.trim();
    let selfIntro = document.getElementById("self-intro").value;
    let teachStyle = document.getElementById("teach-style").value;
    let whyATeacher = document.getElementById("why-a-teacher").value;
    let addition = document.getElementById("addition").value;

    if (!teachExperience.length) {
        notification = "Please select the number of years that you have taught.";
    } else if (!selfIntro.length) {
        notification = "Please answer Question 1.";
    } else if (!teachStyle.length) {
        notification = "Please answer Question 2.";
    } else if (!whyATeacher.length) {
        notification = "Please answer Question 3.";
    }

    if (selfIntro.length > 500) {
      notification = "Question 1 should be less than 500 characters.";
    } else if (teachStyle.length > 500) {
      notification = "Question 2 should be less than 500 characters.";
    } else if (whyATeacher.length > 500) {
      notification = "Question 3 should be less than 500 characters.";
    }

    if (!!notification.length) {
      self.props.showNotification(notification);
      return;
    }

    var experience = 0;

    switch (teachExperience) {
      case "More than 15 years":
        experience = 3;
        break;
      case "Between 5 to 15 years":
        experience = 2;
        break;
      case "Less than 5 years":
        experience = 1;
        break;
      default:
        experience = 0;
    }

    var data = {
      experience: experience,
      intro: selfIntro,
      style: teachStyle,
      whyteach: whyATeacher,
      additional: addition
    };

    if (JSON.stringify(data) !== JSON.stringify(this.state.oldProfile)) {

      api.TApplyStep2(data,
        {"Authorization": self.token},
        "",
        (resp) => {
          console.log(resp);
        },
        (err) => {
          console.log("upload data error.");
        }
      );

    }

    return true;
  }
}

class ScheduleInterview extends React.Component {

  constructor (props) {
    super (props);
    this.state = {
      dateValue: 0,
      timeValue: 0,
      availableDate: [],
      availableTime: [],
      allAvailableTime: [],
      timeToIdMapping: [],
      dataIsReady: false,
      notification: ""
    };
    this.token = this.props.token;
  }

  bookTheViewDateChange (e, index, value) {
    this.setState({
      dateValue: value,
      timeValue: 0,
      availableTime: this.state.allAvailableTime[index]
    });
  }

  bookTheViewTimeChange (e, index, value) {
    this.setState({
      timeValue: value
    });
  }

  fetchInterviewData (TimezoneId) {
    var self = this;

    var token = self.props.token;

    this.interviewDateTimeRequest = api.TInterview("",
    { "Authorization": token },
    TimezoneId,
    (resp) => {
      if (resp.success) {
        var data = resp.data;
        var interviewTime = data["timetable"].map((date, index) => {
          return {
            date: date["inter_date"],
            timeList: date["inter_time"].map((time,index) => {
              return {
                id: time.id,
                period: time.period
              };
            })
          };
        });
        var date = [];
        var time = [];
        var timeToIdMapping = [];
        for (let i = 0; i < interviewTime.length; i++) {
          date.push(interviewTime[i].date);
          time.push(interviewTime[i].timeList);
        }

        for (let j = 0; j < time.length; j++) {
          for (let k = 0; k < time[j].length; k++) {
            timeToIdMapping.push({
              id: time[j][k].id,
              period: time[j][k].period
            });
          }
        }

        self.setState({
          dataIsReady: true,
          availableDate: date || [],
          allAvailableTime: time || [],
          timeToIdMapping: timeToIdMapping || [],
          availableTime: time[0] || []
        });
      } else {
        console.log("fetch interview time data error.");
      }
    },
    (err) => {
      console.log("interview request error.");
    }
  )
}

  render () {
    return (
      <div className="schedule-interview">
        <div className="wrap">
          <h1 className="title">Schedule Video Interview</h1>
          {
            this.state.dataIsReady ? (
              <div className="input-box">
                <div className="input-item">
                  <span className="interview-icon"><i className="fa fa-calendar"></i></span>
                  <SelectField style={{verticalAlign: "middle"}} value={this.state.dateValue} onChange={this.bookTheViewDateChange.bind(this)}>
                    {
                      this.state.availableDate.map((item, index) => {
                        return <MenuItem style={{cursor: "pointer"}} value={index} key={index} primaryText={item}></MenuItem>;
                      })
                    }
                  </SelectField>
                </div>
                <br/>
                <div className="input-item">
                  <span className="interview-icon"><i className="fa fa-clock-o"></i></span>
                  <SelectField style={{verticalAlign: "middle"}} id="interview-time" value={this.state.timeValue} onChange={this.bookTheViewTimeChange.bind(this)}>
                    {
                      this.state.availableTime.map((item, index) => {
                        return <MenuItem style={{cursor: "pointer"}} value={index} key={index} primaryText={item.period}></MenuItem>;
                      })
                    }
                  </SelectField>
                </div>
              </div>
                ) : <CircularProgress></CircularProgress>
          }
        </div>
      </div>
    )
  }

  componentDidMount () {
    this.fetchInterviewData(this.props.timezoneId);
  }

  handleSubmit () {
    var self = this;
    var interviewPeriod = document.getElementById("interview-time").innerText.trim();

    if (!interviewPeriod) {
      self.props.showNotification("Please select one interview time.");
      return;
    }

    var interviewId = "";
    var timeToIdMapping = this.state.timeToIdMapping;

    for (let i = 0; i < timeToIdMapping.length; i++) {
      if (timeToIdMapping[i].period === interviewPeriod) {
        interviewId = timeToIdMapping[i].id;
      }
    }

    var data = {
      "inter_time": interviewId
    };

    api.TApplyStep3(data,
      {"Authorization": self.token},
      "",
      (resp) => {
        if (resp.success) {
          self.props.displaySuccessWorlds();
          api.TGetProfile("",
          {"Authorization": self.token},
          "",
          (resp) => {
            if (resp.success) {
              self.props.getProfile(resp.data);
            }
          },
          (err) => {
            self.props.networkError();
          }
          );
        } else {
          self.props.showNotification(resp.data.error);
        }
      },
      (err) => {
        self.props.networkError();
      }
    );

  }

}

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
    var result = "";
    const {stepIndex} = this.state;

    switch (stepIndex) {
      case 0:
        result = self.refs.basicInfo.handleSubmit();
        break;
      case 1:
        result = self.refs.teachingExperience.handleSubmit();
        break;
      default:
        break;
    }

    if (!!result) {
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
        return <BasicInfo showNotification={this.props.showNotification} profile={profile} setTimezoneId={this.setTimezoneId.bind(this)} ref="basicInfo" token={this.props.token}></BasicInfo>;
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

        return <TeachingExperience showNotification={this.props.showNotification} profile={profile} teachExpValue={experience} ref="teachingExperience" token={this.props.token}></TeachingExperience>;
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

  render () {

    const stepperStyle = {
      width: "100%",
      paddingLeft: 74,
      paddingRight: 74,
      marginBottom: 60
    };

    const rightButton = this.state.stepIndex !== 2 ? <RaisedButton labelStyle={{fontSize: 24}} style={{width: 176, height: 50}} primary={true} label="Next" onTouchTap={this.handleNext.bind(this)} disabled={this.state.stepIndex === 2}></RaisedButton> : <RaisedButton labelStyle={{fontSize: 24}} style={{width: 176, height: 50}} primary={true} label="Finish" onTouchTap={this.handleFinish.bind(this)}></RaisedButton>;

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
        {this.getContent(this.state.stepIndex)}
        <div className="text-center two-buttons">
          <div className="btn-group">
            <FlatButton disabled={!this.state.stepIndex} label="Back" style={{marginRight: 12}} onTouchTap={this.handlePrev.bind(this)}></FlatButton>
            {rightButton}
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
