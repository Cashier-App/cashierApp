const request = require("supertest");
const mongoose = require("mongoose");
// const User = require("../model/User");
const app = require("../app");

describe("Stock Item case", () => {
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

  it("should be able to create an item", async () => {
    const response = await request(app)
      .get("/StockItems")
      .send({
        name: "Bakmi Ayam Komplit",
        category: "Makanan",
        price: 35000,
        stock: 20,
        imageUrl: "tes",
        ingredients: [
          {
            id: 7,
            name: "Pangsit Goreng",
            unit: "Unit",
            qty: 1,
            total: 300,
          },
          {
            id: 1,
            name: "Mie",
            unit: "Pack",
            qty: 1,
            total: 200,
          },
          {
            id: 3,
            name: "Lada",
            unit: "Kg",
            qty: 0.1,
            total: 2,
          },
        ],
      });
    expect(response.status).toBe(201);
  });
  // it("should be able to create an item", async () => {
  //   const response = await request(app)
  //     .post("/StockItem")
  //     .send({
  //       name: "Bakmi Ayam Komplit",
  //       category: "Makanan",
  //       price: 35000,
  //       stock: 20,
  //       imageUrl: "tes",
  //       ingredients: [
  //         {
  //           id: 7,
  //           name: "Pangsit Goreng",
  //           unit: "Unit",
  //           qty: 1,
  //           total: 300,
  //         },
  //         {
  //           id: 1,
  //           name: "Mie",
  //           unit: "Pack",
  //           qty: 1,
  //           total: 200,
  //         },
  //         {
  //           id: 3,
  //           name: "Lada",
  //           unit: "Kg",
  //           qty: 0.1,
  //           total: 2,
  //         },
  //       ],
  //     });
  //   expect(response.status).toBe(201);
  // });
  // it("should be able to get access_token", async () => {
  //   const response = await request(app).post("/User/login").send({
  //     email: "admin@admin.com",
  //     password: "admin",
  //   });
  //   expect(response.status).toBe(200);
  //   expect(response.body).toHaveProperty("access_token");
  // });
  // it("should not be able to register when email already exists", async () => {
  //   const response = await request(app).post("/User").send({
  //     email: "admin@admin.com",
  //     password: "admin",
  //   });
  //   expect(response.status).toBe(400);
  // });
  // it("should not be able to register a user when email / password is empty", async () => {
  //   const response = await request(app).post("/User").send({
  //     email: "",
  //     password: "admin",
  //   });
  //   expect(response.status).toBe(400);
  // });
  // it("should not be able to login with invalid password", async () => {
  //   const response = await request(app).post("/User/login").send({
  //     email: "admin@admin.com",
  //     password: "admin-",
  //   });
  //   expect(response.status).toBe(401);
  // });
  // it("should not be able to login,if user not exists", async () => {
  //   const response = await request(app).post("/User/login").send({
  //     email: "admin123123@admin.com",
  //     password: "admin-",
  //   });
  //   expect(response.status).toBe(401);
  // });
});
