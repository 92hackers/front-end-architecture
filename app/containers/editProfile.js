import {connect} from 'react-redux';
import { notificationActions, apiActions } from '../actions';
import { default as Comp } from '../teacher-components/EditProfile'

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateProfile: (data) => {
      return dispatch(apiActions.updateProfile(data))
    },
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
