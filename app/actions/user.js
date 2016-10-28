import { createAction } from './lib';

export const SIGN_OUT = 'SIGN_OUT';
export const signOut = () => createAction(SIGN_OUT);
