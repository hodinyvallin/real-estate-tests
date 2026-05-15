## E2E automation for a real estate platform 🏠

> E2E tests for the core functionalities of a real estate platform.
> Uses Playwright, JavaScript, GitHub Actions, GitHub Secrets, dotenv, and faker.

---

### Tests

- Login
  - User can log in with valid credentials
  - User can log out
- Registration
  - User can register a new account
  - Registration fails when user registers an existing email account
  - Registration fails when user leaves required fields blank
  - Registration fails when user inputs invalid email
- Search (on Home page and Featured Listings page)
  - User can search by title
  - User can search by bedroom count
  - User can search by city
  - User can search by price

---

### Page Object Model

- The locators and actions for each page are encapsulated in a page object.
- Some pages which share common locators and actions inherit from the partial `SearchComponent`.
- The actions for the API requests are encapsulated in API objects (basically POM for APIs).
- Although I prefer to keep set-up/tear-down API actions in fixtures, I decided to follow an API POM design for steps like:
  - Authenticating a user (`AuthenticationApi`)
  - Creating and deleting a mock user account (`UsersApi`)
  - Creating and deleting a mock real estate listing (`ListingApi`)

---

### Fixtures

- `sharedFixtures` contain common set-up steps such as:
  - Page object instantiation
  - Retrieving an access token
  - Authenticating the context/current session
- `searchFixtures` extend the base further to contain search-related set-up and tear-down:
  - Create, use in test, then delete a mock listing

---

### Mock Listing Generation

- New mock listing data (specifically numeric data like price, lot size, etc.) is generated through the `faker` library.
- The .png file is streamed into the API request through the `fs` module, so that the server receives and displays the image.

---

### Authentication Handling

- Via `AuthenticationApi`, credentials are read from environment variables and exchanged for an access token, keeping the credentials hidden and auth logic reusable.
- Via `authenticatedPage` fixture, the access token is injected into the browser's `localStorage` to authenticate the context, bypassing the login UI entirely.

---

### Secrets/Credential Management

- `dotenv` gives tests access to the credentials in my local `.env` file.
- Since `.env` is hidden from this remote repo, the credentials are also stored in GitHub Secrets.

---

### Configuration

- Tests are configured to run with 1 worker locally and on CI.
  - 1 worker avoids resource contention from parallel runs, which causes slower load times on the Featured Listings page and a longer overall runtime.
- Tests only run in Chromium.

---

### Run in CI

To run all tests in GitHub Actions:

1. Go to Actions
2. Go to the Playwright Tests workflow on the left panel
3. Click on the 'Run workflow' button on the top right

Note that:

- Tests run headlessly (invisibly) in CI.
- The `workflow_dispatch` event trigger enables us to manually run tests with a click on the 'Run workflow' button.
- All tests will run on every pull request via the same workflow.

---

### Test Report

To view a HTML report of the test run:

1. Go to Actions
2. Click on the most recent run of the Playwright Tests workflow
3. Go to Summary on the left panel
4. Scroll down to Artifacts
5. Download playwright-report.zip
6. Open the .html file to view the test report

---

### Test Results

> 14 tests passed in CI

---
