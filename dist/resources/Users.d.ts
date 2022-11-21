import AbstractResource from './AbstractResource';
export default class Users extends AbstractResource {
    path: any;
    _get: any;
    _post: any;
    _delete: any;
    constructor(client: any);
    current(params?: any, options?: any): any;
    create(data: any, options?: any): any;
    delete(id: any, options?: any): any;
    getTags(id: any, options?: any): any;
}
