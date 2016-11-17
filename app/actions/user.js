import { createAction } from './lib';

export const SIGN_OUT = 'SIGN_OUT';
export const signOut = () => createAction(SIGN_OUT);

export const SIGN_IN_SESSION = 'SIGN_IN_SESSION'
export const signInSession = token => createAction(SIGN_IN_SESSION, { token })
