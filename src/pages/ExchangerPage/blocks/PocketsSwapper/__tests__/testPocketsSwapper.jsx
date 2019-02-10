import React from 'react';
import { render, fireEvent, cleanup } from 'react-testing-library';
import { ExchangerContext } from '../../../context/exchangerContext';
import { SWAP_POCKETS } from '../../../state/actionTypes';
import PocketsSwapper from '../PocketsSwapper';

afterEach(cleanup);

describe('ExchangeButton', () => {
  it('should handle click', () => {
    const dispatch = jest.fn();
    const activePocketType = 'mockPocketType';
    const exchangeRate = 3.31;

    const { getByTestId } = render(
      <ExchangerContext.Provider
        value={{ dispatch, activePocketType, exchangeRate }}
      >
        <PocketsSwapper />
      </ExchangerContext.Provider>,
    );

    fireEvent.click(getByTestId('exchanger-swapper'));
    expect(dispatch.mock.calls).toHaveLength(1);
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: SWAP_POCKETS,
      meta: { activePocketType, exchangeRate },
    });
  });
});
