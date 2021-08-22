const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
let id = "";
let access_token = "";
describe("stock ingredient test case", () => {
  beforeAll(async () => {
    try {
      await mongoose.connect("mongodb://localhost:27017/cashierFoxTest", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      });
    } catch (err) {}
  });

  afterAll(async () => {
    const collections = await mongoose.connection.db.collections();
    for (let collection of collections) {
      await collection.deleteMany();
    }
    await mongoose.disconnect();
  });
  it("should be able to get all stock ingredients", async () => {
    const response = await request(app).get("/StockIngredients").send();
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
  it("should be able to add new stock ingredient", async () => {
    const response = await request(app).post("/StockIngredients").send({
      name: "Kecap",
      unit: "Liter",
      total: 2,
    });
    id = response.body._id;
    expect(response.status).toBe(201);
  });
  it("should not be able to create when stock ingredient already exists", async () => {
    const response = await request(app).post("/StockIngredients").send({
      name: "Kecap",
      unit: "Liter",
      total: 5,
    });
    expect(response.status).toBe(400);
  });
  it("should not be able to create when name is empty", async () => {
    const response = await request(app).post("/StockIngredients").send({
      name: "",
    });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });
  it("should be able to get single stock ingredient by id", async () => {
    const response = await request(app).get(`/StockIngredients/${id}`).send();
    expect(response.status).toBe(200);
  });
  it("should not be able to get single stock ingredient when id is not exist", async () => {
    const response = await request(app)
      .get(`/StockIngredients/611f86749442233e1c67332d`)
      .send();
    expect(response.status).toBe(404);
  });
  it("should be able to update stock ingredient", async () => {
    const response = await request(app).put(`/StockIngredients/${id}`).send({
      name: "terigu",
    });
    expect(response.status).toBe(200);
    expect(response.body.name).toBe("terigu");
  });
  it("should not be able to update stock ingredient when id is invalid", async () => {
    const response = await request(app)
      .put(`/StockIngredients/611f86749442233e1c67332d`)
      .send({
        name: "terigu",
      });
    expect(response.status).toBe(404);
  });
  it("should not be able to update stock ingredient when name is empty", async () => {
    const response = await request(app).put(`/StockIngredients/${id}`).send({
      name: "",
    });
    expect(response.status).toBe(400);
  });
  it("should not able to delete stock ingredient, when id is invalid", async () => {
    const response = await request(app)
      .delete(`/StockIngredients/611f86749442233e1c67312d`)
      .send();
    expect(response.status).toBe(404);
  });
  it("should able to delete stock ingredient by id", async () => {
    const response = await request(app)
      .delete(`/StockIngredients/${id}`)
      .send();
    expect(response.status).toBe(200);
  });
});
