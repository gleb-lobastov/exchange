import React from 'react';
import { shallow } from 'enzyme';
import PocketsSwapper from '../PocketsSwapper';

describe('PocketsSwapper', () => {
  it('should handle click', () => {
    const handler = jest.fn();
    const instance = shallow(<PocketsSwapper onSwap={handler} />);
    instance.simulate('click');
    expect(handler.mock.calls).toHaveLength(1);
  });
});
