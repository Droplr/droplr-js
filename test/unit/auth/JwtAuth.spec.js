const chai = require('chai');

const { expect } = chai;
const JwtAuth = require('../../../lib/auth/JwtAuth');

describe('auth/JwtAuth', () => {
  describe('construct', () => {
    it('should construct class', async () => {
      const auth = new JwtAuth('sometoken');

      expect(auth.token).eql('sometoken');
    });
  });

  describe('authorize', () => {
    it('should modify request', async () => {
      const auth = new JwtAuth('sometoken');
      const request = { foo: 'bar' };

      auth.authorize(request);

      expect(request.headers.authorization).eql('Bearer sometoken');
    });
  });
});
