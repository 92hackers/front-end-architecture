import { connect } from 'react-redux';
import { notificationActions, apiActions } from '../actions';
import { default as Comp } from '../components/homepage/Week';

const mapStateToProps = () => ({

})

const mapDispatchToProps = dispatch => ({
  updateWeekTimetable: data => dispatch(apiActions.updateWeekTimetable(data)),
  showNotification: message => dispatch(notificationActions.showNotification(message)),
  networkError: () => dispatch(notificationActions.networkError()),
})

const Week = connect(mapStateToProps, mapDispatchToProps)(Comp);

export default Week;
