import { userActions } from '../actions';

let initState = {
  token: '',
  loggedIn: false,
  profile: {}
};

export default function auth(state = initState, action) {
  switch (action.type) {
    case userActions.SIGN_IN:
      let token = action.token;
      localStorage.setItem('user_token', token);
      return {...state, token: token, loggedIn: true};

    case userActions.GET_PROFILE:
      return {...state, profile: action.profile};

    case userActions.SIGN_OUT:
      localStorage.removeItem('user_token');
      return {...state, token: '', loggedIn: false, profile: ""};
      
    default:
      return state;
  }
};
