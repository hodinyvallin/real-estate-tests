import { test, expect } from "../fixtures/shared_fixtures.js";
const userCredentials = require("../../test_data/userCredentials.json");

test.describe("Login", () => {
  test("User can login with valid credentials", async ({ home, login, dashboard, page }) => {
    await home.clickLoginLink();
    await login.loginUser(userCredentials.admin.email, userCredentials.admin.password);
    await page.waitForLoadState("domcontentloaded");

    await expect(dashboard.userFullName).toHaveText(`${userCredentials.admin.firstName} ${userCredentials.admin.lastName}`);
    await expect(dashboard.userRole).toHaveText(`role: ${userCredentials.admin.role}`);
  });

  test("User can log out", async ({ dashboard, authenticatedPage, page }) => {
    await authenticatedPage.goto("/dashboard/user/profile");
    await page.waitForLoadState('domcontentloaded');
    await dashboard.logoutUser();

    await expect(page.getByText("Sign in to Delek Homes")).toBeVisible();
  });
});
