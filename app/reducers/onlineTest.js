import { apiActions } from '../actions'

const initialState = {
  isFetching: false,
  questions: [],
}

const { TEST_QUESTION, CLEAR_QUESTIONS } = apiActions

export default function onlineTest(state = initialState, action) {
  const { payload } = action
  const data = payload ? payload.data : []

  switch (action.type) {
    case TEST_QUESTION.REQUEST:
      return { ...state, isFetching: true }

    case TEST_QUESTION.SUCCESS:
      return { ...state, isFetching: false, questions: data }         // 清空 questions.

    case TEST_QUESTION.FAILURE:           // if error, how deal with.
      return { ...state, isFetching: false, error: true }

    case CLEAR_QUESTIONS:
      return { ...state, questions: [] }
    default:
      return state
  }
}
