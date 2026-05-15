class ListingDetailsPage {
  constructor(page, testListing) {
    this.page = page;
    this.title = page.getByRole("heading", { name: testListing.title });
    this.address = page.locator("div.MuiGrid-grid-xs-8 p.MuiTypography-body1");
    this.price = page.getByText("Asking Price:");
    this.sqft = page.getByText("Square Feet:");
    this.lotSize = page.getByText("Lot Size:");
    this.listingDate = page.getByText("Listing Date:");
    this.garage = page.getByText("Garage:");
    this.bedrooms = page.getByText("Bedrooms:");
    this.bathrooms = page.getByText("Bathrooms:");
    this.realtor = page.getByText("Realtor:");
  }

  async getTitle() {
    await this.title.waitFor();
    let title = await this.title.textContent();
    return title;
  }

  async getAddress() {
    await this.address.waitFor();
    let address = await this.address.textContent();
    return address;
  }

  async getPrice() {
    await this.price.waitFor();
    let price = await this.price.textContent();
    price = price.replaceAll(/[^0-9]/g, "");
    return price;
  }

  async getSqft() {
    await this.sqft.waitFor();
    let sqft = await this.sqft.textContent();
    sqft = sqft.split(":").at(1).trim();
    return sqft;
  }

  async getLotSize() {
    await this.lotSize.waitFor();
    let lotSize = await this.lotSize.textContent();
    lotSize = lotSize.split(":").at(1).trim();
    return lotSize;
  }

  async getListingDate() {
    await this.listingDate.waitFor();
    let listingDate = await this.listingDate.textContent();
    listingDate = listingDate.split(": ").at(1);
    return listingDate;
  }

  async getGarageCount() {
    await this.garage.waitFor();
    let garages = await this.garage.textContent();
    garages = garages.split(":").at(1).trim();
    return garages;
  }

  async getBedroomCount() {
    await this.bedrooms.waitFor();
    let bedrooms = await this.bedrooms.textContent();
    bedrooms = bedrooms.split(":").at(1).trim();
    return bedrooms;
  }

  async getBathroomCount() {
    await this.bathrooms.waitFor();
    let bathrooms = await this.bathrooms.textContent();
    bathrooms = bathrooms.split(":").at(1).trim();
    return bathrooms;
  }

  async getRealtor() {
    await this.realtor.waitFor();
    let realtor = await this.realtor.textContent();
    realtor = realtor.split(": ").at(1);
    return realtor;
  }
}

export default ListingDetailsPage;
