// complete teacher info.
import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import DatePicker from 'material-ui/DatePicker';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import Snackbar from 'material-ui/Snackbar';
import {Typeahead} from 'react-typeahead';
import AvatarUpload from '../utilities/AvatarUpload';
import TAvatar from './TAvatar';
import apis from '../network/api';
import {browserHistory} from 'react-router';
import {connect} from 'react-redux';

class TInfoClass extends React.Component {

  constructor (props) {
    super (props);
    this.state = {
      value: null,
      countriesList: [],
      regionList: [],
      cityList: [],
      timezoneList: [],
      rawTimezoneData: [],
      defaultTimezone: "",
      cityInputDisabled: true,
      regionInputDisabled: true,
      eduDialogOpen: false,
      eduList: 0,
      eduListItems: [],
      profilePictureSrc: "",
      avatarUrl: "",
      eduExpSelected: "",
      notification: "",
      notificationOpen: false,
      eduExpSelectedIndex: "",
      eduExpSelectedDialogOpen: false,
      dateValue: 0,
      availableDate: [],   // fetch available data from server.
      timeValue: 0,
      allAvailableTime: [],
      availableTime: [],
      timeToIdMapping: []
    };
  }

  handleChange (e, index, value) {
    this.setState({value});
  }

  handleSubmit (e) {

    var self = this;
    var notification = "";

    let event = e || e.event;
    if (event.preventDefault) {
      event.preventDefault();
    } else if (event.cancelBubble) {
      event.cancelBubble();
    }

    var checkedElem = document.querySelector('input[name="gender"]:checked');

    var nationality = document.getElementsByClassName("nationality")[0].value;
    var gender = checkedElem ? checkedElem.value : "";
    var avatar = this.state.avatarUrl;
    var country = document.getElementsByClassName("country")[0].value;
    var region = document.getElementsByClassName("region")[0].value;
    var city = document.getElementsByClassName("city")[0].value;
    var timezone = document.getElementsByClassName("timezone")[0].value || this.state.defaultTimezone;
    var teachExperience = document.getElementById("teach-experience").innerText.trim();
    var nationCode = document.getElementById("nation-code").value;
    var phoneNum = document.getElementById("phone-num").value;
    var eduExperienceList = this.state.eduListItems;
    var selfIntro = document.getElementById("self-intro").value;
    var teachStyle = document.getElementById("teach-style").value;
    var whyATeacher = document.getElementById("why-a-teacher").value;
    var addition = document.getElementById("addition").value;
    var interviewPeriod = document.getElementById("interview-time").innerText.trim();

    if (!nationality.length) {
        notification = "please input your nationality";
    } else if (!gender.length) {
        notification = "please select your gender";
    } else if (!avatar.length) {
        notification = "please upload your profile picture";
    } else if (!country.length) {
        notification = "please input to select your location country";
    } else if (!region.length) {
        notification = "please input to select your location region";
    } else if (!city.length) {
        notification = "please input to select your location city";
    } else if (!teachExperience.length) {
        notification = "please select your teaching experience";
    } else if (!nationCode.length) {
        notification = "please input your country code, so we can contact you.";
    } else if (!phoneNum.length) {
        notification = "please input your phone number, so we can contact you.";
    } else if (!eduExperienceList.length) {
        notification = "please add at least one education experience.";
    } else if (!selfIntro.length) {
        notification = "please input your self introduction.";
    } else if (!teachStyle.length) {
        notification = "please input your teaching style.";
    } else if (!whyATeacher.length) {
        notification = "please input your reason to be a teacher";
    }

    var timezoneData = this.state.rawTimezoneData;
    var timezoneId = "";

    for (let i = 0; i < timezoneData.length; i++) {
        if (timezoneData[i]["en_name"] === timezone) {
            timezoneId = timezoneData[i].id;
            break;
        }
    }

    if (!!notification.length) {
        this.setState({
            notification: notification
        }, () => {
            this.handleNotificationOpen();
        });
        return ;
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

    var countryCode = "";
    var locationCountryId = "";
    var countryList = this.state.countriesList;

    for (let i = 0; i < countryList.length; i++) {
      if (countryList[i].name === nationality) {
        countryCode = countryList[i].id;
        break;
      }
    }

    for (let i = 0; i < countryList.length; i++) {
        if (countryList[i].name === country) {
            locationCountryId = countryList[i].id;
            break;
        }
    }

    var regionId = "";
    var regionList = this.state.regionList;

    for (let i = 0; i < regionList.length; i++) {
        if (regionList[i].name === region) {
            regionId = regionList[i].id;
            break;
        }
    }

    var cityId = "";
    var cityList = this.state.cityList;

    for (let i = 0; i < cityList.length; i++) {
        if (cityList[i].name === city) {
            cityId = cityList[i].id;
            break;
        }
    }

    var interviewId = "";
    var timeToIdMapping = this.state.timeToIdMapping;

    for (let i = 0; i < timeToIdMapping.length; i++) {
      if (timeToIdMapping[i].period === interviewPeriod) {
        interviewId = timeToIdMapping[i].id;
      }
    }

    var data = {
      gender: gender === "male" ? 1 : 0,
      avatar: avatar,
      nationality: countryCode,
      "residence_n": locationCountryId,
      "residence_p": regionId,
      "residence_c": cityId,               //  city id.
      "timezone": timezoneId,            //  timezone id.
      eduexp: eduExperienceList,
      "experience": experience,
      "tel_code": nationCode,
      "tel_num": phoneNum,
      intro: selfIntro,
      style: teachStyle,
      whyteach: whyATeacher,
      additional: addition,
      "inter_time": interviewId         // interview id.
    };

    console.log(data);

    var postInfoRequest = apis.TUpdateProfile(data,
        { "Authorization": self.props.token},
        "",
        (resp) => {
            if (resp.success) {
                console.log(resp);
                browserHistory.push("/teacher-homepage");
            } else {
                console.log(resp);
                alert("data post error, try again later.");
            }
        },
        (err) => {
            console.log(err);
            alert("network error, try agarin later.");
        }
    );

    /*
     var postInfoRequest = reqwest({
     url: "http://api.weteach.test/v1/user/profile",
     method: "post",
     data: data,
     crossOrigin: true,
     })
     .then((resp) => {
     if (resp.success) {
     console.log(resp);
     } else {
     console.log("data post error.");
     console.log(resp);
     }
     })
     .fail((err) => {
     console.log("data post error.");
     console.log(err);
     })
     */
  }

  addEducation (e) {
    e.preventDefault();
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
        this.setState({
            notification: "please complete all fields."
        }, () => {
            this.handleNotificationOpen();
        });
    }
  }

