import {connect} from 'react-redux';
import { notificationActions, userActions, pendingCounterActions } from '../actions';
import VerifyYourEmailComp from '../teacher-components/VerifyYourEmail';

const mapStateToProps = (state) => {
  return {
    token: state.user.token,
    loggedIn: state.user.loggedIn
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProfile: (profile) => {
      dispatch(userActions.getProfile(profile));
    },
    increaseCounter: () => {
      dispatch(pendingCounterActions.increaseCounter());
    },
    decreaseCounter: () => {
      dispatch(pendingCounterActions.decreaseCounter());
    },
    showNotification: (message) => {
      dispatch(notificationActions.showNotification(message));
    },
    networkError: () => {
      dispatch(notificationActions.networkError());
    }
  }
}

const VerifyYourEmail = connect(mapStateToProps, mapDispatchToProps)(VerifyYourEmailComp);

export default VerifyYourEmail;
