// complete teacher info.

import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DatePicker from 'material-ui/DatePicker';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import {Typeahead} from 'react-typeahead';
import reqwest from 'reqwest';

class TInfo extends React.Component {

  constructor (props) {
    super (props);
    this.state = {
      value: null,
      clicked: false,
      countriesList: [],
      timezoneList: []
    };
  }

  handleChange (e, index, value) {
    this.setState({ clicked: true });
    this.setState({value});
  }

  handleSubmit (e) {
    //
  }

  render () {
    const style = {
      width: "100%"
    };

    const countriesList = this.state.countriesList.map((country) => {
      return country.cname;
    });

    return (
      <MuiThemeProvider>
        <div className="t-info">
          <h1 className="t-info-caption text-center">Please complete your personal information</h1>
          <form action="/t-info" className="t-info-form">
            <Typeahead options={countriesList} maxVisible={5} placeholder="Your country"></Typeahead>
            <br/>
            <DatePicker hintText="Your Birth" autoOk={true} cancelLabel="取消"></DatePicker>
            <br/>
            <br/>
            <FlatButton type="submit" label="Submit" primary={true} onClick={this.handleSubmit.bind(this)} style={style}></FlatButton>
          </form>
        </div>
      </MuiThemeProvider>
    )
  }

  componentDidMount () {
    var self = this;

    var countryRequest =  reqwest({
      url: "http://api.weteach.test/v1/loc/country",
      method: "get"
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
      method: "get"
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