  loadCityList (e) {
      var self = this;
      var region = document.getElementsByClassName("region")[0].value;
      var regionId = "";
      var regionList = self.state.regionList;

      for (let i = 0; i < regionList.length; i++) {
          if (regionList[i].name === region) {
              regionId = regionList[i].id;
              break;
          }
      }

      self.cityListRequest = apis.TCityList("",
          { "Authorization": self.props.token},
          regionId,
          (resp) => {
              if (resp.success) {
                  console.log(resp);
                  self.setState({
                      cityList: resp.data,
                      cityInputDisabled: false
                  });
              } else {
                  console.log("data fetching error.");
              }
          },
          (err) => {
              console.log("data fetching error.");
          }
      )
  }

  loadRegionList (e) {
    var self = this;
    var country = document.getElementsByClassName("country")[0].value;
    var countryCode = "";
    var countryList = self.state.countriesList;
    for (let i = 0; i < countryList.length; i++) {
      if (countryList[i].name === country) {
        countryCode = countryList[i].id;
        break;
      }
    }
    var regionListRequest = apis.TRegionList("",
        { "Authorization": self.props.token},
        countryCode,
        (resp) => {
            if (resp.success) {
                console.log(resp.data);
                self.setState({
                    regionList: resp.data,
                    regionInputDisabled: false
                });
            } else {
                console.log("data fetching error.");
            }
        },
        (err) => {
            console.log("region data request error.");
        }
    );

    /*
     var cityListRequest = reqwest({
     url: "http://api.weteach.test/v1/loc/city/" + countryCode,
     method: "get",
     crossOrigin: true,
     })
     .then((resp) => {
     if (resp.success) {
     console.log(resp.data);
     self.setState({
     cityList: resp.data,
     cityInputDisabled: false
     });
     }
     })
     .fail((err) => {
     console.log("data request error.");
     })
     */
  }

  handleDialogOpen (e) {
    this.setState({
      eduDialogOpen: true
    });
  }

  handleUpdateDiaOpen (e) {
    this.setState({
      eduExpSelectedDialogOpen: true
    });
  }

