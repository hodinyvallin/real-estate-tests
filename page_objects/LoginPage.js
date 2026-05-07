class LoginPage {
  constructor(page) {
    this.page = page;
    this.emailField = page.getByLabel('Email address');
    this.passwordField = page.getByLabel('Password');
    this.loginButton = page.getByRole('button', { name: 'Login' });
  }

  async loginUser(email, password) {
    await this.emailField.fill(email);
    await this.passwordField.fill(password);
    await this.loginButton.click();
  }
}

export default LoginPage;