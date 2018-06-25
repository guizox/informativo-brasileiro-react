import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  HOME_JOGOS_CLICK_BEGIN,
  HOME_JOGOS_CLICK_SUCCESS,
  HOME_JOGOS_CLICK_FAILURE,
  HOME_JOGOS_CLICK_DISMISS_ERROR,
} from '../../../../src/features/home/redux/constants';

import {
  jogosClick,
  dismissJogosClickError,
  reducer,
} from '../../../../src/features/home/redux/jogosClick';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/jogosClick', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when jogosClick succeeds', () => {
    const store = mockStore({});

    return store.dispatch(jogosClick())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_JOGOS_CLICK_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_JOGOS_CLICK_SUCCESS);
      });
  });

  it('dispatches failure action when jogosClick fails', () => {
    const store = mockStore({});

    return store.dispatch(jogosClick({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_JOGOS_CLICK_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_JOGOS_CLICK_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissJogosClickError', () => {
    const expectedAction = {
      type: HOME_JOGOS_CLICK_DISMISS_ERROR,
    };
    expect(dismissJogosClickError()).toEqual(expectedAction);
  });

  it('handles action type HOME_JOGOS_CLICK_BEGIN correctly', () => {
    const prevState = { jogosClickPending: false };
    const state = reducer(
      prevState,
      { type: HOME_JOGOS_CLICK_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.jogosClickPending).toBe(true);
  });

  it('handles action type HOME_JOGOS_CLICK_SUCCESS correctly', () => {
    const prevState = { jogosClickPending: true };
    const state = reducer(
      prevState,
      { type: HOME_JOGOS_CLICK_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.jogosClickPending).toBe(false);
  });

  it('handles action type HOME_JOGOS_CLICK_FAILURE correctly', () => {
    const prevState = { jogosClickPending: true };
    const state = reducer(
      prevState,
      { type: HOME_JOGOS_CLICK_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.jogosClickPending).toBe(false);
    expect(state.jogosClickError).toEqual(expect.anything());
  });

  it('handles action type HOME_JOGOS_CLICK_DISMISS_ERROR correctly', () => {
    const prevState = { jogosClickError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_JOGOS_CLICK_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.jogosClickError).toBe(null);
  });
});

