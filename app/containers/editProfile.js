import { connect } from 'react-redux';
import { notificationActions, userActions, apiActions } from '../actions';
import { default as Comp } from '../teacher-components/EditProfile'

const mapStateToProps = () => ({

})

const mapDispatchToProps = dispatch => ({
  updateProfile: data => dispatch(apiActions.updateProfile(data)),
  getProfile: () => dispatch(apiActions.getProfile()),
  signOut: () => dispatch(userActions.signOut()),
  showNotification: message => dispatch(notificationActions.showNotification(message)),
  networkError: () => dispatch(notificationActions.networkError()),
})

const EditProfile = connect(mapStateToProps, mapDispatchToProps)(Comp);

export default EditProfile
