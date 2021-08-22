const request = require("supertest");
const mongoose = require("mongoose");
const path = require("path");
// const User = require("../model/User");
const app = require("../app");
let ingredientId;
let categoryId;
let itemsId;
let saleId;
let access_token = "";
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
    await request(app).post("/User").send({
      name: "admin",
      email: "admin@admin.com",
      password: "admin",
    });
    let response_login = await request(app).post("/User/login").send({
      email: "admin@admin.com",
      password: "admin",
    });
    access_token = response_login.body.access_token;
    const response = await request(app)
      .get("/Sales")
      .set({ access_token })
      .send();
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
  // CREATE POST
  it("POST /Sales [SUCCESS CASE] should be able to create a sale data", async () => {
    const responseIngredient = await request(app)
      .post("/StockIngredients")
      .set({ access_token })
      .send({
        name: "Kecap",
        unit: "Liter",
        total: 2,
      });
    ingredientId = responseIngredient.body._id;
    let category = new Category({ name: "Food" });
    categoryId = await category.save();
    const response = await request(app)
      .post("/StockItems")
      .set({ access_token })
      .field("name", "Bakmi Ayam Komplit")
      .field("category", categoryId.id)
      .field("price", "350000")
      .field("stock", "2")
      .field("recipes[0][ingredient]", ingredientId)
      .field("recipes[0][qty]", 0.05)
      .attach("image", path.resolve(__dirname, "./test_image.jpg"));
    itemsId = response.body._id;
    const responseSales = await request(app)
      .post("/Sales")
      .set({ access_token })
      .send({
        items: [{ item: itemsId, qty: 2 }],
        payment: "Debit",
      });
    saleId = responseSales.body._id;
    expect(responseSales.status).toBe(201);
  });

  it("POST /Sales [ERROR CASE] should be able to create an item,if payment is not provided", async () => {
    const responseSales = await request(app)
      .post("/Sales")
      .set({ access_token })
      .send({
        items: [{ item: itemsId, qty: 2 }],
        payment: null,
      });
    expect(responseSales.status).toBe(400);
  });

  it("GET '/Sales' [SUCCESS CASE] should be able to object of one item", async () => {
    const response = await request(app)
      .get(`/Sales/${saleId}`)
      .set({ access_token })
      .send();
    expect(response.status).toBe(200);
  });

  it("GET '/StockItems' [ERROR CASE] should be able to error message", async () => {
    const response = await request(app)
      .get("/Sales/611f86749442233e1c67332d")
      .set({ access_token })
      .send();
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message", "Sale not found");
  });
});
