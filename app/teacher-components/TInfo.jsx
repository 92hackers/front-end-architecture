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
      profilePictureSrc: ""
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
      nationality: countryCode,
      "residence_n": country,
      "residence_c": city,
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
    var temp = this.state.eduListItems;
    var getValue = (ele) => {
      return document.getElementById(ele).value;
    }
    var startDate = getValue("t-edu-start-date");
    var endDate = getValue("t-edu-end-date");
    var school = getValue("t-edu-school");
    var major = getValue("t-edu-major");
    var degree = getValue("t-edu-degree");
    temp.push({
      startDate: startDate,
      endDate: endDate,
      school: school,
      major: major,
      degree: degree
    });
    this.setState({
      eduListItems: temp,
      eduDialogOpen: false,
      eduList: 1
    });
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
        label="Submit"
        primary={true}
        onTouchTap={this.addEducation.bind(this)}
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
          <div id="container">
            <a id="pickfiles" href="javascript:;">[Select files]</a>
            <a id="uploadfiles" href="javascript:;" onClick={this.upload.bind(this)}>[Upload files]</a>
          </div>
          <br/>
          <FlatButton id="upload-profile-picture" label="Upload profile picture" labelPosition="before" style={{width: "100%"}}>
              <input type="file" style={uploadPictureStyle} onChange={this.profilePictureSelect.bind(this)}/>
          </FlatButton>
          <AvatarUpload ref="avatarUpload" src={this.state.profilePictureSrc}></AvatarUpload>
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
          <Table style={eduTableStyle}>
            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
              <TableRow>
                <TableHeaderColumn>Degree</TableHeaderColumn>
                <TableHeaderColumn>School</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
                {
                  this.state.eduListItems.map((item, index) => {
                    return (
                      <TableRow key={index}>
                        <TableRowColumn>{item.degree}</TableRowColumn>
                        <TableRowColumn>{item.school}</TableRowColumn>
                      </TableRow>
                    )
                  })
                }
            </TableBody>
          </Table>
          <FlatButton id="add-education" type="button" label="Add" style={style} onTouchTap={this.handleDialogOpen.bind(this)}></FlatButton>
          <Dialog title="Add your education experience." actions={actions} modal={false} open={this.state.eduDialogOpen} onRequestClose={this.handleDialogClose.bind(this)}>
            <div id="t-edu-form-wrap">
              <DatePicker id="t-edu-start-date" hintText="Start date" autoOk={true}></DatePicker>
              <DatePicker id="t-edu-end-date" hintText="End date" autoOk={true}></DatePicker>
              <TextField id="t-edu-school" type="text" floatingLabelText="School"></TextField>
              <br/>
              <TextField id="t-edu-major" type="text" floatingLabelText="Major"></TextField>
              <br/>
              <TextField id="t-edu-degree" type="text" floatingLabelText="Degree"></TextField>
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

    reqwest({
      url: "/upload-to-qiniu",
      method: "get",
      type: "json",
      headers: { "Authorization": "Bearer nNlVSA9i3eSYxCP5uf9jO72zMmfDnsF-"}
    })
    .then((resp) => {
      var token = resp.uptoken;
      self.uploader = Qiniu.uploader({
        runtimes: 'html5,flash,html4',
        browse_button : 'pickfiles', // you can pass in id...
        container: "container",
        uptoken: token,
        unique_names: true,
        domain: 'oawkdrros.bkt.clouddn.com',
        max_file_size: '100mb',
        max_retries: 3,
        chunk_size: '4mb',
        auto_start: false,
        init: {
          'FilesAdded': function(up, files) {
            plupload.each(files, function(file) {
              console.log("file added.");
            });
          },
          'BeforeUpload': function(up, file) {
            // 每个文件上传前，处理相关的事情
          },
          'UploadProgress': function(up, file) {
            // 每个文件上传时，处理相关的事情
          },
          'FileUploaded': function(up, file, info) {
            // 每个文件上传成功后，处理相关的事情
            // 其中info是文件上传成功后，服务端返回的json，形式如：
            // {
            //    "hash": "Fh8xVqod2MQ1mocfI4S4KpRL6D98",
            //    "key": "gogopher.jpg"
            //  }
            // 查看简单反馈
            // var domain = up.getOption('domain');
            // var res = parseJSON(info);
            // var sourceLink = domain + res.key; 获取上传成功后的文件的Url
          },
          'Error': function(up, err, errTip) {
            //上传出错时，处理相关的事情
          },
          'UploadComplete': function() {
            //队列文件处理完毕后，处理相关的事情
          },
          'Key': function(up, file) {
            // 若想在前端对每个文件的key进行个性化处理，可以配置该函数
            // 该配置必须要在unique_names: false，save_key: false时才生效

            var key = "Bearer nNlVSA9i3eSYxCP5uf9jO72zMmfDnsF-" + "avatar.png";
            // do something with key here
            return key
          }
        }
      });
      self.uploader.init();
      console.log(self.uploader);
    })
    .fail((err) => {
      console.log("upload error.");
    })

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
