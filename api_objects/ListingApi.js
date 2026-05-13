import { faker } from "@faker-js/faker";
const fs = require("fs");

class ListingApi {
  constructor(request, accessToken) {
    this.request = request;
    this.accessToken = accessToken;
  }

  async createListing() {
    const data = {
      images: fs.createReadStream("./test_data/cottage.png"),
      lotSize: faker.number.int({min: 1000, max: 10_000}),
      sqft: faker.number.int({min: 1000, max: 10_000}),
      garage: faker.number.int({min: 1, max: 10}),
      bathrooms: faker.number.int({min: 1, max: 10}),
      bedrooms: faker.number.int({min: 1, max: 10}),
      price: faker.number.int({min: 100_000, max: 10_000_000}),
      zipCode: faker.number.int({min: 2000, max: 9000}),
      state: "CA",
      city: "Pigletville",
      address: `${faker.number.int({min: 100, max: 999})} Piglet St`,
      description: "Welcome to my pretty Piglet-themed pink pad.",
      title: `Piglet's Pink Pad ${faker.number.int({min: 1000, max: 10_000})}`,
      isPublished: true
    };

    const response = await this.request.post('/api/estate-objects', {
      multipart: data,
      headers: { authorization: `Bearer ${this.accessToken}` }
    });

    return await response.json();
  }

  async deleteListing(id) {
    await this.request.delete(`/api/estate-objects/${id}`, {
      headers: {
        authorization: `Bearer ${this.accessToken}`,
      },
    });
  }
}

export default ListingApi;