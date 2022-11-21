import AbstractResource from './AbstractResource';
import Client from '../Client';
export default class Boards extends AbstractResource {
    path: any;
    _put: any;
    constructor(client: Client);
    watch(id: any, options?: any): any;
}
