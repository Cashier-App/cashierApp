const { default: axios } = require("axios");
const { GraphQLUpload } = require("graphql-upload");
const { promisify } = require("util");
const FormData = require("form-data");
var fs = require("fs");
const path = require("path");
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
const {
  getAllCategories,
  getCategory,
  postAddCategory,
  postEditCategory,
  deleteCategory,
  getStockIngredients,
  getStockIngredient,
  postAddStockIngredient,
  postEditStockIngredient,
  deleteStockIngredient,
  postLoginUser,
  postRegisterUser,
  getStockItems,
  getStockItem,
  postAddStockItem,
  postEditStockItem,
  deleteStockItem,
  getSales,
  getSale,
  postAddSale,
} = require("./apisCall");
const resolvers = {
  Upload: GraphQLUpload,
  Query: {
    // Categories
    categories: () => getAllCategories(),
    category: (_, args) => getCategory(args.id),
    // Stock Ingredients
    stockIngredients: () => getStockIngredients(),
    stockIngredient: (_, args) => getStockIngredient(args.id),
    ingredient: (_, args) => getStockIngredient(args.id),
    // Stock Items
    stockItems: () => getStockItems(),
    stockItem: (_, args) => getStockItem(args.id),
    // sales
    sales: () => getSales(),
    sale: (_, args) => getSale(args.id),
  },
  Mutation: {
    // Categories
    addStockItem: async (
      _,
      { file, name, price, category, recipes, stock }
    ) => {
      let stockItem = {};
      const { createReadStream, filename, mimetype, encoding } = await file;
      const stream = await createReadStream();
      const out = await require("fs").createWriteStream(
        "local-file-output12.jpg"
      );
      stream.pipe(out);
      console.log(2);
      await sleep(2000);
      await sleep(1000);
      var data = new FormData();
      data.append("name", name);
      data.append("price", price);
      data.append("stock", stock);
      data.append("category", category);
      const image = fs.createReadStream("./local-file-output12.jpg");
      data.append("image", image);
      let response = await axios.post(
        "http://localhost:4001/StockItems",
        data,
        {
          headers: {
            ...data.getHeaders(),
          },
        }
      );
      const { data: responseData } = response;
      stockItem = responseData;
      return stockItem;
    },
    addCategory: (_, args) => postAddCategory(args.name),
    editCategory: (_, args) => postEditCategory(args._id, args.name),
    deleteCategory: (_, args) => deleteCategory(args._id),
    // Stock Ingredients
    addStockIngredient: (_, args) =>
      postAddStockIngredient(args.name, args.unit, args.total),
    editStockIngredient: (_, args) =>
      postEditStockIngredient(args._id, args.name, args.unit, args.total),
    deleteStockIngredient: (_, args) => deleteStockIngredient(args._id),
    // Stock Items
    // addStockItem: (_, args) =>
    //   postAddStockItem(
    //     args.name,
    //     args.price,
    //     args.category,
    //     args.imageUrl,
    //     args.recipes,
    //     args.stock
    //   ),
    editStockItem: (_, args) =>
      postEditStockItem(
        args._id,
        args.name,
        args.price,
        args.category,
        args.imageUrl,
        args.recipes,
        args.stock
      ),
    deleteStockItem: (_, args) => deleteStockItem(args._id),
    // User
    loginUser: (_, args) => postLoginUser(args.email, args.password),
    registerUser: (_, args) =>
      postRegisterUser(args.email, args.password, args.name),
    //
    addSales: (_, args) =>
      postAddSale(args.items, args.payment, args.adminName),
  },
};

module.exports = { resolvers };
