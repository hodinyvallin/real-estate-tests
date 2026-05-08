class UsersApi {
  constructor(request, accessToken) {
    this.request = request;
    this.accessToken = accessToken;
  }

  async getUserData(userEmail) {
    const response = await this.request.get("/api/users", {
      headers:  { 
        authorization: `Bearer ${this.accessToken}` 
      }
    });
    const body = await response.json();
    let targetUserData;

    for (const currentUser of body) {
      if (currentUser.email === userEmail) {
        targetUserData = currentUser;
      }
    }

    return targetUserData;
  }

  async getUserId(userEmail) {
    const userData = await this.getUserData(userEmail);
    return userData.id;
  }

  async createUser(
    firstName,
    lastName,
    email,
    password,
    isRealtor = "false",
  ) {
    const response = await this.request.post("/api/users", {
      data: {
        username: firstName,
        user_surname: lastName,
        email: email,
        password: password,
        avatarUrl: "",
        isRealtor: isRealtor,
      },
      headers: { 
        authorization: `Bearer ${this.accessToken}` 
      }
    });
  }

  async deleteUser(id) {
    await this.request.delete(`/api/users/${id}`, {
      headers: {
        authorization: `Bearer ${this.accessToken}`,
      },
    });
  }
}

export default UsersApi;