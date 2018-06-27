import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  HOME_SEARCH_TEAMS_BEGIN,
  HOME_SEARCH_TEAMS_SUCCESS,
  HOME_SEARCH_TEAMS_FAILURE,
  HOME_SEARCH_TEAMS_DISMISS_ERROR,
} from '../../../../src/features/home/redux/constants';

import {
  searchTeams,
  dismissSearchTeamsError,
  reducer,
} from '../../../../src/features/home/redux/searchTeams';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/searchTeams', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when searchTeams succeeds', () => {
    const store = mockStore({});

    return store.dispatch(searchTeams())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_SEARCH_TEAMS_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_SEARCH_TEAMS_SUCCESS);
      });
  });

  it('dispatches failure action when searchTeams fails', () => {
    const store = mockStore({});

    return store.dispatch(searchTeams({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_SEARCH_TEAMS_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_SEARCH_TEAMS_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissSearchTeamsError', () => {
    const expectedAction = {
      type: HOME_SEARCH_TEAMS_DISMISS_ERROR,
    };
    expect(dismissSearchTeamsError()).toEqual(expectedAction);
  });

  it('handles action type HOME_SEARCH_TEAMS_BEGIN correctly', () => {
    const prevState = { searchTeamsPending: false };
    const state = reducer(
      prevState,
      { type: HOME_SEARCH_TEAMS_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.searchTeamsPending).toBe(true);
  });

  it('handles action type HOME_SEARCH_TEAMS_SUCCESS correctly', () => {
    const prevState = { searchTeamsPending: true };
    const state = reducer(
      prevState,
      { type: HOME_SEARCH_TEAMS_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.searchTeamsPending).toBe(false);
  });

  it('handles action type HOME_SEARCH_TEAMS_FAILURE correctly', () => {
    const prevState = { searchTeamsPending: true };
    const state = reducer(
      prevState,
      { type: HOME_SEARCH_TEAMS_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.searchTeamsPending).toBe(false);
    expect(state.searchTeamsError).toEqual(expect.anything());
  });

  it('handles action type HOME_SEARCH_TEAMS_DISMISS_ERROR correctly', () => {
    const prevState = { searchTeamsError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_SEARCH_TEAMS_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.searchTeamsError).toBe(null);
  });
});

