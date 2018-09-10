const chai = require('chai');
const axios = require('axios');
const sinonChai = require('sinon-chai');

const { expect } = chai;
const Client = require('../../lib/Client');
const ClientError = require('../../lib/ClientError');
const AnonymousAuth = require('../../lib/auth/AnonymousAuth');
const Boards = require('../../lib/resources/Boards');
const Drops = require('../../lib/resources/Drops');
const Teams = require('../../lib/resources/Teams');
const Users = require('../../lib/resources/Users');
const RootRedirect = require('../../lib/resources/RootRedirect');
const sinon = require('sinon').createSandbox();

chai.use(sinonChai);

const myAuthorizer = {
  authorize: (request) => {
    request.headers.foo = 'bar';
  },
};

describe('Client', () => {
  describe('constructor', () => {
    it('should construct class with default options', async () => {
      const client = new Client();

      expect(client.options.baseUrl).eql('https://api.droplr.com');
      expect(client.options.auth).instanceOf(AnonymousAuth);
      expect(client.options.requestDefaults).eql({});
      expect(client.boards).instanceOf(Boards);
      expect(client.drops).instanceOf(Drops);
      expect(client.teams).instanceOf(Teams);
      expect(client.users).instanceOf(Users);
      expect(client.rootRedirect).instanceOf(RootRedirect);
    });

    it('should construct class with custom options', async () => {
      const options = {
        baseUrl: 'http://api-test.com',
        auth: myAuthorizer,
        requestDefaults: {
          headers: {
            'user-agent': 'my-agent',
            foo: 'bar',
          },
        },
      };

      const client = new Client(options);

      expect(client.options).eql(options);
    });
  });

  describe('get', () => {
    it('should invoke _request', async () => {
      const client = new Client();
      const options = { a: 1, b: 2 };
      const response = { some: 'response' };

      sinon.stub(client, '_request').resolves(response);

      const result = await client.get('path', options);
      expect(result).eql(response);
      expect(client._request).calledOnce.calledWith('get', 'path', options);
    });
  });

  describe('post', () => {
    it('should invoke _request', async () => {
      const client = new Client();
      const data = { data: 'foo' };
      const options = { a: 1, b: 2 };
      const response = { some: 'response' };

      sinon.stub(client, '_request').resolves(response);

      const result = await client.post('path', data, options);
      expect(result).eql(response);
      expect(client._request).calledOnce.calledWith('post', 'path', Object.assign(options, { data }));
    });
  });

  describe('put', () => {
    it('should invoke _request', async () => {
      const client = new Client();
      const data = { data: 'foo' };
      const options = { a: 1, b: 2 };
      const response = { some: 'response' };

      sinon.stub(client, '_request').resolves(response);

      const result = await client.put('path', data, options);
      expect(result).eql(response);
      expect(client._request).calledOnce.calledWith('put', 'path', Object.assign(options, { data }));
    });
  });

  describe('delete', () => {
    it('should invoke _request', async () => {
      const client = new Client();
      const options = { a: 1, b: 2 };
      const response = { some: 'response' };

      sinon.stub(client, '_request').resolves(response);

      const result = await client.delete('path', options);
      expect(result).eql(response);
      expect(client._request).calledOnce.calledWith('delete', 'path', options);
    });
  });

  describe('delete', () => {
    it('should invoke _request', async () => {
      const client = new Client();
      const options = { a: 1, b: 2 };
      const response = { some: 'response' };

      sinon.stub(client, '_request').resolves(response);

      const result = await client.delete('path', options);
      expect(result).eql(response);
      expect(client._request).calledOnce.calledWith('delete', 'path', options);
    });
  });

  describe('_request', () => {
    it('should invoke _request', async () => {
      const client = new Client();
      const options = { a: 1, b: 2 };
      const response = { data: 'response' };

      sinon.stub(axios, 'request').resolves(response);
      sinon.spy(client, '_handleResponse');
      sinon.spy(client.options.auth, 'authorize');

      const result = await client._request('get', 'path', options);

      expect(result).eql(response);

      const request = Object.assign({
        url: 'https://api.droplr.com/path',
        method: 'get',
      }, options);

      expect(client.options.auth.authorize).calledOnce.calledWith(request);
      expect(axios.request).calledOnce.calledWith(request);
      expect(client._handleResponse).calledOnce.calledWith(request, response);
    });
  });

  describe('_handleResponse', () => {
    it('should call onResponse if passed', async () => {
      const onResponse = sinon.stub();
      const client = new Client({
        onResponse,
      });

      const request = { foo: 'bar' };
      const response = { data: 'content' };

      const result = await client._handleResponse(request, response);

      expect(result).eql(response);
      expect(onResponse).calledOnce.calledWith(request, response);
    });
  });

  describe('_handleError', () => {
    it('should call onError if passed', async () => {
      const onError = sinon.stub();
      const client = new Client({
        onError,
      });

      const request = { foo: 'bar' };
      const error = { message: 'Error' };
      const clientError = new ClientError(error);

      try {
        await client._handleError(request, error);
        throw new Error('Should fail');
      } catch (e) {
        expect(e).deep.include(clientError);
        expect(onError).calledOnce.calledWith(request, sinon.match.instanceOf(ClientError));
      }
    });
  });
});
