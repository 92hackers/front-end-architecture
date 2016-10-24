import { userActions } from '../actions';

let initState = {
  token: '',
  loggedIn: false,
  profile: {
    email: "",
    status: 0,
    interview: "",
    "timezone_name": "",
    nation: "",
    country: "",
    region: "",
    city: "",
    nationality: 0,
    timezone: 0,
    "timezone_offset": 0,
    experience: 0,
    eduexp: [],
    "residence_n": 0,
    "residence_p": 0,
    "residence_c": 0,
    firstname: "",
    lastname: "",
    gender: 0,
    "tel_code": "",
    "tel_num": "",
    avatar: "",
    intro: "",
    style: "",
    whyteach: "",
    additional: "",
    examined: 0,
    examon: 0,
    video: null,
    zoomid: ""
  },
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
      return {token: '', loggedIn: false, profile: {}};

    default:
      return state;
  }
};
