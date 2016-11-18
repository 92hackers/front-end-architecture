import { timetableActions } from '../actions'

const initialState = {
  templateIsFetching: '',
  weekTimetableIsFetching: '',
  monthTimetableIsFetching: '',
  template: [],
  weekTimetable: [],
  monthTimetable: [],
}

const { WEEK_TEMPLATE, WEEK_TIMETABLE, MONTH_TIMETABLE } = timetableActions

export default function timetable(state = initialState, action) {
  const { payload } = action
  const data = payload ? payload.data : []

  switch (action.type) {
    case WEEK_TEMPLATE.REQUEST:
      return { ...state, templateIsFetching: true }

    case WEEK_TEMPLATE.SUCCESS:
      return { ...state, templateIsFetching: false, weekTemplate: data }

    case WEEK_TEMPLATE.FAILURE:
      return { ...state, templateIsFetching: false, weekTemplate: 'error' }

    case WEEK_TIMETABLE.REQUEST:
      return { ...state, weekTimetableIsFetching: true }

    case WEEK_TIMETABLE.SUCCESS:
      return { ...state, weekTimetableIsFetching: false, weekTimetable: data }

    case WEEK_TIMETABLE.FAILURE:
      return { ...state, weekTimetableIsFetching: false }

    case MONTH_TIMETABLE.REQUEST:
      return { ...state, monthTimetableIsFetching: true }

    case MONTH_TIMETABLE.SUCCESS:
      return { ...state, monthTimetableIsFetching: false, monthTimetable: data }

    case MONTH_TIMETABLE.FAILURE:
      return { ...state, monthTimetableIsFetching: false }

    default:
      return state
  }
}
