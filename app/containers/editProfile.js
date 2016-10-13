import {connect} from 'react-redux';
import { notificationActions } from '../actions';
import EditProfile as Comp from '../teacher-components/EditProfile';

const mapStateToProps = (state) => {
  const profile = state.user.profile
  return {profile}
};

const mapDispatchToProps = (dispatch) => {
  return {
    showNotification: (message) => {
      dispatch(notificationActions.showNotification(message));
    },
    networkError: () => {
      dispatch(notificationActions.networkError());
    }
  }
}

const EditProfile = connect(mapStateToProps, mapDispatchToProps)(Comp);

export default EditProfile
