const _ = require('lodash');

class AbstractResource {
  constructor(client) {
    this.client = client;
  }

  get(id, options = {}) {
    return this._get(`${this.path}/${id}`, options);
  }

  list(params = {}, options = {}) {
    const localOptions = {
      params,
    };

    return this._list(this.path, _.merge(localOptions, options));
  }

  create(data, options = {}) {
    return this._post(this.path, data, options);
  }

  update(id, data, options = {}) {
    return this._put(`${this.path}/${id}`, data, options);
  }

  delete(id, options = {}) {
    return this._delete(`${this.path}/${id}`, options);
  }

  async _get(path, options = {}) {
    const response = await this.client.get(path, options);
    return response.data;
  }

  async _list(path, options = {}) {
    const response = await this.client.get(path, options);

    return {
      count: response.headers['x-results-count'],
      hasMore: response.headers['x-has-more'],
      results: response.data,
    };
  }

  async _post(path, data, options = {}) {
    const response = await this.client.post(path, data, options);
    return response.data;
  }

  async _put(path, data, options = {}) {
    const response = await this.client.put(path, data, options);
    return response.data;
  }

  async _delete(path, options = {}) {
    const response = await this.client.delete(path, options);
    return response.data;
  }
}

module.exports = AbstractResource;
