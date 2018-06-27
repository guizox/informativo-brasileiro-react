import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  HOME_BUILD_TABLE_BEGIN,
  HOME_BUILD_TABLE_SUCCESS,
  HOME_BUILD_TABLE_FAILURE,
  HOME_BUILD_TABLE_DISMISS_ERROR,
} from '../../../../src/features/home/redux/constants';

import {
  buildTable,
  dismissBuildTableError,
  reducer,
} from '../../../../src/features/home/redux/buildTable';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/buildTable', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when buildTable succeeds', () => {
    const store = mockStore({});

    return store.dispatch(buildTable())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_BUILD_TABLE_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_BUILD_TABLE_SUCCESS);
      });
  });

  it('dispatches failure action when buildTable fails', () => {
    const store = mockStore({});

    return store.dispatch(buildTable({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_BUILD_TABLE_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_BUILD_TABLE_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissBuildTableError', () => {
    const expectedAction = {
      type: HOME_BUILD_TABLE_DISMISS_ERROR,
    };
    expect(dismissBuildTableError()).toEqual(expectedAction);
  });

  it('handles action type HOME_BUILD_TABLE_BEGIN correctly', () => {
    const prevState = { buildTablePending: false };
    const state = reducer(
      prevState,
      { type: HOME_BUILD_TABLE_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.buildTablePending).toBe(true);
  });

  it('handles action type HOME_BUILD_TABLE_SUCCESS correctly', () => {
    const prevState = { buildTablePending: true };
    const state = reducer(
      prevState,
      { type: HOME_BUILD_TABLE_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.buildTablePending).toBe(false);
  });

  it('handles action type HOME_BUILD_TABLE_FAILURE correctly', () => {
    const prevState = { buildTablePending: true };
    const state = reducer(
      prevState,
      { type: HOME_BUILD_TABLE_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.buildTablePending).toBe(false);
    expect(state.buildTableError).toEqual(expect.anything());
  });

  it('handles action type HOME_BUILD_TABLE_DISMISS_ERROR correctly', () => {
    const prevState = { buildTableError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_BUILD_TABLE_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.buildTableError).toBe(null);
  });
});

