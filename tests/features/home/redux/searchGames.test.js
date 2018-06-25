import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  HOME_SEARCH_GAMES_BEGIN,
  HOME_SEARCH_GAMES_SUCCESS,
  HOME_SEARCH_GAMES_FAILURE,
  HOME_SEARCH_GAMES_DISMISS_ERROR,
} from '../../../../src/features/home/redux/constants';

import {
  searchGames,
  dismissSearchGamesError,
  reducer,
} from '../../../../src/features/home/redux/searchGames';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/searchGames', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when searchGames succeeds', () => {
    const store = mockStore({});

    return store.dispatch(searchGames())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_SEARCH_GAMES_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_SEARCH_GAMES_SUCCESS);
      });
  });

  it('dispatches failure action when searchGames fails', () => {
    const store = mockStore({});

    return store.dispatch(searchGames({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_SEARCH_GAMES_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_SEARCH_GAMES_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissSearchGamesError', () => {
    const expectedAction = {
      type: HOME_SEARCH_GAMES_DISMISS_ERROR,
    };
    expect(dismissSearchGamesError()).toEqual(expectedAction);
  });

  it('handles action type HOME_SEARCH_GAMES_BEGIN correctly', () => {
    const prevState = { searchGamesPending: false };
    const state = reducer(
      prevState,
      { type: HOME_SEARCH_GAMES_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.searchGamesPending).toBe(true);
  });

  it('handles action type HOME_SEARCH_GAMES_SUCCESS correctly', () => {
    const prevState = { searchGamesPending: true };
    const state = reducer(
      prevState,
      { type: HOME_SEARCH_GAMES_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.searchGamesPending).toBe(false);
  });

  it('handles action type HOME_SEARCH_GAMES_FAILURE correctly', () => {
    const prevState = { searchGamesPending: true };
    const state = reducer(
      prevState,
      { type: HOME_SEARCH_GAMES_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.searchGamesPending).toBe(false);
    expect(state.searchGamesError).toEqual(expect.anything());
  });

  it('handles action type HOME_SEARCH_GAMES_DISMISS_ERROR correctly', () => {
    const prevState = { searchGamesError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_SEARCH_GAMES_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.searchGamesError).toBe(null);
  });
});

