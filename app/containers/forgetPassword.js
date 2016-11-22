import { connect } from 'react-redux';
import { notificationActions, userActions } from '../actions';
import ForgetPasswordComp from '../components/ForgetPassword';

const mapStateToProps = () => ({

})

const mapDispatchToProps = dispatch => ({
  resetPassword: data => dispatch(userActions.resetPassword(data)),
  showNotification: message => dispatch(notificationActions.showNotification(message)),
  networkError: () => dispatch(notificationActions.networkError()),
})

const ForgetPassword = connect(mapStateToProps, mapDispatchToProps)(ForgetPasswordComp);

export default ForgetPassword;
