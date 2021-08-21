const { gql } = require("apollo-server");
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
} = require("./apisCall");

const typeDefs = gql`
  type Query {
    users: [User]
    user(id: String): User
    categories: [Category]
    category(id: String): Category
    sales: [Sale]
    sale(id: String): Sale
    stockIngredients: [StockIngredient]
    stockIngredient(id: String): StockIngredient
    stockItems: [StockItem]
    stockItem(id: String): StockItem
  }
  type User {
    _id: ID
    email: String
    password: String
    name: String
  }
  type Category {
    _id: ID
    name: String
  }
  type StockIngredient {
    _id: ID
    name: String
    unit: String
    total: Float
  }
  type Recipe {
    _id: ID
    ingredient: Ingredient
  }
  type Ingredient {
    stockIngredient: StockIngredient
    qty: Float
  }
  type StockItem {
    _id: ID
    name: String
    price: Float
    recipes: [Recipe]
    stock: Float
  }
  type Sale {
    _id: ID
    item: StockItem
    payment: String
  }
  type access_token {
    access_token: String
  }
  type Mutation {
    # mutation category
    addCategory(name: String): Category
    editCategory(_id: ID, name: String): Category
    deleteCategory(_id: ID): String
    # mutation stockIngredients
    addStockIngredient(
      name: String
      unit: String
      total: Float
    ): StockIngredient
    editStockIngredient(
      _id: ID
      name: String
      unit: String
      total: Float
    ): StockIngredient
    deleteStockIngredient(_id: ID): String
    # mutation user
    loginUser(email: String, password: String): access_token
    registerUser(email: String, password: String, name: String): String
  }
`;

const resolvers = {
  Query: {
    // Categories
    categories: () => getAllCategories(),
    category: (_, args) => getCategory(args.id),
    // Stock Ingredients
    stockIngredients: () => getStockIngredients(),
    stockIngredient: (_, args) => getStockIngredient(args.id),
  },
  Mutation: {
    // Categories
    addCategory: (_, args) => postAddCategory(args.name),
    editCategory: (_, args) => postEditCategory(args._id, args.name),
    deleteCategory: (_, args) => deleteCategory(args._id),
    // Stock Ingredients
    addStockIngredient: (_, args) =>
      postAddStockIngredient(args.name, args.unit, args.total),
    editStockIngredient: (_, args) =>
      postEditStockIngredient(args._id, args.name, args.unit, args.total),
    deleteStockIngredient: (_, args) => deleteStockIngredient(args._id),
    // User
    loginUser: (_, args) => postLoginUser(args.email, args.password),
    registerUser: (_, args) =>
      postRegisterUser(args.email, args.password, args.name),
  },
};

module.exports = { typeDefs, resolvers };
