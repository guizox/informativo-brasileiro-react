import React from 'react';
import { shallow } from 'enzyme';
import { Jogos } from '../../../src/features/home/Jogos';

describe('home/Jogos', () => {
  it('renders node with correct class name', () => {
    const props = {
      home: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Jogos {...props} />
    );

    expect(
      renderedComponent.find('.home-jogos').length
    ).toBe(1);
  });
});
