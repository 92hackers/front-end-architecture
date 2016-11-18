import { utilityActions } from '../actions'

const initialValues = {
  guideBoxOpen: false,
  siteModalOpen: false,
}

export default function utility(state = initialValues, action) {
  const { type } = action
  switch (type) {

    case utilityActions.DISPLAY_HELP_BOX:
      return { ...state, guideBoxOpen: true }

    case utilityActions.HIDE_HELP_BOX:
      return { ...state, guideBoxOpen: false }

    case utilityActions.DISPLAY_SITE_MODAL:
      return { ...state, siteModalOpen: true }

    case utilityActions.HIDE_SITE_MODAL:
      return { ...state, siteModalOpen: false }

    default:
      return state
  }
}
