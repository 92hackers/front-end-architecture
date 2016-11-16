import { apiActions } from '../actions'

const initialState = {
  isFetching: false,
  interviewTimeList: [],
}

export default function application(state = initialState, action) {
  const { type, payload } = action
  const data = payload ? payload.data : []
  const { INTERVIEW_LIST } = apiActions

  switch (type) {
    case INTERVIEW_LIST.REQUEST:
      return { ...state, isFetching: true }

    case INTERVIEW_LIST.SUCCESS:
      return { ...state, isFetching: false, interviewTimeList: data }

    case INTERVIEW_LIST.FAILURE:
      return { ...state, isFetching: false }

    default:
      return state
  }
}
