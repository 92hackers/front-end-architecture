import {connect} from 'react-redux';
import { notificationActions } from '../actions';
import DisplayUserStatusComp from '../teacher-components/DisplayUserStatus';

const mapStateToProps = (state) => {
  return {
    profile: state.user.profile,
    pendingCounter: state.pendingCounter
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

const DisplayUserStatus = connect(mapStateToProps, mapDispatchToProps)(DisplayUserStatusComp);

export default DisplayUserStatus;
