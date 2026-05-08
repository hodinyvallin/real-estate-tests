import SearchComponent from "./page_components/SearchComponent";

class HomePage extends SearchComponent {
  constructor(page) {
    super(page)
    
    this.loginLink = page.getByRole('link', { name: 'Login' });
    this.registerLink = page.getByRole('link', { name: 'Register' });
  }

  async clickLoginLink() {
    await this.loginLink.click();
    await this.page.waitForURL('**/auth/login');
  }

  async clickRegisterLink() {
    await this.registerLink.click();
    await this.page.waitForURL('**/auth/register');
  }
}

export default HomePage;