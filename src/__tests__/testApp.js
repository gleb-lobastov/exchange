describe('App', () => {
  it('should render App component ', () => {
    const node = document.createElement('div');
    node.setAttribute('id', 'app');
    document.body.appendChild(node);
    expect(document.getElementById('app').innerHTML).toBe('');
    // eslint-disable-next-line global-require
    require('../App'); // react tree is mounted as side effect
    expect(document.getElementById('app').innerHTML).not.toBe('');
  });
});
