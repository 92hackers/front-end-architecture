import { connect } from 'react-redux';
import AppContainer from '../teacher-components/AppContainer';
import { notificationActions, userActions, pendingCounterActions } from '../actions';

const mapStateToProps = (state) => {
  return {
    token: state.user.token,
    pendingCounter: state.pendingCounter
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (token) => {
      dispatch(userActions.signIn(token));
    },
    signOut: () => {
      dispatch(userActions.signOut());
    },
    getProfile: (profile) => {
      dispatch(userActions.getProfile(profile));
    },
    increaseCounter: () => {
      dispatch(pendingCounterActions.increaseCounter());
    },
    decreaseCounter: () => {
      dispatch(pendingCounterActions.decreaseCounter());
    },
    clearCounter: () => {
      dispatch(pendingCounterActions.clearCounter());
    },
    showNotification: (message) => {
      dispatch(notificationActions.showNotification(message));
    },
    networkError: () => {
      dispatch(notificationActions.networkError());
    }
  };
}

const App = connect(mapStateToProps, mapDispatchToProps)(AppContainer);
export default App;
