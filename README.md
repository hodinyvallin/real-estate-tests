## Automation framework for a real estate platform 🏠

### Tests
- Login
  - Should log in
  - Should log out
- Registration
  - Should register a new account
  - Should not register with an existing email
  - Should not register with fields left blank
  - Should not register with invalid email
- Search (on Home page and Featured Listings page)
  - Should search by title
  - Should search by bedrooms
  - Should search by city
  - Should search by price

### Page Objects & Fixtures
- All pages in these tests have their own POM (with locators and methods).
- Some pages share/inherit from a common partial (`SearchComponent`).
- Fixtures contain most set-up and tear-down steps, such as page object instantiation, retrieving an access token, etc.
- Although I usually keep set-up/tear-down API requests in fixtures, I decided to use API POMs here (in `api_objects`), for steps like test user creation, listing creation, and deletion.

### Test Listing Generation
- New test listing data (specifically numeric data such as price, square ft, etc.) is generated through `faker`.
- The test listing's image file is streamed into the API request through `fs`.

### Configuration
- Tests are configured to run with 1 worker locally and on CI.
  - 1 worker avoids resource contention from parallel runs, which causes slower load times on the Featured Listings page and a longer overall runtime.
- Tests only run in Chromium.

### Secrets/Credential Management
- `dotenv` gives tests access to the secrets in my local `.env` file.
- Since `.env` is hidden from the repo, the same secrets are also stored in GitHub Secrets.

### Run in GitHub Actions
- All tests run headlessly via a Playwright Tests workflow in GitHub Actions on every pull request.
  - The tests can be run manually by a click on the 'Run workflow' button too.
  - Note: a Node.js version deprecation warning may appear in the logs.
- If you happen to have the secrets in `.env`, you can run tests locally:
  - Clone this repo to your local.
  - Set up the secrets in your local `.env` file, then (please) add `.env` to `.gitignore`.
  - Command `npx playwright test` or (my favorite) `npx playwright test --ui` to run all tests.

### CI run via GitHub Actions: 14 tests passed

<img width="1170" height="955" alt="Screenshot 2026-05-13 at 1 21 12 PM" src="https://github.com/user-attachments/assets/3a4f07d5-1996-4d75-ab85-54e8f1267a4d" />



