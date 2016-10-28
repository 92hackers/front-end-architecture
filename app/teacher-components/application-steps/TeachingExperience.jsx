import React from 'react'

class TeachingExperience extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      notification: '',
      profile: this.props.profile || {},
      oldProfile: {},
      teachExpValue: this.props.teachExpValue || null,
    };
    this.token = this.props.token;
  }

  setProfile(profile) {
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

      this.props.displayLoader();

      api.TApplyStep2(data,
        {"Authorization": self.token},
        "",
        (resp) => {
          if (resp.success) {
            self.props.displaySuccess();
          } else {
            self.props.displayError();
          }
        },
        (err) => {
          self.props.displayError();
        }
      );

    } else {
      this.props.stepToNext()
    }
  }
}

export default TeachingExperience
