import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {browserHistory} from 'react-router';

class TIndex extends React.Component {

  constructor (props) {
    super (props);
  }

  handleStart (e) {
    e.preventDefault();
    console.log("Start");
    browserHistory.push("/sign-up");
  }

  render () {
    return (
      <div className="weteach-index text-center">
        <section className="bg-img icon icon-image">
          <h1 className="title">WeTeach</h1>
          <h2 className="sub-title">Online English teaching as it should be!</h2>
          <RaisedButton label="Start" primary={true} onTouchTap={this.handleStart.bind(this)}></RaisedButton>
          <div className="arrow-down"><i className="fa fa-chevron-down"></i></div>
        </section>
        <section className="introduction section-wrap">
          <h1 className="primary-color introduction">Introduction</h1>
          <p>WeTeach connects teachers with Chinese primary school students to learn together online.</p>
          <p>Our current focus is on English reading comprehension, pronunciation and confidence building.</p>
          <p>Part of our proceeds goes to charities supporting rural education in China.</p>
        </section>
      </div>
    )
  }
}

export default TIndex;
