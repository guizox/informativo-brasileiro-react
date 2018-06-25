import React from 'react';
import { shallow } from 'enzyme';
import { Times } from '../../../src/features/home/Times';

describe('home/Times', () => {
  it('renders node with correct class name', () => {
    const props = {
      home: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Times {...props} />
    );

    expect(
      renderedComponent.find('.home-times').length
    ).toBe(1);
  });
});
