import DataSourceObserver from '../DataSourceObserver';

const POOLING_LAG = 1000;

beforeEach(() => {
  jest.useFakeTimers();
});

describe('exchangeRatesObserver', () => {
  it('should fetch only if have subscribers', async () => {
    const listener = jest.fn();
    const fetchMock = jest.fn();

    const dataSourceObserver = new DataSourceObserver({
      poolingLag: POOLING_LAG,
      comparator: () => false,
      fetch: fetchMock,
    });

    dataSourceObserver.subscribe(listener);
    await jest.advanceTimersByTime(POOLING_LAG);
    await jest.advanceTimersByTime(POOLING_LAG);
    dataSourceObserver.unsubscribe(listener);
    await jest.advanceTimersByTime(POOLING_LAG);
    await jest.advanceTimersByTime(POOLING_LAG);
    await jest.advanceTimersByTime(POOLING_LAG);
    await jest.advanceTimersByTime(POOLING_LAG);
    await jest.advanceTimersByTime(POOLING_LAG);
    expect(fetchMock.mock.calls).toHaveLength(2);
  });

  it('should fetch data with specified period', async () => {
    const listener = jest.fn();
    const fetchMock = jest.fn();

    const dataSourceObserver = new DataSourceObserver({
      poolingLag: POOLING_LAG,
      comparator: () => false,
      fetch: async () => fetchMock(),
    });

    dataSourceObserver.subscribe(listener);
    await jest.advanceTimersByTime(POOLING_LAG);
    await jest.advanceTimersByTime(POOLING_LAG);
    await jest.advanceTimersByTime(POOLING_LAG);
    expect(fetchMock.mock.calls).toHaveLength(3);
    dataSourceObserver.unsubscribe(listener);
  });

  it('should notify subscribers only if rates was changed', async () => {
    const listener = jest.fn();
    const fetchMock = jest.fn();
    fetchMock.mockReturnValueOnce({ value: 1 }).mockReturnValue({ value: 3 });

    const dataSourceObserver = new DataSourceObserver({
      poolingLag: POOLING_LAG,
      comparator: ({ value: prevValue } = {}, { value: nextValue } = {}) =>
        prevValue === nextValue,
      fetch: async () => fetchMock(),
    });

    dataSourceObserver.subscribe(listener);
    await jest.advanceTimersByTime(POOLING_LAG);
    await jest.advanceTimersByTime(POOLING_LAG);
    await jest.advanceTimersByTime(POOLING_LAG);
    await jest.advanceTimersByTime(POOLING_LAG);
    await jest.advanceTimersByTime(POOLING_LAG);
    expect(listener.mock.calls).toHaveLength(2);
    dataSourceObserver.unsubscribe(listener);
  });

  it('should immediately start fetch after first subscriber is connected', async () => {
    const listener = jest.fn();
    const fetchMock = jest.fn(async () => {});

    const dataSourceObserver = new DataSourceObserver({
      poolingLag: POOLING_LAG,
      comparator: () => false,
      fetch: fetchMock,
    });

    dataSourceObserver.subscribe(listener);
    expect(fetchMock.mock.calls).toHaveLength(1);
    dataSourceObserver.unsubscribe(listener);
  });

  it('should skip pool if previous one not fetched yet', async () => {
    const listener = jest.fn();
    const fetchMock = jest.fn(async () => {
      await new Promise(resolve => setTimeout(resolve, POOLING_LAG * 10));
    });

    const dataSourceObserver = new DataSourceObserver({
      poolingLag: POOLING_LAG,
      comparator: () => false,
      fetch: fetchMock,
    });

    dataSourceObserver.subscribe(listener);
    await jest.advanceTimersByTime(POOLING_LAG);
    await jest.advanceTimersByTime(POOLING_LAG);
    await jest.advanceTimersByTime(POOLING_LAG);
    await jest.advanceTimersByTime(POOLING_LAG);
    await jest.advanceTimersByTime(POOLING_LAG);
    expect(fetchMock.mock.calls).toHaveLength(1);
    dataSourceObserver.unsubscribe(listener);
  });

  it('should notify every subscribed listener', async () => {
    const listenerA = jest.fn();
    const listenerB = jest.fn();
    const fetchMock = jest.fn(async () => {});

    const dataSourceObserver = new DataSourceObserver({
      poolingLag: POOLING_LAG,
      comparator: () => false,
      fetch: fetchMock,
    });

    dataSourceObserver.subscribe(listenerA);
    dataSourceObserver.subscribe(listenerB);
    await jest.advanceTimersByTime(POOLING_LAG);
    expect(listenerA.mock.calls).toHaveLength(1);
    expect(listenerB.mock.calls).toHaveLength(1);
    dataSourceObserver.unsubscribe(listenerA);
    dataSourceObserver.unsubscribe(listenerB);
  });
});
