const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
const Client = require('../../../lib/Client');
const AbstractResource = require('../../../lib/resources/AbstractResource');

chai.use(sinonChai);

describe('Client', () => {
  beforeEach(() => {
    this.client = new Client();
    sinon.stub(this.client, 'get').returns({
      headers: {
        'x-results-count': '100',
        'x-has-more': 'true',
      },
      data: {},
    });
    sinon.stub(this.client, 'post').returns({ data: {} });
    sinon.stub(this.client, 'put').returns({ data: {} });
    sinon.stub(this.client, 'delete').returns({ data: {} });
  });

  describe('constructor', () => {
    it('should construct class', async () => {
      const client = new Client();
      const res = new AbstractResource(client);

      expect(res.client).eql(client);
    });
  });

  describe('get', () => {
    it('should invoke client method', async () => {
      const res = new AbstractResource(this.client);
      res.path = 'path';

      const options = { a: 1, b: 2 };

      const result = await res.get(123, options);

      expect(result).eql({});
      expect(this.client.get).calledOnce.calledWith('path/123', options);
    });
  });

  describe('list', () => {
    it('should invoke client method', async () => {
      const res = new AbstractResource(this.client);
      res.path = 'path';

      const params = { limit: 100 };
      const options = { a: 1, b: 2 };

      const result = await res.list(params, options);

      expect(result).eql({
        count: '100',
        hasMore: 'true',
        results: {},
      });
      expect(this.client.get).calledOnce.calledWith('path', {
        a: 1,
        b: 2,
        params: {
          limit: 100,
        },
      });
    });
  });

  describe('create', () => {
    it('should invoke client method', async () => {
      const res = new AbstractResource(this.client);
      res.path = 'path';

      const data = { some: 'data' };
      const options = { a: 1, b: 2 };

      const result = await res.create(data, options);

      expect(result).eql({});
      expect(this.client.post).calledOnce.calledWith('path', data, options);
    });
  });

  describe('update', () => {
    it('should invoke client method', async () => {
      const res = new AbstractResource(this.client);
      res.path = 'path';

      const data = { some: 'data' };
      const options = { a: 1, b: 2 };

      const result = await res.update('123', data, options);

      expect(result).eql({});
      expect(this.client.put).calledOnce.calledWith('path/123', data, options);
    });
  });

  describe('delete', () => {
    it('should invoke client method', async () => {
      const res = new AbstractResource(this.client);
      res.path = 'path';

      const options = { a: 1, b: 2 };

      const result = await res.delete('123', options);

      expect(result).eql({});
      expect(this.client.delete).calledOnce.calledWith('path/123', options);
    });
  });
});
