import { connect } from 'react-redux';
import { notificationActions, userActions, pendingCounterActions } from '../actions';
import { default as Comp } from '../components/VerifyYourEmail';

const mapStateToProps = (state) => {
  const { user } = state
  const { loggedIn } = user
  return {
    loggedIn,
  }
};

const mapDispatchToProps = dispatch => ({
  activateAccount: activeCode => dispatch(userActions.activateAccount(activeCode)),
  getProfile: () => dispatch(userActions.getProfile()),
  increaseCounter: () => dispatch(pendingCounterActions.increaseCounter()),
  decreaseCounter: () => dispatch(pendingCounterActions.decreaseCounter()),
  showNotification: message => dispatch(notificationActions.showNotification(message)),
})

const VerifyYourEmail = connect(mapStateToProps, mapDispatchToProps)(Comp);

export default VerifyYourEmail;
