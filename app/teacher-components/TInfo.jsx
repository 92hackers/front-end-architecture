// complete teacher info.

import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import DatePicker from 'material-ui/DatePicker';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import {Typeahead} from 'react-typeahead';
import reqwest from 'reqwest';
// import config from 'config';
// import apis from '../network/api';

class TInfo extends React.Component {

  constructor (props) {
    super (props);
    this.state = {
      value: null,
      cityList: [],
      countriesList: [],
      timezoneList: []
    };
  }

  handleChange (e, index, value) {
    this.setState({value});
  }

  handleSubmit (e) {
    //
  }

  addEducation (e) {
    // add education experience
  }

  completeAddition (e) {
    //
  }

  loadCityList () {
    // var cityListRequest = reqwest({
    //   url: "http://api.weteach.test/"
    // })
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

    const cityList = this.state.cityList;

    return (
      <div className="t-info">
        <h1 className="t-info-caption text-center">Please complete your personal information</h1>
        <form action="/t-info" className="t-info-form">
          <Typeahead options={countriesList} maxVisible={5} placeholder="Your Nationality"></Typeahead>
          <br/>
          <p id="gender-caption">Gender</p>
          <RadioButtonGroup name="gerder" defaultSelected="male" style={styles.RadioButtonGroup}>
            <RadioButton value="male" label="Male" style={styles.radioButton}/>
            <RadioButton value="female" label="Female" style={styles.radioButton}/>
          </RadioButtonGroup>
          <br/>
          <DatePicker hintText="Your Birth" autoOk={true}></DatePicker>
          <br/>
          <Typeahead options={countriesList} maxVisible={5} placeholder="Location country" onChange={this.loadCityList.bind(this)}></Typeahead>
          <Typeahead options={cityList} maxVisible={5} placeholder="Location city"></Typeahead>
          <br/>
          <SelectField value={this.state.value} onChange={this.handleChange.bind(this)} floatingLabelText="Teaching experience">
            <MenuItem value={1} primaryText="More than 15 years" />
            <MenuItem value={2} primaryText="Between 5 to 15 years" />
            <MenuItem value={3} primaryText="Less than 5 years" />
          </SelectField>
          <br/>
          <TextField floatingLabelText="code" style={phoneStyle.code}></TextField><TextField floatingLabelText="Phone number" style={phoneStyle.phone}></TextField>
          <br/>
          <p id="education-experience-caption">Education experience</p>
          <FlatButton id="add-education" type="button" label="Add" style={style} onClick={this.addEducation.bind(this)}></FlatButton>
          <FlatButton id="complete-addition" type="button" label="Complete" style={style} onClick={this.completeAddition.bind(this)}></FlatButton>
          <br/>
          <TextField multiLine={true} rows={5} type="textarea" floatingLabelText="Self introduction"></TextField>
          <br/>
          <TextField multiLine={true} rows={5} type="textarea" floatingLabelText="Teaching style"></TextField>
          <br/>
          <TextField multiLine={true} rows={5} type="textarea" floatingLabelText="Why you want to be a teacher?"></TextField>
          <br/>
          <TextField multiLine={true} rows={5} type="textarea" floatingLabelText="Addition"></TextField>
          <br/>
          <FlatButton type="button" label="Video interview time" style={style}></FlatButton>
          <br/>
          <FlatButton type="submit" label="Submit" primary={true} onClick={this.handleSubmit.bind(this)} style={style}></FlatButton>
        </form>
      </div>
    )
  }

  componentDidMount () {
    var self = this;

    var countryRequest =  reqwest({
      url: "http://api.weteach.test/v1/loc/country",
      method: "get",
      crossOrigin: true,
      headers: { "Authorization": "Bearer aRDcGyruD6kQ8btOanpBW5ZhynqJp9rW"}
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
      headers: { "Authorization": "Bearer aRDcGyruD6kQ8btOanpBW5ZhynqJp9rW"}
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
