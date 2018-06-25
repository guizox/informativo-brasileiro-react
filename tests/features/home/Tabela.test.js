import React from 'react';
import { shallow } from 'enzyme';
import { Tabela } from '../../../src/features/home/Tabela';

describe('home/Tabela', () => {
  it('renders node with correct class name', () => {
    const props = {
      home: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Tabela {...props} />
    );

    expect(
      renderedComponent.find('.home-tabela').length
    ).toBe(1);
  });
});
