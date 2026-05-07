class DashBoardPage {
  constructor(page) {
    this.page = page;
    this.userFullName = page.locator("h6.MuiTypography-subtitle2");
    this.userRole = page.locator("a p.MuiTypography-body2");
    this.profileIcon = page.locator('button[type="button"] img');
    this.logoutMenuItem = page.getByRole("menuitem", { name: "Logout" });
  }

  async logoutUser() {
    await this.profileIcon.click();
    await this.logoutMenuItem.click();
  }
}

export default DashBoardPage;
