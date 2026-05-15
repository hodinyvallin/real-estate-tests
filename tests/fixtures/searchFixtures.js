import { test as sharedFixtures } from "./sharedFixtures.js";
import ListingApi from "../../api_objects/ListingApi.js";
import FeaturedListingsPage from "../../page_objects/FeaturedListingsPage.js";
import ListingDetailsPage from "../../page_objects/ListingDetailsPage.js";

export const test = sharedFixtures.extend({
  testListing: async ({ accessToken, request, page }, use) => {
    const listingApi = new ListingApi(request, accessToken);
    const testListing = await listingApi.createListing();
    await use(testListing);
    await listingApi.deleteListing(testListing.id);
    await page.waitForLoadState("domcontentloaded");
  },

  featuredListings: async ({ page, testListing }, use) => {
    const featuredListings = new FeaturedListingsPage(page, testListing);
    await use(featuredListings);
  },

  listingDetails: async ({ page, testListing }, use) => {
    const listingDetails = new ListingDetailsPage(page, testListing);
    await use(listingDetails);
  },
});

export { expect } from "@playwright/test";
