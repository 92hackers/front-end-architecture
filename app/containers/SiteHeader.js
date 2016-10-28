import { connect } from 'react-redux';
import { notificationActions, dashboardActions } from '../actions';
import SiteHeaderComp from '../components/SiteHeader';

const mapStateToProps = (state) => {
  const { user, pendingCounter } = state
  const { token, profile } = user
  const { status, examined } = profile
  return {
    token,
    pendingCounter,
    status,
    examined,
  }
};

const mapDispatchToProps = dispatch => ({
  showNotification: message => dispatch(notificationActions.showNotification(message)),
  networkError: () => dispatch(notificationActions.networkError()),
  dashboardDisplay: comp => dispatch(dashboardActions.dashboardDisplay(comp)),
})

const SiteHeader = connect(mapStateToProps, mapDispatchToProps)(SiteHeaderComp);

export default SiteHeader;
