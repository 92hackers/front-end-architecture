import {connect} from 'react-redux';
import { notificationActions } from '../actions';
import VerifyYourEmailComp from '../teacher-components/VerifyYourEmail';

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

const VerifyYourEmail = connect(mapStateToProps, mapDispatchToProps)(VerifyYourEmailComp);

export default VerifyYourEmail;
