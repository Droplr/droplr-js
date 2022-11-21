import { assert } from 'chai';
import * as _ from 'lodash';
import AbstractResource from './AbstractResource';

export default class Drops extends AbstractResource {
	public path: any;
	public _post: any;
	public _get: any;
	public _list: any;

  constructor(client: any) {
    super(client);
    this.path = 'drops';
  }

  get(id: any, params?: any, options?: any) {
    const localOptions = {
      headers: {
        'x-drop-password': null,
        'content-disposition': null,
      },
    };

    if (params.password) {
      localOptions.headers['x-drop-password'] = params.password;
    }
    if (params.contentDisposition) {
      localOptions.headers['content-disposition'] = params.contentDisposition;
    }

    return super.get(id, _.merge(localOptions, options));
  }

  create(data: any, options?: any) {
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
      params: {
        board: null,
        filename: null,
        pixel_density: null,
      },
    };

    if (data.board) localOptions.params.board = data.board;

    if (data.type === 'FILE') {
      if (data.title) localOptions.params.filename = data.title;
      if (data.pixelDensity) localOptions.params.pixel_density = data.pixelDensity;
    }

    if (data.type === 'LINK') {
      localOptions.headers['content-type'] = 'text/plain';
    }

    const endpoint = endpoints[data.type as keyof typeof endpoints];
    return this._post(endpoint, data.content, _.merge(localOptions, options));
  }

  getStats(id: any, options?: any) {
    return this._get(`${this.path}/${id}/stats`, options);
  }

  getReferrers(id: any, options?: any) {
    return this._get(`${this.path}/${id}/referrers`, options);
  }

  view(id: any, options?: any) {
    return this._post(`${this.path}/${id}/view`, undefined, options);
  }

  listHits(id: any, params?: any, options?: any) {
    const localOptions = {
      params,
    };

    return this._list(`${this.path}/${id}/hits`, _.merge(localOptions, options));
  }
}
