const request = require("supertest");
const mongoose = require("mongoose");
// const User = require("../model/User");
const app = require("../app");
let ingredientId;
let categoryId;
let itemsId;
let saleId;

describe("Sale case", () => {
  beforeAll(async () => {
    try {
      await mongoose.connect("mongodb://localhost:27017/cashierFoxTest", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      });
      const response = await request(app).post("/Sales").send();
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

  it("GET '/Sales' [SUCCESS CASE] should be able to return array", async () => {
    const response = await request(app).get("/Sales").send();
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
  // CREATE POST
  it("POST /Sales [SUCCESS CASE] should be able to create a sale data", async () => {
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
    itemsId = response.body._id;
    const responseSales = await request(app)
      .post("/Sales")
      .send({
        items: [{ item: itemsId, qty: 2 }],
        payment: "Debit",
      });
    saleId = responseSales.body._id;
    expect(responseSales.status).toBe(201);
  });

  it("POST /Sales [ERROR CASE] should be able to create an item", async () => {
    const responseSales = await request(app)
      .post("/Sales")
      .send({
        items: [{ item: itemsId, qty: 2 }],
        payment: null,
      });
    expect(responseSales.status).toBe(400);
  });

  it("GET '/Sales' [SUCCESS CASE] should be able to object of one item", async () => {
    const response = await request(app).get(`/Sales/${saleId}`).send();
    expect(response.status).toBe(200);
  });

  it("GET '/StockItems' [ERROR CASE] should be able to error message", async () => {
    const response = await request(app).get("/Sales/611f86749442233e1c67332d").send();
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message", "Sale not found");
  });
});
