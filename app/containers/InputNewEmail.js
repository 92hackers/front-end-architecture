import { connect } from 'react-redux';
import { notificationActions, apiActions } from '../actions';
import { default as Comp } from '../components/InputNewEmail';

const mapStateToProps = () => ({})

const mapDispatchToProps = dispatch => ({
  resendActivationEmail: data => dispatch(apiActions.resendActivationEmail(data)),
  showNotification: message => dispatch(notificationActions.showNotification(message)),
  networkError: () => dispatch(notificationActions.networkError()),
})

const InputNewEmail = connect(mapStateToProps, mapDispatchToProps)(Comp);

export default InputNewEmail;
