// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import {
  HOME_HANDLE_ROUND_NUMBER_CHANGE,
} from './constants';

export function handleRoundNumberChange(event) {
  return {
    type: HOME_HANDLE_ROUND_NUMBER_CHANGE,
    payload: event.target.value
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case HOME_HANDLE_ROUND_NUMBER_CHANGE:
      return {
        ...state,
        roundNumber: action.payload
      };

    default:
      return state;
  }
}
