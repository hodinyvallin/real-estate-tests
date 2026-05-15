class AuthenticationApi {
  constructor(request) {
    this.request = request;
  }

  async loginUser(email, password) {
    const response = await this.request.post("/api/users/login", {
      data: {
        email: email,
        password: password,
      },
    });

    const body = await response.json();
    return body.accessToken;
  }
}

export default AuthenticationApi;
