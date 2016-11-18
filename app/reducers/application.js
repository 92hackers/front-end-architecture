import { applicationActions } from '../actions'

const initialState = {
  timezoneId: '',
  interviewListisFetching: '',
  interviewTimeList: [],
  failed: false,
  uploadToken: '',
  uploadTokenIsFetching: '',
}

export default function application(state = initialState, action) {
  const { type, payload, timezoneId } = action
  const data = payload ? payload.data : []
  const { INTERVIEW_LIST, UPLOAD_TOKEN, CHANGE_TIMEZONE } = applicationActions

  switch (type) {
    case INTERVIEW_LIST.REQUEST:
      return { ...state, interviewListisFetching: true }

    case INTERVIEW_LIST.SUCCESS:
      return { ...state, interviewListisFetching: false, interviewTimeList: data }

    case INTERVIEW_LIST.FAILURE:
      return { ...state, interviewListisFetching: false, failed: true }

    case UPLOAD_TOKEN.REQUEST:
      return { ...state, uploadTokenIsFetching: true }

    case UPLOAD_TOKEN.SUCCESS:
      return { ...state, uploadTokenIsFetching: false, uploadToken: data }

    case UPLOAD_TOKEN.FAILURE:
      return { ...state, uploadTokenIsFetching: false, failed: true }

    case CHANGE_TIMEZONE:
      return { ...state, timezoneId }

    default:
      return state
  }
}
