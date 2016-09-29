import { notificationActions } from '../actions';

const initState = {
  isShow: false,
  message: ""
};

export default function notification(state = initState, action) {
  switch (action.type) {
    case notificationActions.SHOW_NOTIFICATION:
      return {...state, isShow: true, message: action.message};

    case notificationActions.HIDE_NOTIFICATION:
      return {...state, isShow: false, message: ""};

    case notificationActions.NETWORK_ERROR:
      return {...state, isShow: true, message: "Network is busy, please try again later."};

    default:
      return state;
  }
}
