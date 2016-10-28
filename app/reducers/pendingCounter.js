import { pendingCounterActions } from '../actions';

export default function pendingCounter(state = 0, action) {
  switch (action.type) {
    case pendingCounterActions.INCREMENT:
      return state + 1;

    case pendingCounterActions.DECREMENT:
      return state - 1;

    case pendingCounterActions.CLEAR:
      return 0;

    default:
      return state;
  }
}
