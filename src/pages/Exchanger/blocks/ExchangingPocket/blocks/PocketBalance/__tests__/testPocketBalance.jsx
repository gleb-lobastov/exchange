import React from 'react';
import { shallow } from 'enzyme';
import PocketBalance from '../PocketBalance';

let pocket;
beforeEach(() => {
  pocket = { amount: 2.54313, currencyCode: 'USD' };
});

describe('PocketBalance', () => {
  it('should render passed balance', () => {
    const instance = shallow(<PocketBalance pocket={pocket} />);

    expect(
      instance.find('[data-locator="exchanger-pocket-balance-value"]').text(),
    ).toEqual(expect.stringContaining('2.54'));
  });

  it('should render currency symbol', () => {
    const instance = shallow(<PocketBalance pocket={pocket} />);

    expect(
      instance.find('[data-locator="exchanger-pocket-balance-value"]').text(),
    ).toEqual(expect.stringContaining('$'));
  });
});
