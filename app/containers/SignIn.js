import { connect } from 'react-redux';
import { notificationActions, apiActions } from '../actions';
import { default as Comp } from '../components/SignIn';

const mapStateToProps = null

const mapDispatchToProps = dispatch => ({
  signIn: data => dispatch(apiActions.signIn(data)),
  resendActivationEmail: data => dispatch(apiActions.resendActivationEmail(data)),
  showNotification: message => dispatch(notificationActions.showNotification(message)),
  networkError: () => dispatch(notificationActions.networkError()),
})

const SignIn = connect(mapStateToProps, mapDispatchToProps)(Comp);

export default SignIn;
