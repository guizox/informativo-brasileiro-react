import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  HOME_TABELA_CLICK_BEGIN,
  HOME_TABELA_CLICK_SUCCESS,
  HOME_TABELA_CLICK_FAILURE,
  HOME_TABELA_CLICK_DISMISS_ERROR,
} from '../../../../src/features/home/redux/constants';

import {
  tabelaClick,
  dismissTabelaClickError,
  reducer,
} from '../../../../src/features/home/redux/tabelaClick';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/tabelaClick', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when tabelaClick succeeds', () => {
    const store = mockStore({});

    return store.dispatch(tabelaClick())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_TABELA_CLICK_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_TABELA_CLICK_SUCCESS);
      });
  });

  it('dispatches failure action when tabelaClick fails', () => {
    const store = mockStore({});

    return store.dispatch(tabelaClick({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_TABELA_CLICK_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_TABELA_CLICK_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissTabelaClickError', () => {
    const expectedAction = {
      type: HOME_TABELA_CLICK_DISMISS_ERROR,
    };
    expect(dismissTabelaClickError()).toEqual(expectedAction);
  });

  it('handles action type HOME_TABELA_CLICK_BEGIN correctly', () => {
    const prevState = { tabelaPending: false };
    const state = reducer(
      prevState,
      { type: HOME_TABELA_CLICK_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.tabelaPending).toBe(true);
  });

  it('handles action type HOME_TABELA_CLICK_SUCCESS correctly', () => {
    const prevState = { tabelaPending: true };
    const state = reducer(
      prevState,
      { type: HOME_TABELA_CLICK_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.tabelaPending).toBe(false);
  });

  it('handles action type HOME_TABELA_CLICK_FAILURE correctly', () => {
    const prevState = { tabelaPending: true };
    const state = reducer(
      prevState,
      { type: HOME_TABELA_CLICK_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.tabelaPending).toBe(false);
    expect(state.tabelaError).toEqual(expect.anything());
  });

  it('handles action type HOME_TABELA_CLICK_DISMISS_ERROR correctly', () => {
    const prevState = { tabelaError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_TABELA_CLICK_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.tabelaError).toBe(null);
  });
});

