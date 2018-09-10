const _ = require('lodash');
const AbstractResource = require('./AbstractResource');

class Users extends AbstractResource {
  constructor(client) {
    super(client);
    this.path = 'users';
  }

  current(params = {}, options = {}) {
    const localOptions = { params };
    return this._get('account', _.merge(localOptions, options));
  }

  create(data, options = {}) {
    return this._post('account', data, options);
  }

  delete(id, options = {}) {
    return this._delete(`account/${id}`, options);
  }

  getTags(id, options = {}) {
    return this._get(`${this.path}/${id}/tags`, options);
  }
}

module.exports = Users;
