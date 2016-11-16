import { connect } from 'react-redux'
import { notificationActions, apiActions, utilityActions } from '../../actions'
import { default as Comp } from '../../components/homepage/WeeklyTemplate'

const mapStateToProps = state => ({ lessonTemplate: state.timetable.weekTemplate })

const mapDispatchToProps = dispatch => ({
  getWeekTemplate: () => dispatch(apiActions.getWeekTemplate),
  updateWeekTemplate: () => dispatch(apiActions.updateWeekTemplate),

  displayHelpBox: () => dispatch(utilityActions.displayHelpBox),

  showNotification: message => dispatch(notificationActions.showNotification(message)),
  networkError: () => dispatch(notificationActions.networkError()),
})

const WeeklyTemplate = connect(mapStateToProps, mapDispatchToProps)(Comp)

export default WeeklyTemplate
