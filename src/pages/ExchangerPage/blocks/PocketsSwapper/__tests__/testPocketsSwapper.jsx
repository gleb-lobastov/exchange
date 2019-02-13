import React from 'react';
import { render, fireEvent, cleanup } from 'react-testing-library';
import { POCKET_TYPES } from '../../../consts';
import { ExchangerContext } from '../../../context/exchangerContext';
import { SWAP_POCKETS } from '../../../state/actionTypes';
import PocketsSwapper from '../PocketsSwapper';

afterEach(cleanup);

const noop = () => {};

describe('PocketsSwapper', () => {
  it('should handle click', () => {
    const dispatch = jest.fn();
    const activePocketType = POCKET_TYPES.DEBIT;

    const { getByTestId } = render(
      <ExchangerContext.Provider value={{ dispatch }}>
        <PocketsSwapper
          activePocketType={activePocketType}
          setActivePocketType={noop}
        />
      </ExchangerContext.Provider>,
    );

    fireEvent.click(getByTestId('exchanger-swapper'));
    expect(dispatch.mock.calls).toHaveLength(1);
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: SWAP_POCKETS,
    });
  });
});
