import { createAction } from './lib';

export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';
export const CLEAR = 'CLEAR';

export const increaseCounter = () => createAction(INCREMENT);
export const decreaseCounter = () => createAction(DECREMENT);
export const clearCounter = () => createAction(CLEAR);
