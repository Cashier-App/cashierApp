const { default: axios } = require("axios");
const { GraphQLUpload } = require("graphql-upload");
const { finished } = require("stream");
const FormData = require("form-data");
var fs = require("fs");
const path = require("path");
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
    singleUpload: async (parent, { file }) => {
      const { createReadStream, filename, mimetype, encoding } = await file;
      const stream = createReadStream();
      const out = require("fs").createWriteStream("local-file-output12.jpg");
      stream.pipe(out);
      finished(out, () => {
        var data = new FormData();
        data.append("name", "asdasdasdas123123123123das");
        data.append("price", "100000");
        data.append("stock", "2");
        data.append("category", "61213a782ba034665c9be936");
        data.append("image", fs.createReadStream("./local-file-output12.jpg"));
        data.append("recipes[0][ingredient]", "612117d1e690c707e02a22ac");
        data.append("recipes[0][qty]", "5");
        axios
          .post("http://localhost:4001/StockItems", data, {
            headers: {
              ...data.getHeaders(),
            },
          })
          .then(({ data }) => {
            console.log(data);
          })
          .catch((err) => {
            console.log(err);
          });
      });

      // await finished(out);
      return { filename, mimetype, encoding };
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
    addStockItem: (_, args) =>
      postAddStockItem(
        args.name,
        args.price,
        args.category,
        args.imageUrl,
        args.recipes,
        args.stock
      ),
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
