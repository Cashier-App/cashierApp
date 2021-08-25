const { default: axios } = require("axios");
const { GraphQLUpload } = require("graphql-upload");

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
  getUpdatedItems,
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
    updatedStockItems: () => getUpdatedItems(),
    // sales
    sales: () => getSales(),
    sale: (_, args) => getSale(args.id),
  },
  Mutation: {
    // Categories
    addStockItem: async (_, { file, name, price, category, recipes, stock }) =>
      postAddStockItem(file, name, price, category, recipes, stock),
    editStockItem: (_, { _id, file, name, price, category, recipes, stock }) =>
      postEditStockItem(_id, file, name, price, category, recipes, stock),
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
