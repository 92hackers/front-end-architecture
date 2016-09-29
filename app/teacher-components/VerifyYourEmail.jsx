import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import {browserHistory} from 'react-router';
import api from '../network/api';

class VerifyYourEmailComp extends React.Component {

  constructor (props) {
    super (props);
    this.state = {
      isSuccess: false,
    };
  }

  render () {

    var progressComponent = "";

    var verify = this.state.isSuccess ? "none" : "block";
    var success = this.state.isSuccess ? "block" : "none";

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
          self.props.showNotification("Verify Failed, Please Try Again Later");
        }
      },
      (err) => {
        self.props.networkError();
      }
    );
  }
  }
}

export default VerifyYourEmailComp;
