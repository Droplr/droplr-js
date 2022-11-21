export default class JwtAuth {
	public token: any;

  constructor(token: any) {
    this.token = token;
  }

  authorize(request: any) {
    if (!request.headers) request.headers = {};
    request.headers.authorization = `Bearer ${this.token}`;
  }
}