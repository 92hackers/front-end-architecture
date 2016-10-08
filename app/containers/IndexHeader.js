import {connect} from 'react-redux';
import { notificationActions } from '../actions';
import IndexHeaderComp from '../teacher-components/IndexHeader';

const mapStateToProps = (state) => {
  return {
    token: state.user.token,
    status: state.user.profile.status,
    examined: state.user.profile.examined
  }
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

const IndexHeader = connect(mapStateToProps, mapDispatchToProps)(IndexHeaderComp);

export default IndexHeader;
