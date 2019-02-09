import React from 'react';
import { shallow } from 'enzyme';
import PocketBalance from '../PocketBalance';

describe('PocketBalance', () => {
  it('should render passed balance', () => {
    const instance = shallow(
      <PocketBalance amount={2.54313} currencyCode="USD" />,
    );

    expect(
      instance.find('[data-locator="exchanger-pocket-balance-value"]').text(),
    ).toEqual(expect.stringContaining('2.54'));
  });

  it('should render currency symbol', () => {
    const instance = shallow(
      <PocketBalance amount={2.54313} currencyCode="USD" />,
    );

    expect(
      instance.find('[data-locator="exchanger-pocket-balance-value"]').text(),
    ).toEqual(expect.stringContaining('$'));
  });
});
