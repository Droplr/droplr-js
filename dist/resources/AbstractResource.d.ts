export default class AbstractResource {
    client: any;
    path: any;
    constructor(client: any);
    get(id: any, options?: any): Promise<any>;
    list(params?: any, options?: any): Promise<{
        count: any;
        hasMore: any;
        results: any;
    }>;
    create(data: any, options?: any): Promise<any>;
    update(id: any, data: any, options?: any): Promise<any>;
    delete(id: any, options?: any): Promise<any>;
    _get(path: any, options?: any): Promise<any>;
    _list(path: any, options?: any): Promise<{
        count: any;
        hasMore: any;
        results: any;
    }>;
    _post(path: any, data: any, options?: any): Promise<any>;
    _put(path: any, data: any, options?: any): Promise<any>;
    _delete(path: any, options?: any): Promise<any>;
}
