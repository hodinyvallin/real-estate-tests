import SearchComponent from "./page_components/SearchComponent";

class FeaturedListingsPage extends SearchComponent {
  constructor(page, testListing) {
    super(page);

    const targetCard = page.locator("div.MuiPaper-root", {
      has: page.locator(`a[href="/featured-listings/${testListing.id}"]`),
    });

    this.cardTitle = targetCard.getByText(testListing.title);
    this.cardPrice = targetCard.getByText("$ ");
    this.cardSqft = targetCard.getByText("Sqft:");
    this.cardGarage = targetCard.getByText("Garage:");
    this.cardBedrooms = targetCard.getByText("Bedrooms:");
    this.cardBathrooms = targetCard.getByText("Bathrooms:");
    this.cardCity = targetCard.getByText("City:");
    this.cardState = targetCard.getByText("State:");
    this.cardZipCode = targetCard.getByText("Zip/Code:");
    this.cardMoreInfoButton = page.locator(
      `a[href="/featured-listings/${testListing.id}"]`,
    );
  }

  async getPrice() {
    await this.cardPrice.waitFor();
    let price = await this.cardPrice.textContent();
    price = price.replaceAll(/[^0-9]/g, "");
    return parseInt(price);
  }

  async getSqft() {
    await this.cardSqft.waitFor();
    let sqft = await this.cardSqft.textContent();
    sqft = sqft.split(":").at(1).trim();
    return parseInt(sqft);
  }

  async getGarageCount() {
    await this.cardGarage.waitFor();
    let garages = await this.cardGarage.textContent();
    garages = garages.split(":").at(1).trim();
    return parseInt(garages);
  }

  async getBedroomCount() {
    await this.cardBedrooms.waitFor();
    let bedrooms = await this.cardBedrooms.textContent();
    bedrooms = bedrooms.split(":").at(1).trim();
    return parseInt(bedrooms);
  }

  async getBathroomCount() {
    await this.cardBathrooms.waitFor();
    let bathrooms = await this.cardBathrooms.textContent();
    bathrooms = bathrooms.split(":").at(1).trim();
    return parseInt(bathrooms);
  }

  async getCity() {
    await this.cardCity.waitFor();
    let city = await this.cardCity.textContent();
    city = city.split(":").at(1).trim();
    return city;
  }

  async getState() {
    await this.cardState.waitFor();
    let state = await this.cardState.textContent();
    state = state.split(":").at(1).trim();
    return state;
  }

  async getZipCode() {
    await this.cardZipCode.waitFor();
    let zipCode = await this.cardZipCode.textContent();
    zipCode = zipCode.split(":").at(1).trim();
    return parseInt(zipCode);
  }

  async openMoreInfo() {
    await this.cardMoreInfoButton.waitFor();
    await this.cardMoreInfoButton.click();
    await this.page.waitForLoadState("domcontentloaded");
  }

  async getPriceMinMax(lowPrice, highPrice) {
    await this.searchByPrice(lowPrice, highPrice);
    const priceMin = Number(
      await this.minPriceThumb.getAttribute("aria-valuenow"),
    );
    const priceMax = Number(
      await this.maxPriceThumb.getAttribute("aria-valuenow"),
    );
    const priceNumber = await this.getPrice();
    return [priceMin, priceMax, priceNumber];
  }
}

export default FeaturedListingsPage;
