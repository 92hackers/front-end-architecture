import { connect } from 'react-redux';
import { notificationActions, apiActions } from '../actions';
import { default as Comp } from '../components/SignUp'

const mapStateToProps = () => ({})

const mapDispatchToProps = dispatch => ({
  signUp: data => dispatch(apiActions.signUp(data)),
  showNotification: message => dispatch(notificationActions.showNotification(message)),
})

const SignUp = connect(mapStateToProps, mapDispatchToProps)(Comp);

export default SignUp;
