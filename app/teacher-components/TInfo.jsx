// complete teacher info.

import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

class TInfo extends React.Component {

  constructor (props) {
    super (props);
    this.state = {
      value: 1
    };
  }

  handleChange (e, index, value) {
    this.setState({value});
  }

  handleSubmit (e) {
    //
  }

  render () {
    const style = {
      width: "100%"
    };

    return (
      <div className="t-info">
        <h1 className="t-info-caption text-center">Please complete your personal information</h1>
        <form action="/t-info" className="t-info-form">
          <SelectField value={this.state.value} onChange={this.handleChange} floatingLabelText="Select Your Country">
            <MenuItem value={1} primaryText="Australia" />
            <MenuItem value={2} primaryText="America" />
            <MenuItem value={3} primaryText="England" />
            <MenuItem value={4} primaryText="Canada" />
            <MenuItem value={5} primaryText="other countries" />
          </SelectField>
          <br/>
          <FlatButton type="submit" label="Submit" primary={true} onClick={this.handleSubmit} style={style}></FlatButton>
        </form>
      </div>
    )
  }
}

export default TInfo;
