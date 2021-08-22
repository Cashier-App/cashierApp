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
  getStockItems,
  getStockItem,
  postAddStockItem,
  postEditStockItem,
  deleteStockItem,
  getSales,
  getSale,
  postAddSale,
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
    ingredient(id: String): StockIngredient
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
    qty: Float
  }
  type Ingredient {
    _id: ID
    name: String
    unit: String
    total: Float
  }
  type StockItem {
    _id: ID
    name: String
    price: Float
    category: Category
    imageUrl: String
    recipes: [Recipe]
    stock: Float
  }
  type Item {
    _id: ID
    item: StockItem
    qty: Float
  }
  type Sale {
    _id: ID
    items: [Item]
    payment: String
  }
  type access_token {
    access_token: String
  }
  input add_recipe {
    ingredient: String
    qty: Float
  }
  input add_item {
    item: String
    qty: Float
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
    # mutation stockItems
    addStockItem(
      name: String
      price: Float
      category: String
      imageUrl: String
      recipes: [add_recipe]
      stock: Float
    ): StockItem
    editStockItem(
      _id: ID
      name: String
      price: Float
      category: String
      imageUrl: String
      recipes: [add_recipe]
      stock: Float
    ): StockItem
    deleteStockItem(_id: ID): String
    # mutation sales
    addSales(items: [add_item], payment: String): Sale
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
    addSales: (_, args) => postAddSale(args.items, args.payment),
  },
};

module.exports = { typeDefs, resolvers };
