import { connect } from 'react-redux';
import { notificationActions } from '../actions';
import TSignUpComp from '../teacher-components/TSignUp';

const mapStateToProps = () => ({})

const mapDispatchToProps = dispatch => ({
  showNotification: message => dispatch(notificationActions.showNotification(message)),
  networkError: () => dispatch(notificationActions.networkError()),
})

const TSignUp = connect(mapStateToProps, mapDispatchToProps)(TSignUpComp);

export default TSignUp;
