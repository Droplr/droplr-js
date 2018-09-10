const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
const Client = require('../../../lib/Client');
const Drops = require('../../../lib/resources/Drops');

chai.use(sinonChai);

describe('Drops', () => {
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
      const res = new Drops(client);

      expect(res.client).eql(client);
      expect(res.path).eql('drops');
    });
  });

  describe('get', () => {
    it('should properly construct request options', async () => {
      const res = new Drops(this.client);

      const params = {
        password: 'foo',
        contentDisposition: 'bar',
      };
      const options = { a: 1 };

      const result = await res.get(123, params, options);

      expect(result).eql({});
      expect(this.client.get).calledOnce.calledWith('drops/123', {
        headers: {
          'x-drop-password': 'foo',
          'content-disposition': 'bar',
        },
        a: 1,
      });
    });
  });

  describe('listHits', () => {
    it('should properly construct request options', async () => {
      const drops = new Drops(this.client);
      const params = {
        some: 'param',
      };

      const options = { a: 1 };

      const result = await drops.listHits(1, params, options);

      expect(result).eql({
        count: '100',
        hasMore: 'true',
        results: {},
      });
      expect(this.client.get).calledOnce.calledWith('drops/1/hits', {
        params: {
          some: 'param',
        },
        a: 1,
      });
    });
  });

  describe('create', () => {
    it('should properly construct request options for NOTE drop', async () => {
      const drops = new Drops(this.client);

      const data = {
        type: 'NOTE',
        content: 'Some content',
        variant: 'text/plain',
      };

      const options = { a: 1 };

      const result = await drops.create(data, options);

      expect(result).eql({});
      expect(this.client.post).calledOnce.calledWith('notes', data.content, {
        headers: {
          'content-type': data.variant,
        },
        params: {},
        a: 1,
      });
    });

    it('should properly construct request options for LINK drop', async () => {
      const drops = new Drops(this.client);

      const data = {
        type: 'LINK',
        content: 'http://foo.com',
      };

      const options = { a: 1 };

      const result = await drops.create(data, options);

      expect(result).eql({});
      expect(this.client.post).calledOnce.calledWith('links', data.content, {
        headers: {
          'content-type': 'text/plain',
        },
        params: {},
        a: 1,
      });
    });

    it('should properly construct request options for FILE drop', async () => {
      const drops = new Drops(this.client);

      const data = {
        type: 'FILE',
        content: 'file content',
        variant: 'image/png',
        title: 'Some Title',
        pixelDensity: 2,
        board: 'board1234',
      };

      const options = { a: 1 };

      const result = await drops.create(data, options);

      expect(result).eql({});
      expect(this.client.post).calledOnce.calledWith('files', data.content, {
        headers: {
          'content-type': data.variant,
        },
        params: {
          filename: data.title,
          pixel_density: data.pixelDensity,
          board: data.board,
        },
        a: 1,
      });
    });
  });
});
