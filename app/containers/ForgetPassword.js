import {connect} from 'react-redux';
import { notificationActions } from '../actions';
import ForgetPasswordComp from '../teacher-components/ForgetPassword';

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

const ForgetPassword = connect(mapStateToProps, mapDispatchToProps)(ForgetPasswordComp);

export default ForgetPassword;
