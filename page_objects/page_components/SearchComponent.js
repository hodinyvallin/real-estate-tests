class SearchComponent {
  constructor(page) {
    this.page = page;
    this.themeToggle = page.getByRole("checkbox");
    this.searchTextbox = page.getByRole("textbox", { name: "Search" });
    this.bedroomsDropdown = page.getByRole("button", { name: "Bedrooms" });
    this.priceRange = page
      .locator("p.MuiTypography-body1")
      .filter({ hasText: "Price" });
    this.minPriceThumb = page.locator('input[type="range"][data-index="0"]');
    this.maxPriceThumb = page.locator('input[type="range"][data-index="1"]');
    this.stateDropdown = page.getByRole("button", { name: "State" });
    this.cityTextbox = page.getByRole("textbox", { name: "City" });
    this.startSearchButton = page.getByRole("button", { name: "Start Search" });
  }

  async setThemeToDark() {
    const themeToggleChecked = await this.themeToggle.isChecked();
    // true -> dark theme, false -> light theme
    if (!themeToggleChecked) {
      await this.themeToggle.click();
    }
  }

  async searchByListingTitle(title = "") {
    await this.searchTextbox.fill(title);
    await this.startSearchButton.click();
    await this.page.waitForLoadState("domcontentloaded");
  }

  async searchByBedroomCount(count = 1) {
    await this.bedroomsDropdown.click();
    await this.page.getByRole("option", { name: count + "+" }).click();
    await this.startSearchButton.click();
    await this.page.waitForLoadState("domcontentloaded");
  }

  async searchByCity(city = "") {
    await this.cityTextbox.fill(city);
    await this.startSearchButton.click();
    await this.page.waitForLoadState("domcontentloaded");
  }

  async searchByPrice(lowPrice = 500000, highPrice = 10000000) {
    await this.minPriceThumb.fill("" + lowPrice);
    await this.maxPriceThumb.fill("" + highPrice);
    await this.startSearchButton.click();
    await this.page.waitForLoadState("domcontentloaded");
  }
}

export default SearchComponent;
