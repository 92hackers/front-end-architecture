// just a small loading component appears when user click submit, ot Next to submit data.

//  NOTE: to use the component, you must give your submit button a className: "submit-btn"
//   then you will have set ref to this component.

// props:
    // 2, successMessage,
    // 3, failMessage

import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import {red500} from 'material-ui/styles/colors';
import {green500} from 'material-ui/styles/colors';

class WaitForSubmit extends React.Component {
  constructor (props) {
    super (props);
  }

  render () {
    var loadingStyle = {
      marginTop: -7
    };
    return (
      <div className="wait-for-submit-wrap text-center">
        <div className="wait-for-submit">
          <CircularProgress className="circle-progress" size={0.5} style={loadingStyle}></CircularProgress>
          <span className="result success" style={{color: green500}}><i className="fa fa-check"></i>{this.props.successMessage}</span>
          <span className="result fail" style={{color: red500}}><i className="fa fa-close"></i>{this.props.failMessage}</span>
        </div>
      </div>
    )
  }

  hideSubmitBtn () {
    document.querySelector(".submit-btn").className += " hide";
  }

  showSubmitBtn () {
    var submitBtn = document.querySelector(".submit-btn");
    var submitClass = submitBtn.className;
    submitBtn.className = submitClass.replace(/\shide/, "");
  }

  noLoader () {
    var loader = document.querySelector(".wait-for-submit");
    var loaderClass = loader.className;
    loader.className = loaderClass.replace(/\sshow-inline/, "");
  }

  showLoader () {
    document.querySelector(".wait-for-submit").className += " show-inline";
  }

  displayLoader () {
    this.hideSubmitBtn();
    this.showLoader();
  }

  hideLoader () {
    this.showSubmitBtn();
    this.noLoader();
  }

  displayResult (elem, callback, context) {
    var circleProgress = document.querySelector(".circle-progress");
    var circleProgressClass = circleProgress.className;
    circleProgress.className += " hide";
    var resultElem = elem;
    var elemClass = resultElem.className;
    resultElem.className += " show-inline";
    var timeId = setTimeout (() => {
      clearTimeout(timeId);
      resultElem.className = elemClass.replace(/\sshow-inline/, "");
      this.hideLoader();
      this.showSubmitBtn();
      circleProgress.className = circleProgressClass.replace(/\shide/, "");
      if (typeof callback === "function") {
        callback.call(context);
      }
    }, 2000);
  }

  displaySuccess (callback, context) {
    var successWords = document.querySelector(".success");
    this.displayResult(successWords, callback, context);
  }

  displayError (callback, context) {
    var failWords = document.querySelector(".fail");
    this.displayResult(failWords, callback, context);
  }

}

export default WaitForSubmit;
