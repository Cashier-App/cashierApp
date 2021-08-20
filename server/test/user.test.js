const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");

describe("User test case", () => {
  beforeAll(async () => {
    try {
      await mongoose.connect("mongodb://localhost:27017/cashierFoxTest", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      });
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

  it("should be able to register a user", async () => {
    const response = await request(app).post("/User").send({
      email: "admin@admin.com",
      password: "admin",
    });
    expect(response.status).toBe(201);
  });
  it("should not be able to register a user when email / password is empty", async () => {
    const response = await request(app).post("/User").send({
      email: "",
      password: "admin",
    });
    expect(response.status).toBe(400);
  });
  it("should be able to get access_token", async () => {
    const response = await request(app).post("/User/login").send({
      email: "admin@admin.com",
      password: "admin",
    });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("access_token");
  });
  it("should not be able to login with invalid credential", async () => {
    const response = await request(app).post("/User/login").send({
      email: "admin@admin.com",
      password: "admin-",
    });
    expect(response.status).toBe(401);
  });
});
