const { API } = require("./instance");
const Redis = require("ioredis");
const redis = new Redis();
const { finished } = require("stream");
const { UserInputError } = require("apollo-server");
const FormData = require("form-data");
var fs = require("fs");
const path = require("path");
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
const getAllCategories = async () => {
  let categories = await redis.get("categories");
  if (categories) return JSON.parse(categories);
  else {
    try {
      let response = await API.get("/Categories");
      const { data: dataCategories } = response;
      await redis.set("categories", JSON.stringify(dataCategories));
      return dataCategories;
    } catch (err) {
      throw new Error(err.response.data.message);
    }
  }
};

const getCategory = async (id) => {
  let categories = await redis.get("categories");
  if (categories) {
    category = JSON.parse(categories).find((category) => category._id === id);
    if (category) return category;
  } else {
    try {
      let res = await API.get(`/Categories/${id}`);
      const { data } = res;
      return data;
    } catch (err) {
      throw new Error(err.response.data.message);
    }
  }
};

const postAddCategory = async (name) => {
  try {
    await redis.del("categories");
    let res = await API.post(
      "/Categories",
      {
        name,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const { data } = res;
    console.log("category add success");
    return data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
};

const postEditCategory = async (_id, name) => {
  try {
    await redis.del("categories");
    let res = await API.put(
      `/Categories/${_id}`,
      {
        name,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const { data } = res;
    return data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
};

const deleteCategory = async (_id) => {
  try {
    await redis.del("categories");
    let res = await API.delete(`/Categories/${_id}`);
    const { data } = res;
    return "category deleted";
  } catch (err) {
    throw new Error(err.response.data.message);
  }
};

// StockIngredients
const getStockIngredients = async () => {
  let stockIngredients = await redis.get("stockIngredients");
  if (stockIngredients) return JSON.parse(stockIngredients);
  else {
    try {
      let response = await API.get("/StockIngredients");
      const { data: dataCategories } = response;
      await redis.set("stockIngredients", JSON.stringify(dataCategories));
      return dataCategories;
    } catch (err) {
      console.log(err);
      throw new Error(err.response.data.message);
    }
  }
};
const getStockIngredient = async (id) => {
  let stockIngredients = await redis.get("stockIngredients");
  if (stockIngredients) {
    stockIngredient = JSON.parse(stockIngredients).find(
      (stockIngredient) => stockIngredient._id === id
    );
    if (stockIngredient) return stockIngredient;
  } else {
    try {
      let res = await API.get(`/StockIngredients/${id}`);
      const { data } = res;
      return data;
    } catch (err) {
      throw new Error(err.response.data.message);
    }
  }
};
const postAddStockIngredient = async (name, unit, total) => {
  try {
    await redis.del("stockIngredients");
    let res = await API.post(
      "/stockIngredients",
      {
        name,
        unit,
        total,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const { data } = res;
    return data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
};
const postEditStockIngredient = async (_id, name, unit, total) => {
  try {
    await redis.del("stockIngredients");
    let res = await API.put(
      `/stockIngredients/${_id}`,
      {
        name,
        unit,
        total,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const { data } = res;
    return data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
};
const deleteStockIngredient = async (_id) => {
  try {
    await redis.del("stockIngredients");
    let res = await API.delete(`/stockIngredients/${_id}`);
    const { data } = res;
    return "stock ingredients deleted successfully";
  } catch (err) {
    throw new Error(err.response.data.message);
  }
};

const postLoginUser = async (email, password) => {
  try {
    let res = await API.post(
      `/user/login`,
      {
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const { data } = res;
    return data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
};
const postRegisterUser = async (email, password, name) => {
  try {
    let res = await API.post(
      `/user`,
      {
        email,
        password,
        name,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const { data } = res;
    return "Register successfully";
  } catch (err) {
    throw new Error(err.response.data.message);
  }
};
// Stock Items
const getStockItems = async () => {
  let stockItems = await redis.get("stockItems");
  if (stockItems) return JSON.parse(stockItems);
  else {
    try {
      let response = await API.get("/StockItems");
      const { data: dataCategories } = response;
      await redis.set("stockItems", JSON.stringify(dataCategories));
      return dataCategories;
    } catch (err) {
      throw new Error(err.response.data.message);
    }
  }
};
const getStockItem = async (id) => {
  let stockItems = await redis.get("stockItems");
  if (stockItems) {
    stockItem = JSON.parse(stockItems).find(
      (stockItem) => stockItem._id === id
    );
    if (stockItem) return stockItem;
  } else {
    try {
      let res = await API.get(`/StockItems/${id}`);
      const { data } = res;
      return data;
    } catch (err) {
      throw new Error(err.response.data.message);
    }
  }
};
const finishPromise = (out, cb) => {
  return new Promise((resolve, reject) => {
    finished(out, async () => {
      try {
        const resolveCB = await cb();
        resolve(resolveCB);
      } catch (err) {
        reject(err);
      }
    });
  });
};
const postAddStockItem = async (
  file,
  name,
  price,
  category,
  recipes,
  stock
) => {
  await redis.del("stockItems");
  let stockItem = {};
  const { createReadStream, filename, mimetype, encoding } = await file;
  const stream = await createReadStream();
  const out = await require("fs").createWriteStream("local-file-output12.jpg");
  stream.pipe(out);
  try {
    return await finishPromise(out, async () => {
      var data = new FormData();
      recipes.forEach((e, index) => {
        console.log(index, e.ingredient);
        data.append(`recipes[${index}][ingredient]`, e.ingredient);
        data.append(`recipes[${index}][qty]`, Number(e.qty));
      });
      data.append("name", name);
      data.append("price", price);
      data.append("stock", stock);
      data.append("category", category);
      const image = fs.createReadStream("./local-file-output12.jpg");
      data.append("image", image);
      console.log(data);
      let response = await API.post("/StockItems", data, {
        headers: {
          ...data.getHeaders(),
        },
      });
      const { data: responseData } = response;
      stockItem = responseData;
      return stockItem;
      // console.log(err.response.data.message);
    });
  } catch (err) {
    throw new UserInputError(err.response.data.message);
  }
};
const postEditStockItem = async (
  _id,
  file,
  name,
  price,
  category,
  recipes,
  stock
) => {
  console.log("masuk");
  await redis.del("stockItems");
  let stockItem = {};
  console.log(file);
  if (file) {
    const { createReadStream, filename, mimetype, encoding } = await file;
    const stream = createReadStream();
    const out = await require("fs").createWriteStream(
      "local-file-output12.jpg"
    );
    stream.pipe(out);
    try {
      return await finishPromise(out, async () => {
        var data = new FormData();
        if (recipes) {
          recipes.forEach((e, index) => {
            console.log(index, e.ingredient);
            data.append(`recipes[${index}][ingredient]`, e.ingredient);
            data.append(`recipes[${index}][qty]`, Number(e.qty));
          });
        }
        if (name) data.append("name", name);
        if (price) data.append("price", price);
        if (stock) data.append("stock", stock);
        if (category) data.append("category", category);
        const image = fs.createReadStream("./local-file-output12.jpg");
        data.append("image", image);
        console.log(data);
        let response = await API.put(`/StockItems/${_id}`, data, {
          headers: {
            ...data.getHeaders(),
          },
        });
        const { data: responseData } = response;
        stockItem = responseData;
        return stockItem;
      });
    } catch (err) {
      throw new UserInputError(err.response.data.message);
    }
  } else {
    console.log("kesini");
    console.log(_id, file, name, price, category, recipes, stock);
    var data = new FormData();
    if (recipes) {
      recipes.forEach((e, index) => {
        console.log(index, e.ingredient);
        data.append(`recipes[${index}][ingredient]`, e.ingredient);
        data.append(`recipes[${index}][qty]`, Number(e.qty));
      });
    }
    if (name) data.append("name", name);
    if (price) data.append("price", price);
    if (stock) data.append("stock", stock);
    if (category) data.append("category", category);
    try {
      let response = await API.put(`/StockItems/${_id}`, data, {
        headers: {
          ...data.getHeaders(),
        },
      });
      const { data: responseData } = response;
      stockItem = responseData;
      return stockItem;
    } catch (err) {
      throw new UserInputError(err.response.data.message);
    }
  }
};

const deleteStockItem = async (_id) => {
  try {
    await redis.del("stockItems");
    let res = await API.delete(`/StockItems/${_id}`);
    const { data } = res;
    return "stock item deleted successfully";
  } catch (err) {
    throw new Error(err.response.data.message);
  }
};

// sales
const getSales = async () => {
  let sales = await redis.get("sales");
  if (sales) return JSON.parse(sales);
  else {
    try {
      let response = await API.get("/Sales");
      const { data: dataSales } = response;
      await redis.set("sales", JSON.stringify(dataSales));
      return dataSales;
    } catch (err) {
      throw new Error(err.response.data.message);
    }
  }
};

const getSale = async (id) => {
  let sales = await redis.get("sales");
  if (sales) {
    category = JSON.parse(sales).find((category) => category._id === id);
    if (category) return category;
  } else {
    try {
      let res = await API.get(`/Sales/${id}`);
      const { data } = res;
      console.log(data);
      return data;
    } catch (err) {
      throw new Error(err.response.data.message);
    }
  }
};

const postAddSale = async (items, payment, adminName) => {
  try {
    await redis.del("sales");
    let res = await API.post(
      "/Sales",
      {
        items,
        payment,
        adminName,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const { data } = res;
    return data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
};
module.exports = {
  // categories
  getAllCategories,
  getCategory,
  postAddCategory,
  postEditCategory,
  deleteCategory,
  // stock Ingredients
  getStockIngredients,
  getStockIngredient,
  postAddStockIngredient,
  postEditStockIngredient,
  deleteStockIngredient,
  // user
  postLoginUser,
  postRegisterUser,
  // stock Items
  getStockItems,
  getStockItem,
  postAddStockItem,
  postEditStockItem,
  deleteStockItem,
  // sales
  getSales,
  getSale,
  postAddSale,
};
