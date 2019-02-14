export default class DataSourceObserver {
  constructor({ poolingLag, comparator, fetchHandler }) {
    if (!poolingLag) {
      throw new Error('Missing pooling lag in configuration');
    }
    if (!comparator) {
      throw new Error('Missing comparator in configuration');
    }
    if (!fetchHandler) {
      throw new Error('Missing fetchHandler in configuration');
    }

    this.config = { poolingLag, comparator, fetchHandler };
    this.isFetching = false;
    this.listeners = new Set();
    this.poolId = null;
    this.prevResult = undefined;
  }

  pool = () => {
    const { fetchHandler, poolingLag, comparator } = this.config;
    this.poolId = setTimeout(this.pool, poolingLag);

    if (this.isFetching) {
      return;
    }

    this.isFetching = true;
    Promise.resolve(fetchHandler(this.poolId))
      .finally(() => {
        this.isFetching = false;
      })
      .then(result => {
        if (comparator(this.prevResult, result)) {
          return;
        }
        this.prevResult = result;
        this.listeners.forEach(listener => listener(result));
      });
  };

  startPooling() {
    this.pool();
  }

  stopPooling() {
    if (this.poolId) {
      clearTimeout(this.poolId);
    }
  }

  subscribe(listener) {
    if (typeof listener !== 'function') {
      return;
    }
    this.listeners.add(listener);
    if (!this.poolId) {
      this.startPooling();
    }
  }

  unsubscribe(listener) {
    this.listeners.delete(listener);
    if (!this.listeners.size) {
      this.stopPooling();
    }
  }
}
