import {connect} from 'react-redux';
import { notificationActions, pendingCounterActions } from '../actions';
import StepToSignUpComp from '../teacher-components/StepToSignUp';

const mapStateToProps = (state) => {
  return {
    token: state.user.token,
    pendingCounter: state.pendingCounter,
    profile: state.user.profile
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    showNotification: (message) => {
      dispatch(notificationActions.showNotification(message));
    },
    networkError: () => {
      dispatch(notificationActions.networkError());
    }
  }
}

const StepToSignUp = connect(mapStateToProps, mapDispatchToProps)(StepToSignUpComp);

export default StepToSignUp;
