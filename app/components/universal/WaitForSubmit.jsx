// just a small loading component appears when user click submit, ot Next to submit data.

//  NOTE: to use the component, you must give your submit button a className: "submit-btn"
//   then you will have set ref to this component.

// props:
    // 2, successMessage,
    // 3, failMessage,
    // 4, style       //  optional   style.

    // show  loader :     this.refs.loader.displayLoader
    // hide  loader :     this.refs.loader.hideLoader

import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import { red500, green500 } from 'material-ui/styles/colors';

class WaitForSubmit extends React.Component {

  hideSubmitBtn() {
    document.querySelector('.submit-btn').className += ' hide';
  }

  showSubmitBtn() {
    const submitBtn = document.querySelector('.submit-btn');
    const submitClass = submitBtn.className;
    submitBtn.className = submitClass.replace(/\shide/, '');
  }

  noLoader() {
    const loader = document.querySelector('.wait-for-submit');
    const loaderClass = loader.className;
    loader.className = loaderClass.replace(/\sshow-inline/, '');
  }

  showLoader() {
    document.querySelector('.wait-for-submit').className += ' show-inline';
  }

  displayLoader() {
    this.hideSubmitBtn();
    this.showLoader();
  }

  hideLoader() {
    this.showSubmitBtn();
    this.noLoader();
  }

  displayResult(elem, callback, context) {
    const circleProgress = document.querySelector('.circle-progress');
    const circleProgressClass = circleProgress.className;
    circleProgress.className += ' hide';
    const resultElem = elem;
    const elemClass = resultElem.className;
    resultElem.className += ' show-inline';
    const timeId = setTimeout(() => {
      clearTimeout(timeId);
      resultElem.className = elemClass.replace(/\sshow-inline/, '');
      this.hideLoader();
      this.showSubmitBtn();
      circleProgress.className = circleProgressClass.replace(/\shide/, '');
      if (typeof callback === 'function') {
        callback.call(context);
      }
    }, 2000);
  }

  displaySuccess(callback, context) {
    const successWords = document.querySelector('.success');
    this.displayResult(successWords, callback, context);
  }

  displayError(callback, context) {
    const failWords = document.querySelector('.fail');
    this.displayResult(failWords, callback, context);
  }

  render() {
    const loadingStyle = {
      marginTop: -7,
    };

    const { successMessage, failMessage, style } = this.props;

    return (
      <div className="wait-for-submit-wrap text-center">
        <div className="wait-for-submit" style={style}>
          <CircularProgress className="circle-progress" size={30} style={loadingStyle} />
          <span className="result success" style={{ color: green500 }}><i className="fa fa-check" />{successMessage}</span>
          <span className="result fail" style={{ color: red500 }}><i className="fa fa-close" />{failMessage}</span>
        </div>
      </div>
    )
  }

}

export default WaitForSubmit;
