class RegisterPage {
  constructor(page) {
    this.page = page;
    this.firstNameField = page.getByLabel("First name");
    this.lastNameField = page.getByLabel("Last name");
    this.emailField = page.getByLabel("Email address");
    this.passwordField = page.getByLabel("Password");
    this.registerAsRealtorCheckbox = page.getByRole("checkbox", {
      name: "Register as Realtor",
    });
    this.registerButton = page.getByRole("button", { name: "Register" });
  }

  async submitRegisterForm(
    firstName,
    lastName,
    email,
    password,
    registerAsRealtor = false,
  ) {
    await this.firstNameField.fill(firstName);
    await this.lastNameField.fill(lastName);
    await this.emailField.fill(email);
    await this.passwordField.fill(password);
    if (registerAsRealtor) {
      await this.registerAsRealtorCheckbox.click();
    }
    await this.registerButton.click();
  }
}

export default RegisterPage;
