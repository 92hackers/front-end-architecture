import { createAction, createRequestTypes, apicall } from './lib';

export const SIGNUP = createRequestTypes('SIGNUP')
export const signUp = data => apicall('user/signup', SIGNUP, { data })

export const SIGNIN = createRequestTypes('SIGNIN')
export const signIn = data => apicall('user/login', SIGNIN, { data })

export const SIGN_IN_SESSION = 'SIGN_IN_SESSION'          // sign in with local token.
export const signInSession = token => createAction(SIGN_IN_SESSION, { token })

export const PROFILE = createRequestTypes('PROFILE')
export const getProfile = () => apicall('user/profile', PROFILE)

export const PROFILE_UPDATE = createRequestTypes('PROFILE_UPDATE')
export const updateProfile = data => apicall('user/profile', PROFILE_UPDATE, { data })

export const RESEND_ACTIVATION_EMAIL = createRequestTypes('RESEND_ACTIVATION_EMAIL')
export const resendActivationEmail = data => apicall('user/active', RESEND_ACTIVATION_EMAIL, { data })

export const ACTIVATE_ACCOUNT = createRequestTypes('ACTIVATE_ACCOUNT')
export const activateAccount = activeCode => apicall(`user/active/${activeCode}`, ACTIVATE_ACCOUNT)

export const RESET_PASSWORD = createRequestTypes('RESET_PASSWORD')
export const resetPassword = data => apicall('user/reqreset', RESET_PASSWORD, { data })

export const UPDATE_PASSWORD = createRequestTypes('UPDATE_PASSWORD')
export const updatePassword = data => apicall('user/uppw', UPDATE_PASSWORD, { data })

export const SIGN_OUT = 'SIGN_OUT';
export const signOut = () => createAction(SIGN_OUT);
