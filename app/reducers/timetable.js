import { apiActions } from '../actions'

const initialState = {
  isFetching: false,
  template: '',
  weekTimetable: [],
  monthTimetable: [],
}

const { WEEK_TEMPLATE, WEEK_TIMETABLE, MONTH_TIMETABLE } = apiActions

export default function timetable(state = initialState, action) {
  const { payload } = action
  const data = payload ? payload.data : []

  switch (action.type) {
    case WEEK_TEMPLATE.REQUEST:
      return { ...state, isFetching: true }

    case WEEK_TEMPLATE.SUCCESS:
      return { ...state, isFetching: false, weekTemplate: data }

    case WEEK_TEMPLATE.FAILURE:
      return { ...state, isFetching: false, weekTemplate: 'error' }

    case WEEK_TIMETABLE.REQUEST:
      return { ...state, isFetching: true }

    case WEEK_TIMETABLE.SUCCESS:
      return { ...state, isFetching: false, weekTimetable: data }

    case MONTH_TIMETABLE.REQUEST:
      return { ...state, isFetching: true }

    case MONTH_TIMETABLE.SUCCESS:
      return { ...state, isFetching: false, monthTimetable: data }

    default:
      return state
  }
}
