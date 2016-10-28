import { connect } from 'react-redux';
import { notificationActions, apiActions } from '../actions';
import ActivateEmailComp from '../teacher-components/ActivateEmail';

const mapStateToProps = state => ({
  loggedIn: state.user.loggedIn,
})

const mapDispatchToProps = dispatch => ({
  resendActivationEmail: data => dispatch(apiActions.resendActivationEmail(data)),
  showNotification: message => dispatch(notificationActions.showNotification(message)),
  networkError: () => dispatch(notificationActions.networkError()),
})

const ActivateEmail = connect(mapStateToProps, mapDispatchToProps)(ActivateEmailComp);

export default ActivateEmail;
