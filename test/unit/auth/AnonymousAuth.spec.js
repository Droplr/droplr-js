const chai = require('chai');

const { expect } = chai;
const AnonymousAuth = require('../../../lib/auth/AnonymousAuth');

describe('auth/AnonymousAuth', () => {
  describe('authorize', () => {
    it('should do nothing with request', async () => {
      const auth = new AnonymousAuth();
      const request = { foo: 'bar' };

      auth.authorize(request);

      expect(request).eql({ foo: 'bar' });
    });
  });
});
