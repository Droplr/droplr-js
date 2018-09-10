const _ = require('lodash');

class RootRedirect {
  constructor(client) {
    this.client = client;
  }

  async get(params, options = {}) {
    const localOptions = { params };

    const response = await this.client.get('root_redirect', _.merge(localOptions, options));
    return response.data;
  }
}

module.exports = RootRedirect;
