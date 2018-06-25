import React from 'react';
import { shallow } from 'enzyme';
import { Main } from '../../../src/features/home/Main';

describe('home/Main', () => {
  it('renders node with correct class name', () => {
    const props = {
      home: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Main {...props} />
    );

    expect(
      renderedComponent.find('.home-main').length
    ).toBe(1);
  });
});
