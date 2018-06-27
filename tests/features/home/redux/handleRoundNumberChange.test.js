import {
  HOME_HANDLE_ROUND_NUMBER_CHANGE,
} from '../../../../src/features/home/redux/constants';

import {
  handleRoundNumberChange,
  reducer,
} from '../../../../src/features/home/redux/handleRoundNumberChange';

describe('home/redux/handleRoundNumberChange', () => {
  it('returns correct action by handleRoundNumberChange', () => {
    expect(handleRoundNumberChange()).toHaveProperty('type', HOME_HANDLE_ROUND_NUMBER_CHANGE);
  });

  it('handles action type HOME_HANDLE_ROUND_NUMBER_CHANGE correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: HOME_HANDLE_ROUND_NUMBER_CHANGE }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
