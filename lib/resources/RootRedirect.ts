import * as _ from 'lodash';

export default class RootRedirect {
	public client: any;

  constructor(client: any) {
    this.client = client;
  }

  async get(params: any, options?: any) {
    const localOptions = { params };

    const response = await this.client.get('root_redirect', _.merge(localOptions, options));
    return response.data;
  }
}

