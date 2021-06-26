const request = require("supertest");
const app = require("../app");

describe("Test the root path", () => {
  test("It should response the GET method", done => {
    request(app)
      .get("/")
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});

describe("Test product list endpoint", () => {
  test("It should response the GET method", done => {
    request(app)
      .get("/products")
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});

describe("Test product details endpoint", () => {
  test("It should response the GET method", done => {
    request(app)
      .get("/products/897")
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});

describe("Test product styles endpoint", () => {
  test("It should response the GET method", done => {
    request(app)
      .get("/products/23357/styles")
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      });
  }, 10000);
});


describe("Test related products endpoint", () => {
  test("It should response the GET method", done => {
    request(app)
      .get("/products/879543/related")
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});