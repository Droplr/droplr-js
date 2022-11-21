import * as _ from 'lodash';

export default class AbstractResource {
	public client: any;
	public path: any;

  constructor(client: any) {
    this.client = client;
  }

  get(id: any, options?: any) {
    return this._get(`${this.path}/${id}`, options);
  }

  list(params?: any, options?: any) {
    const localOptions = {
      params,
    };

    return this._list(this.path, _.merge(localOptions, options));
  }

  create(data: any, options?: any) {
    return this._post(this.path, data, options);
  }

  update(id: any, data: any, options?: any) {
    return this._put(`${this.path}/${id}`, data, options);
  }

  delete(id: any, options?: any) {
    return this._delete(`${this.path}/${id}`, options);
  }

  async _get(path: any, options?: any) {
    const response = await this.client.get(path, options);
    return response.data;
  }

  async _list(path: any, options?: any) {
    const response = await this.client.get(path, options);

    return {
      count: response.headers['x-results-count'],
      hasMore: response.headers['x-has-more'],
      results: response.data,
    };
  }

  async _post(path: any, data: any, options?: any) {
    const response = await this.client.post(path, data, options);
    return response.data;
  }

  async _put(path: any, data: any, options?: any) {
    const response = await this.client.put(path, data, options);
    return response.data;
  }

  async _delete(path: any, options?: any) {
    const response = await this.client.delete(path, options);
    return response.data;
  }
}
