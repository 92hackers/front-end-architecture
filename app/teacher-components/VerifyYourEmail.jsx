import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import {browserHistory} from 'react-router';
import api from '../network/api';


class VerifyYourEmail extends React.Component {

  constructor (props) {
    super (props);
    this.state = {
      isSuccess: false
    };
  }

  //TODO:   here should collect url's queryParam to get active code.

  render () {

    var progressComponent = "";

    var verify = this.state.isSuccess ? "none" : "block";
    var success = this.state.isSuccess ? "block" : "none";
    console.log(verify);
    console.log(success);

    return (
      <div className="verify-your-email" style={{paddingTop: "100px", paddingBottom: "100px"}}>
        <h1 style={{display: verify}} className="text-center">Verifying <CircularProgress></CircularProgress></h1>
        <h1 style={{display: success}} className="text-center"><i className="fa fa-check-circle"></i>Account activated! please sign in to continue.</h1>
      </div>
    )
  }

  //   get active code from url.

  componentDidMount () {
    var self = this;
    var activeCode = this.props.location.query.token;
    console.log(activeCode);

    if (!!activeCode) {

      api.TEmailActivate("","",
      activeCode,
      (resp) => {
        if (resp.success) {
          self.setState({
            isSuccess: true
          });
          var timeoutId = setTimeout(() => {
            clearTimeout(timeoutId);
            browserHistory.push("/sign-in");
          }, 2000);
        } else {
          alert("Verify failed, please try again.");
        }
      },
      (err) => {
        console.log("network is busy, please try again later.");
        console.log(err);
      }
    );         // active your email.
  }
  }

}

export default VerifyYourEmail;
