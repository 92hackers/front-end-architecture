import Homepage from '../components/homepage/Homepage';
import EditProfile from '../containers/editProfile';
import PayeeInfo from '../containers/payeeInfo';
import WeeklyTemplate from '../containers/homepage/weeklyTemplate'
import Settings from '../containers/homepage/settings'
import Timetables from '../components/homepage/Timetables'

export default {
  path: 'teacher-homepage',         //    add  router to dashboard components.
  component: Homepage,
  childRoutes: [
    {
      path: 'timetables',
      component: Timetables,
    },
    {
      path: 'weekly-template',
      component: WeeklyTemplate,
    },
    {
      path: 'settings',
      component: Settings,
    },
    {
      path: 'edit-profile',
      component: EditProfile,
    },
    {
      path: 'complete-payee-information',
      component: PayeeInfo,
    },
  ],
}
