import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  HOME_TIMES_CLICK_BEGIN,
  HOME_TIMES_CLICK_SUCCESS,
  HOME_TIMES_CLICK_FAILURE,
  HOME_TIMES_CLICK_DISMISS_ERROR,
} from '../../../../src/features/home/redux/constants';

import {
  timesClick,
  dismissTimesClickError,
  reducer,
} from '../../../../src/features/home/redux/timesClick';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/timesClick', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when timesClick succeeds', () => {
    const store = mockStore({});

    return store.dispatch(timesClick())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_TIMES_CLICK_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_TIMES_CLICK_SUCCESS);
      });
  });

  it('dispatches failure action when timesClick fails', () => {
    const store = mockStore({});

    return store.dispatch(timesClick({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_TIMES_CLICK_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_TIMES_CLICK_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissTimesClickError', () => {
    const expectedAction = {
      type: HOME_TIMES_CLICK_DISMISS_ERROR,
    };
    expect(dismissTimesClickError()).toEqual(expectedAction);
  });

  it('handles action type HOME_TIMES_CLICK_BEGIN correctly', () => {
    const prevState = { timesClickPending: false };
    const state = reducer(
      prevState,
      { type: HOME_TIMES_CLICK_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.timesClickPending).toBe(true);
  });

  it('handles action type HOME_TIMES_CLICK_SUCCESS correctly', () => {
    const prevState = { timesClickPending: true };
    const state = reducer(
      prevState,
      { type: HOME_TIMES_CLICK_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.timesClickPending).toBe(false);
  });

  it('handles action type HOME_TIMES_CLICK_FAILURE correctly', () => {
    const prevState = { timesClickPending: true };
    const state = reducer(
      prevState,
      { type: HOME_TIMES_CLICK_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.timesClickPending).toBe(false);
    expect(state.timesClickError).toEqual(expect.anything());
  });

  it('handles action type HOME_TIMES_CLICK_DISMISS_ERROR correctly', () => {
    const prevState = { timesClickError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_TIMES_CLICK_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.timesClickError).toBe(null);
  });
});

