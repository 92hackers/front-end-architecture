import {connect} from 'react-redux';
import { notificationActions } from '../actions';
import TInputNewPasswordComp from '../teacher-components/TInputNewPassword';

const mapStateToProps = (state) => {
  return {

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

const TInputNewPassword = connect(mapStateToProps, mapDispatchToProps)(TInputNewPasswordComp);

export default TInputNewPassword;
