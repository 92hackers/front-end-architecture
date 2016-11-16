import React from 'react'
import Dialog from 'material-ui/Dialog';
import { autobind } from 'core-decorators'
import { Stepper } from 'material-ui/Stepper';

export default class DisplayHelp extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      stepIndex: 0,
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleGuideImgResize)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleGuideImgResize)
  }

  @autobind
  handleWelcomeClose() {
    this.props.hideHelpBox()
    this.setState({
      stepIndex: 0,
    });
  }

  getStepContent(stepIndex) {
    const styles = {
      width: `${window.innerWidth}px`,
      height: `${window.innerHeight}px`,
    };

    switch (stepIndex) {
      case 0 :
        return <div className="step step-one" style={styles}><img style={styles} src="/images/guide-1.jpg" alt="guide img." /></div>;

      case 1 :
        return <div className="step step-two" style={styles}><img style={styles} src="/images/guide-2.jpg" alt="step two img." /></div>;

      case 2 :
        return <div className="step step-three" style={styles}><img style={styles} src="/images/guide-3.jpg" alt="step 3." /></div>;

      default :
        return <h1>Something Wrong</h1>
    }
  }

  @autobind
  handlePrev() {
    const index = this.state.stepIndex;
    if (index > 0) {
      this.setState({
        stepIndex: index - 1,
      });
    }
  }

  @autobind
  handleNext() {
    const index = this.state.stepIndex;
    if (index < 2) {
      this.setState({
        stepIndex: index + 1,
      });
    } else {
      this.handleWelcomeClose()
    }
  }

  handleGuideImgResize() {
    const elem = document.querySelector('.step');
    if (elem) {
      document.querySelector('.step').style.height = `${window.innerHeight}px`
      document.querySelector('.step').style.width = `${window.innerWidth}px`
    }
  }

  render() {
    const { open } = this.props
    const { stepIndex } = this.state
    const closeIconStyle = {
      position: 'absolute',
      right: 24,
      top: 14,
      cursor: 'pointer',
      fontSize: '50px',
      color: '#fff',
    }
    const contentStyle = {
      width: '100%',
      height: '100%',
      display: 'inline-block',
      verticalAlign: 'top',
      overflow: 'hidden',
      borderRadius: 3,
    }

    return (
      <Dialog
        modal={false}
        className="welcomeDialog"
        bodyClassName="welcomeBody"
        autoScrollBodyContent
        contentClassName="welcomeContent"
        open={open}
        onRequestClose={this.handleWelcomeClose}
        contentStyle={{ width: '100%', maxWidth: '100%', transform: 0 }}
        overlayStyle={{ backgroundColor: 'transparent' }}
        bodyStyle={{ padding: 0 }}
      >
        <i className="fa fa-times" style={closeIconStyle} onClick={this.handleWelcomeClose} />
        <Stepper activeStep={stepIndex} />
        <div
          className="back-arrow"
          onClick={this.handlePrev}
          style={stepIndex === 0 ? { display: 'none' } : { display: 'block' }}
        >
          <i className="fa fa-angle-left fa-3" />
        </div>
        <div className="step-content" style={contentStyle}>
          {this.getStepContent(stepIndex)}
        </div>
        <div
          className="next-arrow"
          onClick={this.handleNext}
        >
          {
            stepIndex === 2 ? <span className="finish-btn">End</span> : <i className="fa fa-angle-right fa-3" />
          }
        </div>
      </Dialog>
    )
  }
}
