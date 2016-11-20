import { connect } from 'react-redux';
import { notificationActions, userActions } from '../actions';
import { default as Comp } from '../components/SignIn';

const mapStateToProps = null

const mapDispatchToProps = dispatch => ({
  signIn: data => dispatch(userActions.signIn(data)),
  resendActivationEmail: data => dispatch(userActions.resendActivationEmail(data)),
  showNotification: message => dispatch(notificationActions.showNotification(message)),
  networkError: () => dispatch(notificationActions.networkError()),
})

const SignIn = connect(mapStateToProps, mapDispatchToProps)(Comp);

export default SignIn;
