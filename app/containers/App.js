import { connect } from 'react-redux';
import AppContainer from '../teacher-components/AppContainer';
import { notificationActions, userActions, apiActions, pendingCounterActions } from '../actions';

const mapStateToProps = (state) => {
  const { pendingCounter, user } = state
  const { loggedIn, profile } = user
  return {
    pendingCounter,
    profile,
    loggedIn,
  }
}

const mapDispatchToProps = dispatch => ({
  signOut: () => dispatch(userActions.signOut()),
  getProfile: () => dispatch(apiActions.getProfile()),
  increaseCounter: () => dispatch(pendingCounterActions.increaseCounter()),
  decreaseCounter: () => dispatch(pendingCounterActions.decreaseCounter()),
  clearCounter: () => dispatch(pendingCounterActions.clearCounter()),
  showNotification: message => dispatch(notificationActions.showNotification(message)),
  networkError: () => dispatch(notificationActions.networkError()),
})

const App = connect(mapStateToProps, mapDispatchToProps)(AppContainer);
export default App;
