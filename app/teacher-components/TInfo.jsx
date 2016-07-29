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
import {Typeahead} from 'react-typeahead';
import reqwest from 'reqwest';
import AvatarUpload from '../utilities/AvatarUpload';
import TAvatar from './TAvatar';
// import config from 'config';
// import apis from '../network/api';

class TInfo extends React.Component {

  constructor (props) {
    super (props);
    this.state = {
      value: null,
      cityList: [],
      countriesList: [],
      timezoneList: [],
      cityInputDisabled: true,
      eduDialogOpen: false,
      eduList: 0,
      eduListItems: [],
      profilePictureSrc: "",
      avatarUrl: "",
      eduExpSelected: "",
      eduExpSelectedIndex: "",
      eduExpSelectedDialogOpen: false
    };
  }

  handleChange (e, index, value) {
    this.setState({value});
  }

  handleSubmit (e) {

    let event = e || e.event;
    if (event.preventDefault) {
      event.preventDefault();
    } else if (event.cancelBubble) {
      event.cancelBubble();
    }

    var nationality = document.getElementsByClassName("nationality")[0].value;
    var gender = document.querySelector('input[name="gender"]:checked').value;
    var avatar = this.state.avatarUrl;
    var country = document.getElementsByClassName("country")[0].value;
    var city = document.getElementsByClassName("city")[0].value;
    var teachExperience = document.getElementById("teach-experience").innerText.trim();
    var nationCode = document.getElementById("nation-code").value;
    var phoneNum = document.getElementById("phone-num").value;
    var eduExperienceList = this.state.eduListItems;
    var selfIntro = document.getElementById("self-intro").value;
    var teachStyle = document.getElementById("teach-style").value;
    var whyATeacher = document.getElementById("why-a-teacher").value;
    var addition = document.getElementById("addition").value;

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
    var countryList = this.state.countriesList;

    for (let i = 0; i < countryList.length; i++) {
      if (countryList[i].cname === nationality) {
        countryCode = countryList[i].id;
        break;
      }
    }

    var data = {
      gender: gender === "male" ? 1 : 0,
      avatar: avatar,
      nationality: countryCode,
      "residence_n": country,
      "residence_c": city,
      eduexp: eduExperienceList,
      "experience": experience,
      "tel_code": nationCode,
      "tel_num": phoneNum,
      intro: selfIntro,
      style: teachStyle,
      whyteach: whyATeacher,
      additional: addition
    };

    console.log(data);

    var postInfoRequest = reqwest({
      url: "http://api.weteach.test/v1/user/profile",
      method: "post",
      data: data,
      crossOrigin: true,
      headers: { "Authorization": "Bearer nNlVSA9i3eSYxCP5uf9jO72zMmfDnsF-"}
    })
    .then((resp) => {
      console.log(resp);
    })
    .fail((err) => {
      console.log(err);
    })
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
      //  notification.
      alert("please complete all fields.");
    }
  }

  loadCityList (e) {
    var self = this;
    var country = document.getElementsByClassName("country")[0].value;
    var countryCode = "";
    var countryList = self.state.countriesList;
    for (let i = 0; i < countryList.length; i++) {
      if (countryList[i].cname === country) {
        countryCode = countryList[i].id;
        break;
      }
    }
    console.log(countryCode);
    var cityListRequest = reqwest({
      url: "http://api.weteach.test/v1/loc/city/" + countryCode,
      method: "get",
      crossOrigin: true,
      headers: { "Authorization": "Bearer nNlVSA9i3eSYxCP5uf9jO72zMmfDnsF-"}
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
      console.log(e.dataTransfer);
      files = e.dataTransfer.files;
    } else if (e.target) {
      console.log(e.target);
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

  render () {
    const style = {
      width: "100%"
    };

    const countriesList = this.state.countriesList.map((country) => {
      return country.cname;
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

    const cityList = this.state.cityList.map((city) => {
      return city["en_name"];
    });

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

    const nationality = { input: "nationality" };

    const country = { input: "country" };

    const city = { input: "city" };

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
        <form action="/t-info" className="t-info-form">
          <Typeahead options={countriesList} maxVisible={5} placeholder="Your Nationality" customClasses={nationality}></Typeahead>
          <br/>
          <p id="gender-caption">Gender</p>
          <RadioButtonGroup name="gender" defaultSelected="male" style={styles.RadioButtonGroup}>
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
          <Typeahead options={countriesList} maxVisible={5} placeholder="Location country" onOptionSelected={this.loadCityList.bind(this)} customClasses={country}></Typeahead>
          <Typeahead options={cityList} maxVisible={5} placeholder="Location city" disabled={this.state.cityInputDisabled} customClasses={city}></Typeahead>
          <br/>
          <SelectField id="teach-experience" value={this.state.value} onChange={this.handleChange.bind(this)} floatingLabelText="Teaching experience">
            <MenuItem value={1} primaryText="More than 15 years" />
            <MenuItem value={2} primaryText="Between 5 to 15 years" />
            <MenuItem value={3} primaryText="Less than 5 years" />
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
          <FlatButton id="add-education" type="button" label="Add" style={style} onTouchTap={this.handleDialogOpen.bind(this)}></FlatButton>
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
          <FlatButton type="button" label="Video interview time" style={style}></FlatButton>
          <br/>
          <br/>
          <br/>
          <FlatButton type="submit" label="Submit" primary={true} onClick={this.handleSubmit.bind(this)} style={style}></FlatButton>
        </form>
      </div>
    )
  }

  upload (e) {
    this.uploader.start();
    console.log("started.");
  }

  componentDidMount () {
    var self = this;

    var countryRequest =  reqwest({
      url: "http://api.weteach.test/v1/loc/country",
      method: "get",
      crossOrigin: true,
      headers: { "Authorization": "Bearer nNlVSA9i3eSYxCP5uf9jO72zMmfDnsF-"}
    })
    .then((resp) => {
      console.log(resp);
      if (resp.success) {
        self.setState({
          countriesList: resp.data
        });
      }
    })
    .fail((err,msg) => {
      console.log(err);
      console.log("数据请求错误");
    });

    console.log(countryRequest);

    var timezoneRequest = reqwest({
      url: "http://api.weteach.test/v1/loc/timezone",
      method: "get",
      crossOrigin: true,
      headers: { "Authorization": "Bearer nNlVSA9i3eSYxCP5uf9jO72zMmfDnsF-"}
    })
    .then((resp) => {
      console.log(resp);
      if (resp.success) {
        self.setState({
          timezoneList: resp.data
        });
      }
    })
    .fail((err, msg) => {
      console.log(err);
      console.log("timezone data request error.");
    });
  }

  componentWillUnmount () {
    countryRequest.abort();
    timezoneRequest.abort();
  }

  // cityList  data  request.
}

export default TInfo;
