export default class DataSourceObserver {
  constructor({ poolingLag, comparator, fetch }) {
    if (!poolingLag) {
      throw new Error('Missing pooling lag in configuration');
    }
    if (!comparator) {
      throw new Error('Missing comparator lag in configuration');
    }
    if (!fetch) {
      throw new Error('Missing fetch lag in configuration');
    }

    this.config = { poolingLag, comparator, fetch };
    this.isFetching = false;
    this.listeners = new Set();
    this.poolId = null;
    this.prevResult = undefined;
  }

  pool = () => {
    const { fetch, poolingLag, comparator } = this.config;
    this.poolId = setTimeout(this.pool, poolingLag);

    if (this.isFetching) {
      return;
    }

    this.isFetching = true;
    Promise.resolve(fetch(this.poolId)).then(result => {
      this.isFetching = false;
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
