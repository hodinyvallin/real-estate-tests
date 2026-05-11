import { test, expect } from "@playwright/test";
import HomePage from "../../page_objects/HomePage";
import RegisterPage from "../../page_objects/RegisterPage";
import DashBoardPage from "../../page_objects/DashBoardPage";
import AuthenticationApi from "../../api_objects/AuthenticationApi";
import UsersApi from "../../api_objects/UsersApi";
const userCredentials = require('../../test_data/userCredentials.json');

test.describe("Registration", () => {
  let home, register, dashboard, authenticationApi, usersApi, accessToken, userId;

  test.beforeEach('Authenticate admin and set up API request objects', async ({ page, request }) => {
    authenticationApi = new AuthenticationApi(request);
    accessToken = await authenticationApi.loginUser(process.env.ADMIN_EMAIL, process.env.ADMIN_PASSWORD);
    usersApi = new UsersApi(request, accessToken);

    home = new HomePage(page);
    register = new RegisterPage(page);

    await page.goto(process.env.BASE_URL);
    await home.clickRegisterLink();
  });
  
  test("User can register new account", async ({ page }) => {
    dashboard = new DashBoardPage(page);

    await register.submitRegisterForm(
      userCredentials.user.firstName,
      userCredentials.user.lastName,
      userCredentials.user.email,
      userCredentials.user.password
    );
    await page.waitForURL('**/dashboard/user/profile')
    userId = await usersApi.getUserId(userCredentials.user.email);

    await expect(dashboard.userFullName).toHaveText(`${userCredentials.user.firstName} ${userCredentials.user.lastName}`);
    await expect(dashboard.userRole).toHaveText(`role: ${userCredentials.user.role}`);
  });

  test("Registration fails when user registers an existing email account", async ({ page }) => {
    await usersApi.createUser(
      userCredentials.realtor.firstName,
      userCredentials.realtor.lastName,
      userCredentials.realtor.email,
      userCredentials.realtor.password,
      "true",
    );
    userId = await usersApi.getUserId(userCredentials.realtor.email);
    
    await register.submitRegisterForm(
      userCredentials.realtor.firstName,
      userCredentials.realtor.lastName,
      userCredentials.realtor.email,
      userCredentials.realtor.password,
      true,
    );
    await page.waitForLoadState("domcontentloaded");

    await expect(page.getByText("Input data validation failed")).toBeVisible();
  });

  test("Registration fails when user leaves required fields blank", async ({ page }) => {
    await register.registerButton.click();
    await page.waitForLoadState("domcontentloaded");

    await expect(page.getByText("First name required")).toBeVisible();
    await expect(page.getByText("Last name required")).toBeVisible();
    await expect(page.getByText("Email is required")).toBeVisible();
    await expect(page.getByText("Password is required")).toBeVisible();
  });

  test("Registration fails when user inputs invalid email", async ({ page }) => {
    await register.submitRegisterForm(
      userCredentials.admin.firstName,
      userCredentials.admin.lastName,
      "admin.gmail.com",
      process.env.ADMIN_PASSWORD,
    );
    await page.waitForLoadState("domcontentloaded");

    await expect(page.getByText("Email must be a valid email address")).toBeVisible();
  });

  test.afterEach('Tear down test data if any remain', async () => {
    if (userId !== undefined) {
      await usersApi.deleteUser(userId);
    }
    userId = undefined;
  });
});
