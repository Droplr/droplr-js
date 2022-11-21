import axios from 'axios';
import * as _ from 'lodash';
import ClientError from './ClientError';
import AnonymousAuth from './auth/AnonymousAuth';
import Boards from './resources/Boards';
import Drops from './resources/Drops';
import Teams from './resources/Teams';
import Users from './resources/Users';
import RootRedirect from './resources/RootRedirect';

export default class Client {
	public options: any;
	public boards: any;
	public drops: any;
	public teams: any;
	public users: any;
	public rootRedirect: any;

  constructor(options?: any) {
    this.options = _.merge({
      baseUrl: 'https://api.droplr.com',
      auth: new AnonymousAuth(),
    }, options);

    this.boards = new Boards(this);
    this.drops = new Drops(this);
    this.teams = new Teams(this);
    this.users = new Users(this);
    this.rootRedirect = new RootRedirect(this);
  }

  get(path: any, options?: any) {
    return this._request('get', path, options);
  }

  post(path: any, data?: any, options?: any) {
    const config = options;
    config.data = data;

    return this._request('post', path, config);
  }

  put(path: any, data?: any, options?: any) {
    const config = options;
    config.data = data;
    return this._request('put', path, config);
  }

  delete(path: any, options?: any) {
    return this._request('delete', path, options);
  }

  async _request(method: any, path?: any, config?: any) {
    let request = config;
    request.url = `${this.options.baseUrl}/${path}`;
    request.method = method;

    this.options.auth.authorize(request);
    request = _.merge(request, this.options);

    try {
      const response = await axios.request(request);
      return this._handleResponse(request, response);
    } catch (error) {
      return this._handleError(request, error);
    }
  }

  async _handleResponse(request: any, response?: any) {
    if (this.options.onResponse) {
      await Promise.resolve(this.options.onResponse(request, response));
    }

    return response;
  }

  async _handleError(request: any, error: any) {
    const clientError = new ClientError(error);

    if (this.options.onError) {
      await Promise.resolve(this.options.onError(request, clientError));
    }

    throw clientError;
  }
}
