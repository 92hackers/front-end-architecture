import { connect } from 'react-redux';
import { notificationActions, pendingCounterActions, userActions } from '../actions';
import { default as Comp } from '../components/EditProfile'

const mapStateToProps = () => ({

})

const mapDispatchToProps = dispatch => ({
  increaseCounter: () => dispatch(pendingCounterActions.increaseCounter()),
  decreaseCounter: () => dispatch(pendingCounterActions.decreaseCounter()),
  updateProfile: data => dispatch(userActions.updateProfile(data)),
  getProfile: () => dispatch(userActions.getProfile()),
  signOut: () => dispatch(userActions.signOut()),
  showNotification: message => dispatch(notificationActions.showNotification(message)),
  networkError: () => dispatch(notificationActions.networkError()),
})

const EditProfile = connect(mapStateToProps, mapDispatchToProps)(Comp);

export default EditProfile
