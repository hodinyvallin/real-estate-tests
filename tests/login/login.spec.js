import { test, expect } from "../fixtures/sharedFixtures.js";

test.describe("Login", () => {
  test("User can log in with valid credentials", async ({
    home,
    login,
    dashboard,
    page,
  }) => {
    await home.clickLoginLink();
    await login.loginUser(process.env.ADMIN_EMAIL, process.env.ADMIN_PASSWORD);
    await page.waitForLoadState("domcontentloaded");

    await expect(dashboard.userFullName).toHaveText(
      `${process.env.ADMIN_FIRST_NAME} ${process.env.ADMIN_LAST_NAME}`,
    );
    await expect(dashboard.userRole).toHaveText(
      `role: ${process.env.ADMIN_ROLE}`,
    );
  });

  test("User can log out", async ({ dashboard, authenticatedPage, page }) => {
    await authenticatedPage.goto("/dashboard/user/profile");
    await page.waitForLoadState("domcontentloaded");
    await dashboard.logoutUser();

    await expect(page.getByText("Sign in to Delek Homes")).toBeVisible();
  });
});
