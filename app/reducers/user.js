import { userActions } from '../actions';

const initialState = {
  token: '',
  signInPending: '',
  profileIsFetching: '',
  loggedIn: false,
  uploadToken: '',
  profile: {
    email: '',
    status: 0,
    interview: '',
    timezone_name: '',
    nation: '',
    country: '',
    region: '',
    city: '',
    nationality: 0,
    timezone: 0,
    timezone_offset: 0,
    experience: 0,
    eduexp: [],
    residence_n: 0,
    residence_p: 0,
    residence_c: 0,
    firstname: '',
    lastname: '',
    gender: 0,
    tel_code: '',
    tel_num: '',
    avatar: '',
    intro: '',
    style: '',
    whyteach: '',
    additional: '',
    examined: 0,
    examon: 0,
    video: null,
    zoomid: '',
  },
};

const {
  SIGNIN,
  SIGN_IN_SESSION,
  PROFILE,
  SIGN_OUT,
} = userActions

export default function user(state = initialState, action) {
  const { payload, type } = action
  const data = payload ? payload.data : []

  switch (type) {
    case SIGNIN.REQUEST:
      return { ...state, signInPending: true };

    case SIGNIN.SUCCESS: {
      const { token } = data
      localStorage.setItem('user_token', token)
      return { ...state, signInPending: false, token, loggedIn: true }
    }

    case SIGNIN.FAILURE:
      return { ...state, signInPending: false }

    case SIGN_IN_SESSION: {
      return { ...state, token: action.token, loggedIn: true }
    }

    case SIGN_OUT: {
      localStorage.removeItem('user_token');
      return { ...state, token: '', profile: '', loggedIn: false }
    }

    case PROFILE.REQUEST:
      return { ...state, profileIsFetching: true }

    case PROFILE.SUCCESS:
      return { ...state, profileIsFetching: false, profile: data }

    case PROFILE.FAILURE:
      return { ...state, profileIsFetching: false }

    default:
      return state;
  }
}
