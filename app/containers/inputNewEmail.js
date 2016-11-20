import { connect } from 'react-redux';
import { notificationActions, userActions } from '../actions';
import { default as Comp } from '../components/InputNewEmail';

const mapStateToProps = () => ({})

const mapDispatchToProps = dispatch => ({
  resendActivationEmail: data => dispatch(userActions.resendActivationEmail(data)),
  showNotification: message => dispatch(notificationActions.showNotification(message)),
  networkError: () => dispatch(notificationActions.networkError()),
})

const InputNewEmail = connect(mapStateToProps, mapDispatchToProps)(Comp);

export default InputNewEmail;
