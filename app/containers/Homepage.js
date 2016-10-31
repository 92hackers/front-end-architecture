import { connect } from 'react-redux';
import { notificationActions, dashboardActions } from '../actions';
import THomepageComp from '../teacher-components/THomepage';

const mapStateToProps = (state) => {
  const { user, dashboardDisplay } = state
  const { profile } = user
  const { comp } = dashboardDisplay
  return {
    profile,
    dashboard: comp,
  }
};

const mapDispatchToProps = dispatch => ({
  getNationalityList: () => dispatch(apiActions.getNationalityList()),
  getCountryList: () => dispatch(apiActions.getCountryList()),
  getRegionList: () => dispatch(apiActions.getRegionList()),
  getCityList: () => dispatch(apiActions.getCityList()),
  getTimezoneList: () => dispatch(apiActions.getTimezoneList()),
  showNotification: message => dispatch(notificationActions.showNotification(message)),
  networkError: () => dispatch(notificationActions.networkError()),
  signOut: () => {
    dispatch(userActions.signOut());
    dispatch(dashboardActions.dashboardDisplay(''));
  },
})

const THomepage = connect(mapStateToProps, mapDispatchToProps)(THomepageComp);

export default THomepage;
