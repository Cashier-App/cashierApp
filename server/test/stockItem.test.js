const request = require("supertest");
const mongoose = require("mongoose");
const path = require("path");
// const User = require("../model/User");
const app = require("../app");
let ingredientId;
let categoryId;
let itemsId;
let access_token = "";

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
    const responseIngredient = await request(app)
      .post("/StockIngredients")
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
      .field("name", "Bakmi Ayam Komplit")
      .field("category", categoryId.id)
      .field("price", "350000")
      .field("stock", "2")
      .field("recipes[0][ingredient]", ingredientId)
      .field("recipes[0][qty]", 0.05)
      .attach("image", path.resolve(__dirname, "./test_image.jpg"));
    expect(response.status).toBe(201);
    itemsId = response.body._id;
  });

  // it("POST /StockItems [ERROR CASE] should be able to create an item, if stock > maxStock ", async () => {
  //   const response = await request(app)
  //     .post("/StockItems")
  //     .field("name", "Bakmi Ayam Komplit 2")
  //     .field("category", categoryId.id)
  //     .field("price", "350000")
  //     .field("stock", "10000")
  //     .field("recipes[0][ingredient]", ingredientId)
  //     .field("recipes[0][qty]", 0.05)
  //     .attach("image", path.resolve(__dirname, "./test_image.jpg"));
  //   expect(response.status).toBe(400);
  //   expect(response.body).toHaveProperty(
  //     "message",
  //     "maximum stock for this item is 40 based on ingredients stock"
  //   );
  // });
  it("POST /StockItems [ERROR CASE] should be able to create an item, if image type is invalid ", async () => {
    const response = await request(app)
      .post("/StockItems")
      .field("name", "Bakmi Ayam Komplit 32")
      .field("category", categoryId.id)
      .field("price", "350000")
      .field("stock", "1")
      .field("recipes[0][ingredient]", ingredientId)
      .field("recipes[0][qty]", 0.05)
      .attach("image", path.resolve(__dirname, "./test_image3.svg"));
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty(
      "message",
      "Image file must be lower than 255Kb and extension must be jpeg,jpeg or png"
    );
  });
  it("POST /StockItems [ERROR CASE] should be able to create an item, if name already exist", async () => {
    const response = await request(app)
      .post("/StockItems")
      .field("name", "Bakmi Ayam Komplit")
      .field("category", categoryId.id)
      .field("price", "350000")
      .field("stock", "2")
      .field("recipes[0][ingredient]", ingredientId)
      .field("recipes[0][qty]", 0.05)
      .attach("image", path.resolve(__dirname, "./test_image.jpg"));
    expect(response.status).toBe(400);
  });
  it("POST /StockItems [ERROR CASE] should be able to create an item, if image notexist", async () => {
    const response = await request(app)
      .post("/StockItems")
      .field("name", "Bakmi Ayam Komplit")
      .field("category", categoryId.id)
      .field("price", "350000")
      .field("stock", "2")
      .field("recipes[0][ingredient]", ingredientId)
      .field("recipes[0][qty]", 0.05);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "Image cant be empty");
  });
  it("POST /StockItems [ERROR CASE] should be able to create an item, if image larger than 255kb", async () => {
    const response = await request(app)
      .post("/StockItems")
      .field("name", "Bakmi Ayam Komplit")
      .field("category", categoryId.id)
      .field("price", "350000")
      .field("stock", "2")
      .field("recipes[0][ingredient]", ingredientId)
      .field("recipes[0][qty]", 0.05)
      .attach("image", path.resolve(__dirname, "./test_image2.jpg"));
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty(
      "message",
      "Image file must be lower than 255Kb and extension must be jpeg,jpeg or png"
    );
  });

  it("GET '/StockItems' [SUCCESS CASE] should be able to get object of one item", async () => {
    const response = await request(app).get(`/StockItems/${itemsId}`).send();
    expect(response.status).toBe(200);
  });
  it("GET '/StockItems' [ERROR CASE] should be able to error message, if item not exist", async () => {
    const response = await request(app)
      .get("/StockItems/611f86749442233e1c67332d")
      .send();
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message", "Stock Item not found");
  });
  // Update Put
  it("PUT /StockItems/:id [SUCCESS CASE] should be able to update stock item", async () => {
    const response = await request(app)
      .put(`/StockItems/${itemsId}`)
      .send({
        name: "Bakmi Ayam Komplit Mewah",
        category: categoryId.id,
        price: 35000,
        stock: 5,
        recipes: [{ ingredient: ingredientId, qty: 0.05 }],
      });
    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Bakmi Ayam Komplit Mewah");
  });
  it("PUT /StockItems/:id [SUCCESS CASE] should be able to update stock item", async () => {
    const response = await request(app)
      .put(`/StockItems/${itemsId}`)
      .field("name", "Bakmi Ayam Kompasdasdlit")
      .field("category", categoryId.id)
      .field("price", "3500")
      .field("stock", "1")
      .field("recipes[0][ingredient]", ingredientId)
      .field("recipes[0][qty]", 0.05)
      .attach("image", path.resolve(__dirname, "./test_image.jpg"));
    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Bakmi Ayam Kompasdasdlit");
  });
  it("PUT /StockItems/:id [SUCCESS CASE] should be able to update stock item", async () => {
    const response = await request(app)
      .put(`/StockItems/${itemsId}`)
      .send({
        name: "Bakmi Ayam Komplit Mewah1",
        price: 35000,
        stock: 5,
        recipes: [{ ingredient: ingredientId, qty: 0.05 }],
      });
    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Bakmi Ayam Komplit Mewah1");
  });
  it("PUT /StockItems/:id [SUCCESS CASE] should be able to update stock item", async () => {
    const response = await request(app).put(`/StockItems/${itemsId}`).send({
      name: "Bakmi Ayam Komplit Mewah2",
      price: 35000,
      stock: 5,
    });
    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Bakmi Ayam Komplit Mewah2");
  });
  it("PUT /StockItems/:id [SUCCESS CASE] should be able to update stock item", async () => {
    const response = await request(app).put(`/StockItems/${itemsId}`).send({
      name: "Bakmi Ayam Komplit Mewah3",
      price: 35000,
    });
    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Bakmi Ayam Komplit Mewah3");
  });
  it("PUT /StockItems/:id [ERROR CASE] should not be able to update stock item, if item not exist", async () => {
    const response = await request(app)
      .put(`/StockItems/611f86749442233e1c67332d`)
      .send({
        name: "Bakmi Ayam Komplit Mewah",
        category: categoryId.id,
        price: 35000,
        stock: 5,
        recipes: [{ ingredient: ingredientId, qty: 0.05 }],
      });
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message", "Stock Item not found");
  });

  it("PUT /StockItems/:id [ERROR CASE] should not be able to update stock item, if recipes is invalid", async () => {
    const response = await request(app).put(`/StockItems/${itemsId}`).send({
      name: "Bakmi Ayam Komplit Mewah 2",
      category: categoryId.id,
      price: 35000,
      stock: 10000,
      recipes: 123,
    });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty(
      "message",
      "recipes.map is not a function"
    );
  });

  it("PUT /StockItems/:id [ERROR CASE] should not be able to update stock item,if name is not empty", async () => {
    const response = await request(app)
      .put(`/StockItems/${itemsId}`)
      .send({
        name: "",
        category: categoryId,
        price: 35000,
        stock: 100,
        recipes: [{ ingredient: ingredientId, qty: 0.05 }],
      });
    expect(response.status).toBe(400);
  });

  it("DELETE /StockItems/:id [SUCCESS CASE] should be able to delete stock Item by id", async () => {
    const response = await request(app).delete(`/StockItems/${itemsId}`).send();
    expect(response.status).toBe(200);
  });

  it("DELETE /StockItems/:id [ERROR CASE] should not be able to delete stock Item by id", async () => {
    const response = await request(app)
      .delete(`/StockItems/611f86749442233e1c67312d`)
      .send();
    expect(response.status).toBe(404);
  });
});
