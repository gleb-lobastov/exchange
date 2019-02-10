import React from 'react';
import { shallow } from 'enzyme';
import AccountBalance from '../AccountBalance';

const noop = () => {};

let account;
beforeEach(() => {
  account = { balance: 2.54313, currencyCode: 'USD' };
});

describe('AccountBalance', () => {
  it('should render passed balance', () => {
    const instance = shallow(
      <AccountBalance account={account} onClick={noop} />,
    ).dive();

    expect(
      instance.find('[data-locator="exchanger-pocket-balance-value"]').text(),
    ).toEqual(expect.stringContaining('2.54'));
  });

  it('should render currency symbol', () => {
    const instance = shallow(
      <AccountBalance account={account} onClick={noop} />,
    ).dive();

    expect(
      instance.find('[data-locator="exchanger-pocket-balance-value"]').text(),
    ).toEqual(expect.stringContaining('$'));
  });
});
