import AbstractResource from './AbstractResource';
import Client from '../Client';

export default class Boards extends AbstractResource {
	public path: any;
	public _put: any;

  constructor(client: Client) {
    super(client);
    this.path = 'boards';
  }

  watch(id: any, options?: any) {
    return this._put(`${this.path}/${id}/watch`, undefined, options);
  }
}
