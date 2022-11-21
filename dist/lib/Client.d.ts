export default class Client {
    options: any;
    boards: any;
    drops: any;
    teams: any;
    users: any;
    rootRedirect: any;
    constructor(options?: any);
    get(path: any, options?: any): Promise<any>;
    post(path: any, data?: any, options?: any): Promise<any>;
    put(path: any, data?: any, options?: any): Promise<any>;
    delete(path: any, options?: any): Promise<any>;
    _request(method: any, path?: any, config?: any): Promise<any>;
    _handleResponse(request: any, response?: any): Promise<any>;
    _handleError(request: any, error: any): Promise<void>;
}
