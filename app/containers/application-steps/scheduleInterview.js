import { connect } from 'react-redux'
import { notificationActions, userActions, applicationActions } from '../../actions'
import { default as Comp } from '../../components/application-steps/ScheduleInterview'

const mapStateToProps = (state) => {
  const { application } = state
  const { timezoneId, interviewTimeList } = application

  return {
    timezoneId,
    interviewTimeList,
  }
};

const mapDispatchToProps = dispatch => ({
  getProfile: () => dispatch(userActions.getProfile()),

  updateInterview: data => dispatch(applicationActions.updateInterview(data)),

  showNotification: message => dispatch(notificationActions.showNotification(message)),
  networkError: () => dispatch(notificationActions.networkError()),
})

const ScheduleInterview = connect(mapStateToProps, mapDispatchToProps)(Comp);

export default ScheduleInterview
