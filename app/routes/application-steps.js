import StepToSignUp from '../components/application-steps/StepToSignUp';
import BasicInfo from '../containers/application-steps/basicInfo'
import ScheduleInterview from '../containers/application-steps/scheduleInterview'
import TeachingExperience from '../components/application-steps/TeachingExperience'

export default {
  path: 'step-to-sign-up',
  component: StepToSignUp,
  childRoutes: [
    {
      path: 'basic-information',
      component: BasicInfo,
    },
    {
      path: 'teaching-experience',
      component: TeachingExperience,
    },
    {
      path: 'schedule-interview',
      component: ScheduleInterview,
    },
  ],
}
