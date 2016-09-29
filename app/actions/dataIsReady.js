import { createAction } from './lib';

export const INCREASE_COUNTER = 'INCREASE_COUNTER';
export const EMPTY_COUNTER = 'EMPTY_COUNTER';

export increaseCounter = (number) => createAction(INCREASE_COUNTER, {number});
export emptyCounter = () => createAction(EMPTY_COUNTER);
