import {connect} from 'react-redux';
import { notificationActions, userActions } from '../actions';
import TSignInComp from '../teacher-components/TSignIn';

const mapStateToProps =  (state) => {
  return {

  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (token) => {
      dispatch(userActions.signIn(token));
    },
    showNotification: (message) => {
      dispatch(notificationActions.showNotification(message));
    },
    networkError: () => {
      dispatch(notificationActions.networkError());
    }
  }
}

const SignIn = connect(mapStateToProps, mapDispatchToProps)(TSignInComp);

export default SignIn;
