const { assert } = require('chai');
const _ = require('lodash');
const AbstractResource = require('./AbstractResource');

class Drops extends AbstractResource {
  constructor(client) {
    super(client);
    this.path = 'drops';
  }

  get(id, params = {}, options = {}) {
    const localOptions = {
      headers: {},
    };

    if (params.password) {
      localOptions.headers['x-drop-password'] = params.password;
    }
    if (params.contentDisposition) {
      localOptions.headers['content-disposition'] = params.contentDisposition;
    }

    return super.get(id, _.merge(localOptions, options));
  }

  create(data, options = {}) {
    const endpoints = {
      NOTE: 'notes',
      LINK: 'links',
      FILE: 'files',
    };

    assert.isObject(data);
    assert.property(endpoints, data.type, 'You have to specify proper drop type');

    const localOptions = {
      headers: {
        'content-type': data.variant,
      },
      params: {},
    };

    if (data.board) localOptions.params.board = data.board;

    if (data.type === 'FILE') {
      if (data.title) localOptions.params.filename = data.title;
      if (data.pixelDensity) localOptions.params.pixel_density = data.pixelDensity;
    }

    if (data.type === 'LINK') {
      localOptions.headers['content-type'] = 'text/plain';
    }

    const endpoint = endpoints[data.type];
    return this._post(endpoint, data.content, _.merge(localOptions, options));
  }

  getStats(id, options = {}) {
    return this._get(`${this.path}/${id}/stats`, options);
  }

  getReferrers(id, options = {}) {
    return this._get(`${this.path}/${id}/referrers`, options);
  }

  view(id, options = {}) {
    return this._post(`${this.path}/${id}/view`, undefined, options);
  }

  listHits(id, params = {}, options = {}) {
    const localOptions = {
      params,
    };

    return this._list(`${this.path}/${id}/hits`, _.merge(localOptions, options));
  }
}

module.exports = Drops;
