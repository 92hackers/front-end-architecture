import {connect} from 'react-redux';
import { notificationActions } from '../actions';
import InputNewEmailComp from '../teacher-components/InputNewEmail';

const mapStateToProps = (state) => {
  return {
    token: state.user.token
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

const InputNewEmail = connect(mapStateToProps, mapDispatchToProps)(InputNewEmailComp);

export default InputNewEmail;
