import { apiActions } from '../actions';

const initState = {
  isFetching: false,
  updateResult: "",
  success: false,
}

export default function profile (state = initState, action) {
  switch (action.type) {
    case apiActions.PROFILE_UPDATE_REQUEST:
      return {...state, isFetching: true}

    case apiActions.PROFILE_UPDATE_SUCCESS:
      return {...state, isFetching: false, succcess: action.payload.success, updateResult: "success"}

    case apiActions.PROFILE_UPDATE_FAILURE:
      return {...state, isFetching: false, updateResult: "failure"}

    default:
      return state
  }
}
