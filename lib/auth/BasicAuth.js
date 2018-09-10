class BasicAuth {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }

  authorize(request) {
    request.auth = {
      username: this.username,
      password: this.password,
    };
  }
}

module.exports = BasicAuth;
