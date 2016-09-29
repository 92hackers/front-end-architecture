import { createAction } from './lib';

export const SIGN_IN = 'SIGN_IN';
export const SIGN_OUT = 'SIGN_OUT';
export const GET_PROFILE = 'GET_PROFILE';

export const signIn = (token) => createAction(SIGN_IN, {token});

export const getProfile = (profile) => createAction(GET_PROFILE, {profile});

export const signOut = () => createAction(SIGN_OUT);
