import initialState from './initialState';
import { reducer as jogosClickReducer } from './jogosClick';
import { reducer as timesClickReducer } from './timesClick';
import { reducer as tabelaClickReducer } from './tabelaClick';
import { reducer as searchGamesReducer } from './searchGames';

const reducers = [
  jogosClickReducer,
  timesClickReducer,
  tabelaClickReducer,
  searchGamesReducer,
];

export default function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    // Handle cross-topic actions here
    default:
      newState = state;
      break;
  }
  /* istanbul ignore next */
  return reducers.reduce((s, r) => r(s, action), newState);
}
