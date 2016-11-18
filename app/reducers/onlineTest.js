import { onlineTestActions } from '../actions'

const initialState = {
  questionIsFetching: '',
  questions: [],
  failed: false,
}

const { TEST_QUESTION, CLEAR_QUESTIONS } = onlineTestActions

export default function onlineTest(state = initialState, action) {
  const { payload } = action
  const data = payload ? payload.data : []

  switch (action.type) {
    case TEST_QUESTION.REQUEST:
      return { ...state, questionIsFetching: true }

    case TEST_QUESTION.SUCCESS:
      return { ...state, questionIsFetching: false, questions: data }         // 清空 questions.

    case TEST_QUESTION.FAILURE:           // if error, how deal with.
      return { ...state, questionIsFetching: false, failed: true }

    case CLEAR_QUESTIONS:
      return { ...state, questions: [] }

    default:
      return state
  }
}
