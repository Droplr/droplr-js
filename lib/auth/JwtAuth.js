class JwtAuth {
  constructor(token) {
    this.token = token;
  }

  authorize(request) {
    if (!request.headers) request.headers = {};
    request.headers.authorization = `Bearer ${this.token}`;
  }
}

module.exports = JwtAuth;
