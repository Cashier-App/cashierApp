const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
let id = "";
let access_token = "";
describe("Category test case", () => {
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

  it("should be able to get all categories", async () => {
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
      .get("/Categories")
      .set({ access_token })
      .send();
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
  it("should be able to add new category", async () => {
    const response = await request(app)
      .post("/Categories")
      .set({ access_token })
      .send({
        name: "Food",
      });
    id = response.body._id;
    expect(response.status).toBe(201);
  });
  it("should not be able to create when category already exists", async () => {
    const response = await request(app)
      .post("/Categories")
      .set({ access_token })
      .send({
        name: "Food",
      });
    expect(response.status).toBe(400);
  });
  it("should not be able to create when name is empty", async () => {
    const response = await request(app)
      .post("/Categories")
      .set({ access_token })
      .send({
        name: "",
      });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });
  it("should be able to get single category by id", async () => {
    const response = await request(app)
      .get(`/Categories/${id}`)
      .set({ access_token })
      .send();
    expect(response.status).toBe(200);
  });
  it("should not be able to get single category when id is not exist", async () => {
    const response = await request(app)
      .get(`/Categories/611f86749442233e1c67332d`)
      .set({ access_token })
      .send();
    expect(response.status).toBe(404);
  });
  it("should be able to update category", async () => {
    const response = await request(app)
      .put(`/Categories/${id}`)
      .set({ access_token })
      .send({
        name: "new category",
      });
    expect(response.status).toBe(200);
    expect(response.body.name).toBe("new category");
  });
  it("should not be able to update category when id is invalid", async () => {
    const response = await request(app)
      .put(`/Categories/611f86749442233e1c67332d`)
      .set({ access_token })
      .send({
        name: "new category",
      });
    expect(response.status).toBe(404);
  });
  it("should not be able to update category when name is empty", async () => {
    const response = await request(app)
      .put(`/Categories/${id}`)
      .set({ access_token })
      .send({
        name: "",
      });
    expect(response.status).toBe(400);
  });
  it("should not able to delete category, when id is invalid", async () => {
    const response = await request(app)
      .delete(`/Categories/611f86749442233e1c67312d`)
      .set({ access_token })
      .send();
    expect(response.status).toBe(404);
  });
  it("should able to delete category by id", async () => {
    const response = await request(app)
      .delete(`/Categories/${id}`)
      .set({ access_token })
      .send();
    expect(response.status).toBe(200);
  });
});
