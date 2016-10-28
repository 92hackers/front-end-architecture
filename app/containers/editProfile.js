import {connect} from 'react-redux';
import { notificationActions, userActions, apiActions } from '../actions';
import { default as Comp } from '../teacher-components/EditProfile'

const mapStateToProps = (state) => {
  return {
    token: state.user.token
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateProfile: (data) => {
      return dispatch(apiActions.updateProfile(data))
    },
    getProfile: profile => dispatch(userActions.getProfile(profile)),
    signOut: () => dispatch(userActions.signOut()),
    showNotification: (message) => {
      dispatch(notificationActions.showNotification(message));
    },
    networkError: () => {
      dispatch(notificationActions.networkError());
    },
  }
}

const EditProfile = connect(mapStateToProps, mapDispatchToProps)(Comp);

export default EditProfile
