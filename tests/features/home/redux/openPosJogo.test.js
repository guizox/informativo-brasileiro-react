import {
  HOME_OPEN_POS_JOGO,
} from '../../../../src/features/home/redux/constants';

import {
  openPosJogo,
  reducer,
} from '../../../../src/features/home/redux/openPosJogo';

describe('home/redux/openPosJogo', () => {
  it('returns correct action by openPosJogo', () => {
    expect(openPosJogo()).toHaveProperty('type', HOME_OPEN_POS_JOGO);
  });

  it('handles action type HOME_OPEN_POS_JOGO correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: HOME_OPEN_POS_JOGO }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
