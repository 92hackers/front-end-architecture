import { connect } from 'react-redux'
import { notificationActions, apiActions } from '../actions'
import { default as Comp } from '../components/InputNewPassword'

const mapStateToProps = () => ({})

const mapDispatchToProps = dispatch => ({
  resetPassword: data => dispatch(apiActions.resetPassword(data)),
  showNotification: message => dispatch(notificationActions.showNotification(message)),
  networkError: () => dispatch(notificationActions.networkError()),
})

const InputNewPassword = connect(mapStateToProps, mapDispatchToProps)(Comp);

export default InputNewPassword;
