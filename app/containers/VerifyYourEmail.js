import { connect } from 'react-redux';
import { notificationActions, userActions, pendingCounterActions } from '../actions';
import VerifyYourEmailComp from '../teacher-components/VerifyYourEmail';

const mapStateToProps = (state) => {
  const { user } = state
  const { token, loggedIn } = user
  return {
    token,
    loggedIn,
  }
};

const mapDispatchToProps = dispatch => ({
  getProfile: profile => dispatch(userActions.getProfile(profile)),
  increaseCounter: () => dispatch(pendingCounterActions.increaseCounter()),
  decreaseCounter: () => dispatch(pendingCounterActions.decreaseCounter()),
  showNotification: message => dispatch(notificationActions.showNotification(message)),
  networkError: () => dispatch(notificationActions.networkError()),
})

const VerifyYourEmail = connect(mapStateToProps, mapDispatchToProps)(VerifyYourEmailComp);

export default VerifyYourEmail;
