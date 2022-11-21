export default class BasicAuth {
	public username: any;
	public password: any;

  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }

  authorize(request: any) {
    request.auth = {
      username: this.username,
      password: this.password,
    };
  }
}
