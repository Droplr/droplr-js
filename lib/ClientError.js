class ClientError extends Error {
  constructor(httpError) {
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

module.exports = ClientError;
