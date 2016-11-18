import { connect } from 'react-redux';
import { notificationActions, userActions, onlineTestActions } from '../actions';
import { default as Comp } from '../components/online-test/OnlineTest';

const mapStateToProps = state => ({
  pendingCounter: state.pendingCounter,
  examon: state.user.profile.examon,
  questions: state.onlineTest.questions,
})

const mapDispatchToProps = dispatch => ({
  getProfile: () => dispatch(userActions.getProfile()),
  getTestQuestions: step => dispatch(onlineTestActions.getTestQuestions(step)),
  clearTestQuestions: () => dispatch(onlineTestActions.clearTestQuestions()),
  checkAnswer: (step, data) => dispatch(onlineTestActions.checkAnswer(step, data)),
  showNotification: message => dispatch(notificationActions.showNotification(message)),
  networkError: () => dispatch(notificationActions.networkError()),
})

const OnlineTest = connect(mapStateToProps, mapDispatchToProps)(Comp);

export default OnlineTest;
