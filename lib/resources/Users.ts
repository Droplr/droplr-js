import * as _ from 'lodash';
import AbstractResource from './AbstractResource';

export default class Users extends AbstractResource {
	public path: any;
	public _get: any;
	public _post: any;
	public _delete: any;

  constructor(client: any) {
    super(client);
    this.path = 'users';
  }

  current(params?: any, options?: any) {
    const localOptions = { params };
    return this._get('account', _.merge(localOptions, options));
  }

  create(data: any, options?: any) {
    return this._post('account', data, options);
  }

  delete(id: any, options?: any) {
    return this._delete(`account/${id}`, options);
  }

  getTags(id: any, options?: any) {
    return this._get(`${this.path}/${id}/tags`, options);
  }
}
