import { dataIsReadyActions } from '../actions';

const initState = {
  dataIsReady: 0
};

export default function dataIsReady( state = initState, action) {
  switch (action.type) {
    case dataIsReadyActions.INCREASE_COUNTER:
      return {...state, dataIsReady: action.number};

    case dataIsReadyActions.EMPTY_COUNTER:
      return {...state, dataIsReady: 0};
      
    default:
      return state;
  }
}
