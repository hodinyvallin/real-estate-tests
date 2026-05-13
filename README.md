## Automated Tests for a Real Estate site

### Tests
- Login
  - Can log in
  - Can log out
- Registration
  - Can register a new account
  - Cannot register with an existing email
  - Cannot register with fields left blank
  - Cannot register with invalid email
- Search (on Home page and Featured Listings page)
  - Can search by title
  - Can search by bedrooms
  - Can search by city
  - Can search by price

### Page Objects & Fixtures
- All pages in these tests have their own POM (with locators and methods).
- Some pages share/inherit from a common partial (`SearchComponent`).
- Fixtures contain most set-up and tear-down steps, such as page object instantiation, retrieving an access token, etc.
- Although I usually keep set-up/tear-down API requests in fixtures, I experimented with API "POMs" here (in `api_objects`), for steps like test user creation, listing creation, and deletion.


### Configuration
- Tests are configured to run with 1 worker locally and on CI.
- Tests only run on Chromium.

### Secrets/Credential Management
- `dotenv` gives tests access to the secrets in my local `.env` file.
- Since `.env` is hidden from the repo, the same secrets are also stored in GitHub Secrets.

### Run in GitHub Actions
- All tests will run via a Playwright Tests workflow in GitHub Actions on every pull request.
  - The tests can be run manually by a click on the 'Run workflow' button too.
- If you happen to have the secrets in `.env`, you can run tests locally:
  - Clone this repo to your local machine.
  - Set up the secrets in your local `.env` file, then (please) add `.env` to `.gitignore`.
  - Command `npx playwright test` or (my favorite) `npx playwright test --ui` to run all tests.

