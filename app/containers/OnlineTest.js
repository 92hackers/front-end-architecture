import {connect} from 'react-redux';
import { notificationActions, userActions } from '../actions';
import OnlineTestComp from '../teacher-components/online-test/OnlineTestComp';

const mapStateToProps =  (state) => {
  return {
    token: state.user.token,
    pendingCounter: state.pendingCounter,
    examon: state.user.profile.examon
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProfile: (profile) => {
      dispatch(userActions.getProfile(profile));
    },
    showNotification: (message) => {
      dispatch(notificationActions.showNotification(message));
    },
    networkError: () => {
      dispatch(notificationActions.networkError());
    }
  }
}

const OnlineTest = connect(mapStateToProps, mapDispatchToProps)(OnlineTestComp);

export default OnlineTest;
