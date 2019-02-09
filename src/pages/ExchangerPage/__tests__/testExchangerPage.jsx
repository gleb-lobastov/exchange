import React from 'react';
import { render } from 'enzyme';
import ExchangerPage from '../ExchangerPage';

describe('PocketBalance', () => {
  it('should render two pockets to exchange between', () => {
    const instance = render(<ExchangerPage />);
    expect(instance.find('[data-locator="exchanger-pocket"]')).toHaveLength(2);
  });

  it('should render exchange button', () => {
    const instance = render(<ExchangerPage />);
    expect(
      instance.find('[data-locator="exchanger-action-button"]'),
    ).toHaveLength(1);
  });
});
