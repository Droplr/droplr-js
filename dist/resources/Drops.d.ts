import AbstractResource from './AbstractResource';
export default class Drops extends AbstractResource {
    path: any;
    _post: any;
    _get: any;
    _list: any;
    constructor(client: any);
    get(id: any, params?: any, options?: any): Promise<any>;
    create(data: any, options?: any): any;
    getStats(id: any, options?: any): any;
    getReferrers(id: any, options?: any): any;
    view(id: any, options?: any): any;
    listHits(id: any, params?: any, options?: any): any;
}
