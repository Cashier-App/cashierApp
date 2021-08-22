const request = require("supertest");
const mongoose = require("mongoose");
// const User = require("../model/User");
const app = require("../app");
let ingredientId;
let categoryId;
let itemsId;

describe("Stock Item case", () => {
  beforeAll(async () => {
    try {
      await mongoose.connect("mongodb://localhost:27017/cashierFoxTest", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      });
      const response = await request(app).post("/StockIngredients").send();
    } catch (err) {
      console.log(err.message);
    }
  });

  afterAll(async () => {
    const collections = await mongoose.connection.db.collections();
    for (let collection of collections) {
      await collection.deleteMany();
    }
    await mongoose.disconnect();
  });

  it("GET '/StockItems' [SUCCESS CASE] should be able to return array", async () => {
    const response = await request(app).get("/StockItems").send();
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
  // CREATE POST
  it("POST /StockItems [SUCCESS CASE] should be able to create an item", async () => {
    const responseIngredient = await request(app).post("/StockIngredients").send({
      name: "Kecap",
      unit: "Liter",
      total: 2,
    });
    ingredientId = responseIngredient.body._id;
    let category = new Category({ name: "Food" });
    categoryId = await category.save();
    const response = await request(app)
      .post("/StockItems")
      .send({
        name: "Bakmi Ayam Komplit",
        category: categoryId,
        price: 35000,
        stock: 2,
        imageUrl: "tes",
        recipes: [{ ingredient: ingredientId, qty: 0.05 }],
      });
    expect(response.status).toBe(201);
    itemsId = response.body._id;
  });

  it("POST /StockItems [ERROR CASE] should be able to create an item", async () => {
    const response = await request(app)
      .post("/StockItems")
      .send({
        name: "Bakmi Ayam Komplit 2",
        category: categoryId,
        price: 35000,
        stock: 10000,
        imageUrl: "tes",
        recipes: [{ ingredient: ingredientId, qty: 0.05 }],
      });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "maximum stock for this item is 40 based on ingredients stock");
  });

  it("POST /StockItems [ERROR CASE] should be able to create an item", async () => {
    const response = await request(app)
      .post("/StockItems")
      .send({
        name: "Bakmi Ayam Komplit",
        category: categoryId,
        price: 35000,
        stock: 5,
        imageUrl: "tes",
        recipes: [{ ingredient: ingredientId, qty: 0.05 }],
      });
    expect(response.status).toBe(400);
  });

  it("GET '/StockItems' [SUCCESS CASE] should be able to object of one item", async () => {
    const response = await request(app).get(`/StockItems/${itemsId}`).send();
    expect(response.status).toBe(200);
  });

  it("GET '/StockItems' [ERROR CASE] should be able to error message", async () => {
    const response = await request(app).get("/StockItems/611f86749442233e1c67332d").send();
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message", "Stock Item not found");
  });
  //Update Put
  it("PUT /StockItems/:id [SUCCESS CASE] should be able to update stock item", async () => {
    const response = await request(app)
      .put(`/StockItems/${itemsId}`)
      .send({
        name: "Bakmi Ayam Komplit Mewah",
        category: categoryId,
        price: 35000,
        stock: 5,
        imageUrl: "tes",
        recipes: [{ ingredient: ingredientId, qty: 0.05 }],
      });
    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Bakmi Ayam Komplit Mewah");
  });

  it("PUT /StockItems/:id [ERROR CASE] should not be able to update stock item", async () => {
    const response = await request(app)
      .put(`/StockItems/611f86749442233e1c67332d`)
      .send({
        name: "Bakmi Ayam Komplit Mewah",
        category: categoryId,
        price: 35000,
        stock: 5,
        imageUrl: "tes",
        recipes: [{ ingredient: ingredientId, qty: 0.05 }],
      });
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message", "Stock Item not found");
  });

  it("PUT /StockItems/:id [ERROR CASE] should not be able to update stock item", async () => {
    const response = await request(app).put(`/StockItems/${itemsId}`).send({
      name: "Bakmi Ayam Komplit Mewah 2",
      category: categoryId,
      price: 35000,
      stock: 10000,
      imageUrl: "tes",
      recipes: 123,
    });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", 'Cast to embedded failed for value "123" (type string) at path "recipes"');
  });

  it("PUT /StockItems/:id [ERROR CASE] should not be able to update stock item", async () => {
    const response = await request(app)
      .put(`/StockItems/${itemsId}`)
      .send({
        name: "",
        category: categoryId,
        price: 35000,
        stock: 100,
        imageUrl: "tes",
        recipes: [{ ingredient: ingredientId, qty: 0.05 }],
      });
    console.log(response.body);
    expect(response.status).toBe(400);
  });

  it("DELETE /StockItems/:id [SUCCESS CASE] should be able to delete stock Item by id", async () => {
    const response = await request(app).delete(`/StockItems/${itemsId}`).send();
    expect(response.status).toBe(200);
  });

  it("DELETE /StockItems/:id [ERROR CASE] should not be able to delete stock Item by id", async () => {
    const response = await request(app).delete(`/StockItems/611f86749442233e1c67312d`).send();
    expect(response.status).toBe(404);
  });
});
