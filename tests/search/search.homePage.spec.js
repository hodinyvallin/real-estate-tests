import { test, expect } from "../fixtures/searchFixtures";

test.describe('Search on HomePage', () => {
  test.beforeEach('Set page to dark theme', async ({ home }) => {
    await home.setThemeToDark();
  });

  test('Should search by title', async ({ testListing, home, featuredListings }) => {
    await home.searchByListingTitle(testListing.title);

    await expect(featuredListings.cardTitle).toHaveText(testListing.title);
  });

  test('Should search by bedrooms', async ({ testListing, home, featuredListings }) => {    
    await home.searchByBedroomCount(testListing.bedrooms);
    const bedroomsNumber = await featuredListings.getBedroomCount();
    
    await expect(bedroomsNumber).toBeGreaterThanOrEqual(Number(testListing.bedrooms));
  });

  test('Should search by city', async ({ testListing, home, featuredListings, listingDetails }) => {
    await home.searchByCity(testListing.city);
    const actualCardCity = await featuredListings.getCity();
    const actualCardTitle = await featuredListings.cardTitle.textContent();
    
    expect(testListing.city).toEqual(actualCardCity);
    expect(testListing.title).toEqual(actualCardTitle);

    await featuredListings.openMoreInfo();
    const actualTitle = await listingDetails.getTitle();
    const actualAddress = await listingDetails.getAddress();
    const actualPrice = await listingDetails.getPrice();
    const actualSqft = await listingDetails.getSqft();
    const actualLotSize = await listingDetails.getLotSize();
    const actualGarages = await listingDetails.getGarageCount();
    const actualBedrooms = await listingDetails.getBedroomCount();
    const actualBathrooms = await listingDetails.getBathroomCount();
    const actualRealtor = await listingDetails.getRealtor();

    expect.soft(testListing.title).toEqual(actualTitle);
    expect.soft(testListing.address).toEqual(actualAddress);
    expect.soft(testListing.price).toEqual(actualPrice);
    expect.soft(testListing.sqft).toEqual(actualSqft);
    expect.soft(testListing.lotSize).toEqual(actualLotSize);
    expect.soft(testListing.garage).toEqual(actualGarages);
    expect.soft(testListing.bedrooms).toEqual(actualBedrooms);
    expect.soft(testListing.bathrooms).toEqual(actualBathrooms);
    expect.soft(`${testListing.realtor.username} ${testListing.realtor.user_surname}`).toEqual(actualRealtor);
  });
  
  test('Should search by price', async ({ home, featuredListings }) => {
    const lowRange = 100_000;
    const highRange = 10_000_000;

    const [priceMin, priceMax, priceNumber] = await featuredListings.getPriceMinMax(lowRange, highRange);

    expect(priceNumber).toBeGreaterThanOrEqual(priceMin); 
    expect(priceNumber).toBeLessThanOrEqual(priceMax);
  });
});