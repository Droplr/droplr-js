const axios = require('axios');
const _ = require('lodash');
const fetchAdapter = require('@vespaiach/axios-fetch-adapter');
const ClientError = require('./ClientError');
const AnonymousAuth = require('./auth/AnonymousAuth');
const Boards = require('./resources/Boards');
const Drops = require('./resources/Drops');
const Teams = require('./resources/Teams');
const Users = require('./resources/Users');
const RootRedirect = require('./resources/RootRedirect');

class Client {
  constructor(options) {
    this.options = _.merge({
      baseUrl: 'https://api.droplr.com',
      auth: new AnonymousAuth(),
      adapter: fetchAdapter,
    }, options);

    this.boards = new Boards(this);
    this.drops = new Drops(this);
    this.teams = new Teams(this);
    this.users = new Users(this);
    this.rootRedirect = new RootRedirect(this);
  }

  get(path, options) {
    return this._request('get', path, options);
  }

  post(path, data, options = {}) {
    const config = options;
    config.data = data;

    return this._request('post', path, config);
  }

  put(path, data, options = {}) {
    const config = options;
    config.data = data;
    return this._request('put', path, config);
  }

  delete(path, options = {}) {
    return this._request('delete', path, options);
  }

  async _request(method, path, config) {
    let request = config;
    request.url = `${this.options.baseUrl}/${path}`;
    request.method = method;

    this.options.auth.authorize(request);
    request = _.merge(request, this.options);
    delete request.auth;

    try {
      const response = await axios(request);
      return this._handleResponse(request, response);
    } catch (error) {
      return this._handleError(request, error);
    }
  }

  async _handleResponse(request, response) {
    if (this.options.onResponse) {
      await Promise.resolve(this.options.onResponse(request, response));
    }

    return response;
  }

  async _handleError(request, error) {
    const clientError = new ClientError(error);

    if (this.options.onError) {
      await Promise.resolve(this.options.onError(request, clientError));
    }

    throw clientError;
  }
}

module.exports = Client;
