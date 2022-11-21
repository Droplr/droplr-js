export default class ClientError extends Error {
    code: any;
    message: any;
    statusCode: any;
    errors: any;
    request: any;
    response: any;
    httpError: any;
    constructor(httpError: any);
}