  handleUpdateDiaClose (e) {
    this.setState({
      eduExpSelectedDialogOpen: false
    });
  }

  handleDialogClose (e) {
    this.setState({
      eduDialogOpen: false
    });
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
        this.refs.avatarUpload.handleOpen();        //  open the dialog.
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

  handleEduUpdate (e) {
    e.preventDefault();
    this.handleUpdateDiaClose();

    var tmp = this.state.eduListItems;
    var updateIndex = this.state.eduExpSelectedIndex;

    var getValue = (ele) => {
      return document.getElementById(ele).value;
    };

    var startYear = getValue("t-edu-start-year-m");
    var endYear = getValue("t-edu-end-year-m");
    var school = getValue("t-edu-school-m");
    var major = getValue("t-edu-major-m");
    var degree = getValue("t-edu-degree-m");

    var data = {
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

  }

  componentWillMount () {

    // if (!this.props.token) {
    //   browserHistory.push("/sign-in");
    // }

  }

  render () {

    const countriesList = this.state.countriesList.map((country) => {
      return country.name;
    });

    const cityList = this.state.cityList.map((city) => {
      return city.name;
    });

    const regionList = this.state.regionList.map((region) => {
        return region.name;
    });

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

    const phoneStyle = {
      code: {
        width: 50
      },
      phone: {
        width: 180,
        "marginLeft": 26
      }
    };


    const actions = [
      <FlatButton
        label="Cancel"
        default={true}
        onTouchTap={this.handleDialogClose.bind(this)}
      />,
      <FlatButton
        id="submitEdu"
        label="Add"
        primary={true}
        onTouchTap={this.addEducation.bind(this)}
      />
    ];

    const updateActions = [
      <FlatButton
        label="Delete"
        default={true}
        onTouchTap={this.handleEduExpDel.bind(this)}
        style={{ float: "left" }}
      />,
      <FlatButton
        label="Cancel"
        default={true}
        onTouchTap={this.handleUpdateDiaClose.bind(this)}
      />,
      <FlatButton
        id="submitEdu"
        label="Update"
        primary={true}
        onTouchTap={this.handleEduUpdate.bind(this)}
      />
    ];

    const menuItemStyle = { cursor: "pointer" };

    const eduTableStyle = {
      display: this.state.eduList ? "table" : "none"
    };

    const uploadPictureStyle = {
      cursor: 'pointer',
      position: 'absolute',
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
      width: '100%',
      opacity: 0
    };

    return (
      <div className="t-info">
        <h1 className="t-info-caption text-center">Please complete your personal information</h1>
        <form className="t-info-form">
          <Typeahead options={countriesList} maxVisible={5} placeholder="Your Nationality" customClasses={{input: "nationality"}}></Typeahead>
          <br/>
          <p id="gender-caption">Gender</p>
          <RadioButtonGroup name="gender" style={styles.RadioButtonGroup}>
            <RadioButton value="male" label="Male" style={styles.radioButton}/>
            <RadioButton value="female" label="Female" style={styles.radioButton}/>
          </RadioButtonGroup>
          <br/>
          <TAvatar avatarUrl={this.state.avatarUrl}></TAvatar>
          <br/>
          <FlatButton id="upload-profile-picture" label="Upload profile picture" labelPosition="before" style={{width: "100%"}}>
            <input type="file" style={uploadPictureStyle} onChange={this.profilePictureSelect.bind(this)}/>
          </FlatButton>
          <AvatarUpload ref="avatarUpload" src={this.state.profilePictureSrc} setAvatarUrl={this.setAvatarUrl.bind(this)}></AvatarUpload>
          <br/>
          <Typeahead options={countriesList} maxVisible={5} placeholder="Location country" onOptionSelected={this.loadRegionList.bind(this)} customClasses={{input: "country"}}></Typeahead>
          <Typeahead options={regionList} maxVisible={5} placeholder="Location region" disabled={this.state.regionInputDisabled} onOptionSelected={this.loadCityList.bind(this)} customClasses={{input: "region"}}></Typeahead>
          <Typeahead options={cityList} maxVisible={5} placeholder="Location city" disabled={this.state.cityInputDisabled} customClasses={{input: "city"}}></Typeahead>
          <Typeahead options={this.state.timezoneList} maxVisible={5} placeholder={this.state.defaultTimezone} onOptionSelected={this.changeTimezone.bind(this)} customClasses={{input: "timezone"}}></Typeahead>
          <br/>
          <SelectField id="teach-experience" value={this.state.value} onChange={this.handleChange.bind(this)} floatingLabelText="Teaching experience">
            <MenuItem style={menuItemStyle} value={1} primaryText="More than 15 years" />
            <MenuItem style={menuItemStyle} value={2} primaryText="Between 5 to 15 years" />
            <MenuItem style={menuItemStyle} value={3} primaryText="Less than 5 years" />
          </SelectField>
          <br/>
          <TextField id="nation-code" floatingLabelText="code" style={phoneStyle.code}></TextField><TextField id="phone-num" floatingLabelText="Phone number" style={phoneStyle.phone}></TextField>
          <br/>
          <p id="education-experience-caption">Education experience</p>
          <Table style={eduTableStyle} onRowSelection={this.showFullDetail.bind(this)}>
            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
              <TableRow>
                <TableHeaderColumn>Degree</TableHeaderColumn>
                <TableHeaderColumn>School</TableHeaderColumn>
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
          <FlatButton id="add-education" type="button" label="Add" style={{width: "100%"}} onTouchTap={this.handleDialogOpen.bind(this)}></FlatButton>
          <Dialog title="Add your education experience" actions={actions} modal={false} open={this.state.eduDialogOpen} onRequestClose={this.handleDialogClose.bind(this)}>
            <div className="t-edu-form-wrap">
              <TextField id="t-edu-start-year" floatingLabelText="Start Year"></TextField>
              <br/>
              <TextField id="t-edu-end-year" floatingLabelText="End Year"></TextField>
              <br/>
              <TextField id="t-edu-school" type="text" floatingLabelText="School"></TextField>
              <br/>
              <TextField id="t-edu-major" type="text" floatingLabelText="Major"></TextField>
              <br/>
              <TextField id="t-edu-degree" type="text" floatingLabelText="Degree"></TextField>
            </div>
          </Dialog>
          <Dialog title="Modify your education experience" actions={updateActions} modal={false} open={this.state.eduExpSelectedDialogOpen} onRequestClose={this.handleUpdateDiaClose.bind(this)}>
            <div className="t-edu-form-wrap">
              <TextField id="t-edu-start-year-m" defaultValue={this.state.eduExpSelected.timefrom} floatingLabelText="Start Year"></TextField>
              <br/>
              <TextField id="t-edu-end-year-m" defaultValue={this.state.eduExpSelected.timeto} floatingLabelText="End Year"></TextField>
              <br/>
              <TextField id="t-edu-school-m" defaultValue={this.state.eduExpSelected.institution} type="text" floatingLabelText="School"></TextField>
              <br/>
              <TextField id="t-edu-major-m" defaultValue={this.state.eduExpSelected.major} type="text" floatingLabelText="Major"></TextField>
              <br/>
              <TextField id="t-edu-degree-m" defaultValue={this.state.eduExpSelected.degree} type="text" floatingLabelText="Degree"></TextField>
            </div>
          </Dialog>
          <br/>
          <TextField id="self-intro" multiLine={true} rows={5} type="textarea" floatingLabelText="Self introduction"></TextField>
          <br/>
          <TextField id="teach-style" multiLine={true} rows={5} type="textarea" floatingLabelText="Teaching style"></TextField>
          <br/>
          <TextField id="why-a-teacher" multiLine={true} rows={5} type="textarea" floatingLabelText="Why you want to be a teacher?"></TextField>
          <br/>
          <TextField id="addition" multiLine={true} rows={5} type="textarea" floatingLabelText="Addition"></TextField>
          <br/>
          <br/>
          <br/>
          <p className="book-the-view" style={{color: "#ccc"}}>Booking the online Interview</p>
          <br/>
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
          <br/>
          <br/>
          <br/>
          <FlatButton type="submit" label="Submit" primary={true} onClick={this.handleSubmit.bind(this)} style={{width: "100%"}}></FlatButton>
        </form>
        <Snackbar
          open={this.state.notificationOpen}
          message={this.state.notification}
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose.bind(this)}
        />
      </div>
    )
  }

  changeTimezone (value) {
    var regExpTimezone = value.replace("+", "\\+").replace("(", "\\(").replace(")", "\\)");
    this.fetchInterviewData(regExpTimezone);
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

  handleRequestClose () {
      this.setState({
          notificationOpen: false
      });
  }

  handleNotificationOpen () {
      this.setState({
          notificationOpen: true
      });
  }

  componentDidMount () {
    var self = this;

    // if (!this.props.token) {
    //   return;
    // }

    self.countryRequest = apis.TCountryList("",
        { "Authorization": self.props.token},
        "",
        (resp) => {
            if (resp.success) {
                console.log(resp);
                self.setState({
                    countriesList: resp.data
                });
            }
        },
        (err) => {
            console.log("data fetching error.");
        }
    );

    self.timezoneRequest = apis.TTimezone("",
        { "Authorization": self.props.token},
        "",
        (resp) => {
            console.log(resp);
            if (resp.success) {
                var defaultTimezone = "";
                var timezoneListData = resp.data;

                var timezoneList = timezoneListData.map((timezone) => {
                    return timezone["en_name"];
                });

                var localDate = new Date();
                var localTimezone = localDate.toString().match(/GMT[+-]\d{2}/)[0];
                var regExpTimezone = localTimezone.replace("+", "\\+");
                // var defaultTimezoneId = "";

                for (let i = 0; i < timezoneList.length; i++) {
                  if (timezoneList[i].search(new RegExp(regExpTimezone)) !== -1) {
                    defaultTimezone = timezoneList[i];
                    break;
                  }
                }


                // var interviewDateTimeRequest = apis.TInterview("",
                //   { "Authorization": "Bearer nNlVSA9i3eSYxCP5uf9jO72zMmfDnsF-"},
                //   defaultTimezoneId,
                //   (resp) => {
                //     if (resp.success) {
                //       console.log(resp.data);
                //       var data = resp.data;
                //       var interviewTime = data["timetable"].map((date, index) => {
                //         return {
                //           date: date["inter_date"],
                //           timeList: date["inter_time"].map((time,index) => {
                //             return {
                //               id: time.id,
                //               period: time.period
                //             };
                //           })
                //         };
                //       });
                //       var date = [];
                //       var time = [];
                //       var timeToIdMapping = [];
                //       for (let i = 0; i < interviewTime.length; i++) {
                //         date.push(interviewTime[i].date);
                //         time.push(interviewTime[i].timeList);
                //       }
                //
                //       for (let j = 0; j < time.length; j++) {
                //         for (let k = 0; k < time[j].length; k++) {
                //           timeToIdMapping.push({
                //             id: time[j][k].id,
                //             period: time[j][k].period
                //           });
                //         }
                //       }
                //
                //       self.setState({
                //         availableDate: date,
                //         allAvailableTime: time,
                //         timeToIdMapping: timeToIdMapping,
                //         availableTime: time[0]
                //       });
                //     } else {
                //       console.log("fetch interview time data error.");
                //     }
                //   },
                //   (err) => {
                //     console.log("interview request error.");
                //     console.log(err);
                //   }
                // )

                self.setState({
                    rawTimezoneData: timezoneListData,
                    timezoneList: timezoneList,
                    defaultTimezone: defaultTimezone
                });
                self.fetchInterviewData(regExpTimezone);
            }
        },
        (err) => {
            console.log("err");
            console.log("timezone data request error.");
        }
    )
  }

  fetchInterviewData (timezoneStr) {
    var self = this;
    var timezoneListData = this.state.rawTimezoneData;
    var defaultTimezoneId = "";

    console.log(new RegExp(timezoneStr));
    for (let j = 0; j < timezoneListData.length; j++) {
      if (timezoneListData[j]["en_name"].search(new RegExp(timezoneStr)) !== -1) {
        defaultTimezoneId = timezoneListData[j].id;
        break;
      }
    }

    this.interviewDateTimeRequest = apis.TInterview("",
    { "Authorization": self.props.token },
    defaultTimezoneId,
    (resp) => {
      if (resp.success) {
        console.log(resp.data);
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
          availableDate: date,
          allAvailableTime: time,
          timeToIdMapping: timeToIdMapping,
          availableTime: time[0]
        });
      } else {
        console.log("fetch interview time data error.");
      }
    },
    (err) => {
      console.log("interview request error.");
      console.log(err);
    }
  )

}

  componentWillUnmount () {
    // console.log(this.countryRequest.request);
    // this.countryRequest.request.abort();
    // this.timezoneRequest.request.abort();
    // this.cityListRequest.request.abort();
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.addToken.token
  }
}

const TInfo = connect(
  mapStateToProps
)(TInfoClass);

export default TInfo;
