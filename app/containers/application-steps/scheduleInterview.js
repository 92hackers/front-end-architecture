import { connect } from 'react-redux'
import { notificationActions, apiActions } from '../../actions'
import { default as Comp } from '../../components/application-steps/ScheduleInterview'

const mapStateToProps = (state) => {
  const { utility, application } = state
  const { timezoneId } = utility
  const { interviewTimeList } = application

  return {
    timezoneId,
    interviewTimeList,
  }
};

const mapDispatchToProps = dispatch => ({
  getProfile: () => dispatch(apiActions.getProfile()),
  getInterviewList: timezoneId => dispatch(apiActions.getInterviewList(timezoneId)),

  updateInterview: data => dispatch(apiActions.updateInterview(data)),

  showNotification: message => dispatch(notificationActions.showNotification(message)),
  networkError: () => dispatch(notificationActions.networkError()),
})

const ScheduleInterview = connect(mapStateToProps, mapDispatchToProps)(Comp);

export default ScheduleInterview
