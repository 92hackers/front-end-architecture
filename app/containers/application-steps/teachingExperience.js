import { connect } from 'react-redux'
import {
  notificationActions,
  applicationActions,
  userActions,
} from '../../actions'
import { default as Comp } from '../../components/application-steps/TeachingExperience'

const mapStateToProps = (state) => {
  const { user } = state
  const { profile, token } = user
  const { intro, style, whyteach, additional } = profile
  return {
    token,
    initialValues: {
      intro,
      style,
      whyteach,
      additional,
    },
  }
}

const mapDispatchToProps = dispatch => ({
  updateTeachingExp: data => dispatch(applicationActions.updateTeachingExp(data)),
  getProfile: () => dispatch(userActions.getProfile()),
  showNotification: message => dispatch(notificationActions.showNotification(message)),
  networkError: () => dispatch(notificationActions.networkError()),
})

const TeachingExperience = connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(Comp);

export default TeachingExperience
