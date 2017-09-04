const middleware = require('./index')

describe('Test', () => {
  const res = {};
  const next = () => {};
  let headers = {}
  const req = { headers };
  it('may return', () => {
    middleware()(req, res, next);
    expect(window.location).toBe(false);
  });
});
