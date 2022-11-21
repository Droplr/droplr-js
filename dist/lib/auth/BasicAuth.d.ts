export default class BasicAuth {
    username: any;
    password: any;
    constructor(username: string, password: string);
    authorize(request: any): void;
}
