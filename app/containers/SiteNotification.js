import { connect } from 'react-redux';
import { notificationActions } from '../actions';
import Notification from '../universal/Notification';

const mapStateToProps = (state) => {
  const {isShow, message} = state.notification;
  return {
    isShow: isShow,
    message: message
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    hideNotification: () => {
      dispatch(notificationActions.hideNotification());
    }
  }
}

const SiteNotification = connect(mapStateToProps, mapDispatchToProps)(Notification);
export default SiteNotification;
