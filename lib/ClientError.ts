export default class ClientError extends Error {
	public code: any;
	public message: any;
	public statusCode: any;
	public errors: any;
	public request: any;
	public response: any;
	public httpError: any;

  constructor(httpError: any) {
    super();

    const response = httpError.response || {};
    const responseData = response.data || {};
    this.code = responseData.code || response.status;
    this.message = responseData.message || response.statusText;
    this.statusCode = responseData.statusCode || response.status;
    this.errors = responseData.errors || [];

    this.request = httpError.request;
    this.response = response;
    this.httpError = httpError;
  }
}

