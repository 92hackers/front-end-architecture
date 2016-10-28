import React from 'react'

class BasicInfo extends React.Component {

  componentWillMount () {
    if (!this.token) {
      browserHistory.push("/sign-in");
    } else {
      this.setProfile(this.state.profile);
    }
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
      this.props.showNotification("Please complete all required details.");
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
                  <div className="country-code-wrap">
                    <span className="plus-icon">+</span><TextField floatingLabelStyle={labelStyle} value={profile["tel_code"] ? profile["tel_code"] : ""} name="tel_code" floatingLabelText="Country Code" style={{width: 130, marginRight: 20}} onChange={this.handleValueChange.bind(this)}></TextField>
                  </div>
                  <i className="vertical-line"></i>
                  <TextField floatingLabelStyle={labelStyle} value={profile["tel_num"] ? profile["tel_num"] : ""} name="tel_num" floatingLabelText="Phone Number" style={{width: 130, marginLeft: 20}} onChange={this.handleValueChange.bind(this)}></TextField>
                </div>
              </li>
            </ul>
          </div>
          <div className="picture text-center">
            <div className="avatar">
              <TAvatar avatarUrl={this.state.avatarUrl}></TAvatar>
            </div>
            <br/>
            <a href="#" className="btn button-change-avatar">
              <i className="fa fa-camera" style={{fontSize: 20, color: "#fff"}}></i>
              <label htmlFor="upload-profile-picture">
                Upload profile picture
                <input type="file" id="upload-profile-picture" onChange={this.profilePictureSelect.bind(this)}/>
              </label>
            </a>
            <AvatarUpload ref="avatarUpload" src={this.state.profilePictureSrc} setAvatarUrl={this.setAvatarUrl.bind(this)}></AvatarUpload>
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
            <p className="tooltip">This is the local time on your device. Is this timezone correct ?</p>
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
      this.props.displayLoader();

      api.TApplyStep1(data,
        {"Authorization": self.token},
        "",
        (resp) => {
          if (resp.success) {
            this.props.displaySuccess();
          } else {
            this.props.displayError();
          }
        },
        (err) => {
          this.props.displayError();
        }
      );
    } else {
      this.props.stepToNext();
    }
  }
}

export default BasicInfo
