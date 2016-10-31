import { connect } from 'react-redux';
import { notificationActions, pendingCounterActions, userActions, apiActions } from '../actions';
import { default as Comp } from '../components/EditProfile'

const mapStateToProps = () => ({

})

const mapDispatchToProps = dispatch => ({
  increaseCounter: () => dispatch(pendingCounterActions.increaseCounter()),
  decreaseCounter: () => dispatch(pendingCounterActions.decreaseCounter()),
  updateProfile: data => dispatch(apiActions.updateProfile(data)),
  getProfile: () => dispatch(apiActions.getProfile()),
  signOut: () => dispatch(userActions.signOut()),
  showNotification: message => dispatch(notificationActions.showNotification(message)),
  networkError: () => dispatch(notificationActions.networkError()),
})

const EditProfile = connect(mapStateToProps, mapDispatchToProps)(Comp);

export default EditProfile
