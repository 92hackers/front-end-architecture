import { utilityActions } from '../actions'

const initialValues = {
  timezoneId: 0,
  guideBoxOpen: false,
}

export default function utility(state = initialValues, action) {
  const { type, timezoneId } = action
  switch (type) {
    case utilityActions.APPLICATION_CHANGE_TIMEZONE:
      return { ...state, timezoneId }

    case utilityActions.DISPLAY_HELP_BOX:
      return { ...state, guideBoxOpen: true }

    case utilityActions.HIDE_HELP_BOX:
      return { ...state, guideBoxOpen: false }

    default:
      return state
  }
}
