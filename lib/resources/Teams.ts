import AbstractResource from './AbstractResource';

export default class Teams extends AbstractResource {
	public path: any;

  constructor(client: any) {
    super(client);
    this.path = 'teams';
  }
}