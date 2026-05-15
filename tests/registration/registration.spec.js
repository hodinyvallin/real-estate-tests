import { test, expect } from "../fixtures/sharedFixtures";
import UsersApi from "../../api_objects/UsersApi";
import userData from "../../test_data/mockUserData.json";

test.describe("Registration", () => {
  let usersApi, userId;

  test.beforeEach(
    "Authenticate admin and set up API request objects",
    async ({ page, request, accessToken, home }) => {
      const adminAccessToken = accessToken;
      usersApi = new UsersApi(request, adminAccessToken);

      await home.clickRegisterLink();
    },
  );

  test("User can register new account", async ({
    page,
    register,
    dashboard,
  }) => {
    await register.submitRegisterForm(
      userData.user.firstName,
      userData.user.lastName,
      process.env.USER_EMAIL,
      process.env.USER_PASSWORD,
    );
    await page.waitForURL("**/dashboard/user/profile");
    userId = await usersApi.getUserId(process.env.USER_EMAIL);

    await expect(dashboard.userFullName).toHaveText(
      `${userData.user.firstName} ${userData.user.lastName}`,
    );
    await expect(dashboard.userRole).toHaveText(`role: ${userData.user.role}`);
  });

  test("Registration fails when user registers an existing email account", async ({
    page,
    register,
  }) => {
    await usersApi.createUser(
      userData.realtor.firstName,
      userData.realtor.lastName,
      process.env.REALTOR_EMAIL,
      process.env.REALTOR_PASSWORD,
      "true",
    );
    userId = await usersApi.getUserId(process.env.REALTOR_EMAIL);

    await register.submitRegisterForm(
      userData.realtor.firstName,
      userData.realtor.lastName,
      process.env.REALTOR_EMAIL,
      process.env.REALTOR_PASSWORD,
      true,
    );
    await page.waitForLoadState("domcontentloaded");

    await expect(page.getByText("Input data validation failed")).toBeVisible();
  });

  test("Registration fails when user leaves required fields blank", async ({
    page,
    register,
  }) => {
    await register.registerButton.click();
    await page.waitForLoadState("domcontentloaded");

    await expect(page.getByText("First name required")).toBeVisible();
    await expect(page.getByText("Last name required")).toBeVisible();
    await expect(page.getByText("Email is required")).toBeVisible();
    await expect(page.getByText("Password is required")).toBeVisible();
  });

  test("Registration fails when user inputs invalid email", async ({
    page,
    register,
  }) => {
    await register.submitRegisterForm(
      process.env.ADMIN_FIRST_NAME,
      process.env.ADMIN_LAST_NAME,
      "example.gmail.com",
      process.env.ADMIN_PASSWORD,
    );
    await page.waitForLoadState("domcontentloaded");

    await expect(
      page.getByText("Email must be a valid email address"),
    ).toBeVisible();
  });

  test.afterEach("Tear down test data if any remain", async () => {
    if (userId !== undefined) {
      await usersApi.deleteUser(userId);
    }
    userId = undefined;
  });
});
