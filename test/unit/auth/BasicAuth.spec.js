const chai = require('chai');

const { expect } = chai;
const BasicAuth = require('../../../lib/auth/BasicAuth');

describe('auth/BasicAuth', () => {
  describe('construct', () => {
    it('should construct class', async () => {
      const auth = new BasicAuth('username', 'passwd');

      expect(auth.username).eql('username');
      expect(auth.password).eql('passwd');
    });
  });

  describe('authorize', () => {
    it('should modify request', async () => {
      const auth = new BasicAuth('username', 'passwd');
      const request = { foo: 'bar' };

      auth.authorize(request);

      expect(request.auth.username).eql('username');
      expect(request.auth.password).eql('passwd');
    });
  });
});
