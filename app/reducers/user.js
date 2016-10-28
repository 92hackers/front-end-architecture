import { userActions, apiActions } from '../actions';

const initialState = {
  token: '',
  isFetching: false,
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

const { SIGNIN, PROFILE, UPLOAD_TOKEN } = apiActions

export default function user(state = initialState, action) {
  const { payload } = action
  const data = payload ? payload.data : []

  switch (action.type) {
    case SIGNIN.REQUEST:
      return { ...state, isFetching: true };

    case SIGNIN.SUCCESS: {
      const { token } = data
      localStorage.setItem('user_token', token)
      return { ...state, isFetching: false, token, loggedIn: true }
    }

    case SIGNIN.FAILURE:
      return { ...state, isFetching: false, error: true }

    case userActions.SIGN_OUT: {
      localStorage.removeItem('user_token');
      return { ...state, token: '', profile: '', isFetching: false, loggedIn: false }
    }

    case PROFILE.REQUEST:
      return { ...state, isFetching: true }

    case PROFILE.SUCCESS:
      return { ...state, isFetching: false, profile: data }

    case PROFILE.FAILURE:
      return { ...state, isFetching: false, error: true }

    case UPLOAD_TOKEN.REQUEST:
      return { ...state, isFetching: true }

    case UPLOAD_TOKEN.SUCCESS:
      return { ...state, isFetching: false, uploadToken: data.up_token }

    case UPLOAD_TOKEN.FAILURE:
      return { ...state, isFetching: false, error: true }

    default:
      return state;
  }
}
