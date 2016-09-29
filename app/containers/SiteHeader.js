import {connect} from 'react-redux';
import { notificationActions, dashboardActions } from '../actions';
import SiteHeaderComp from '../components/SiteHeader';

const mapStateToProps = (state) => {
  return {
    token: state.user.token,
    pendingCounter: state.pendingCounter,
    status: state.user.profile.status
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
    dashboardDisplay: (comp) => {
      dispatch(dashboardActions.dashboardDisplay(comp));
    }
  }
}

const SiteHeader = connect(mapStateToProps, mapDispatchToProps)(SiteHeaderComp);

export default SiteHeader;
