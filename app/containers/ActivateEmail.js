import {connect} from 'react-redux';
import { notificationActions  } from '../actions';
import ActivateEmailComp from '../teacher-components/ActivateEmail';

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

const ActivateEmail = connect(mapStateToProps, mapDispatchToProps)(ActivateEmailComp);

export default ActivateEmail;
