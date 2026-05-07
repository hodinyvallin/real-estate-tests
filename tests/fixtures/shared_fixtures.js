import { test as base } from "@playwright/test";
import AuthenticationApi from "../../api_objects/AuthenticationApi.js";
import HomePage from "../../page_objects/HomePage.js";
import LoginPage from "../../page_objects/LoginPage.js";
import DashBoardPage from "../../page_objects/DashboardPage.js";
const userCredentials = require("../../test_data/userCredentials.json");

export const test = base.extend({
  accessToken: async ({ request }, use) => {
    const authenticationApi = new AuthenticationApi(request);
    const accessToken = await authenticationApi.loginUser(
      userCredentials.admin.email,
      userCredentials.admin.password
    );
    await use(accessToken);
  },
  
  authenticatedPage: async ({ accessToken, page, context }, use) => {
    await context.addInitScript((token) => {
      window.localStorage.setItem('accessToken', token);
    }, accessToken);
    await use(page);
  },

  home: async ({ page }, use) => {
    const home = new HomePage(page);
    page.goto('/');
    await use(home);
  },

  login: async ({ page }, use) => {
    const login = new LoginPage(page);
    await use(login);
  },

  dashboard: async ({ page }, use) => {
    const dashboard = new DashBoardPage(page);
    await use(dashboard);
  },
});

export { expect } from "@playwright/test";