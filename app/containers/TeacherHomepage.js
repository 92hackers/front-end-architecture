import {connect} from 'react-redux';
import { notificationActions, userActions, dashboardActions } from '../actions';
import THomepageComp from '../teacher-components/THomepage';

const mapStateToProps =  (state) => {
  return {
    token: state.user.token,
    profile: state.user.profile,
    dashboard: state.dashboardDisplay.comp
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    showNotification: (message) => {
      dispatch(notificationActions.showNotification(message));
    },
    networkError: () => {
      dispatch(notificationActions.networkError());
    },
    signOut: () => {
      dispatch(userActions.signOut());
      dispatch(dashboardActions.dashboardDisplay(""));
    }
  }
}

const THomepage  = connect(mapStateToProps, mapDispatchToProps)(THomepageComp);

export default THomepage;
