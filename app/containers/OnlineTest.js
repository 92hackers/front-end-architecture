import { connect } from 'react-redux';
import { notificationActions, apiActions } from '../actions';
import OnlineTestComp from '../teacher-components/online-test/OnlineTestComp';

const mapStateToProps = state => ({
  pendingCounter: state.pendingCounter,
  examon: state.user.profile.examon,
  questions: state.onlineTest.questions,
})

const mapDispatchToProps = dispatch => ({
  getProfile: () => dispatch(apiActions.getProfile()),
  getTestQuestions: step => dispatch(apiActions.getTestQuestions(step)),
  clearTestQuestions: () => dispatch(apiActions.clearTestQuestions()),
  checkAnswer: (step, data) => dispatch(apiActions.checkAnswer(step, data)),
  showNotification: message => dispatch(notificationActions.showNotification(message)),
})

const OnlineTest = connect(mapStateToProps, mapDispatchToProps)(OnlineTestComp);

export default OnlineTest;
