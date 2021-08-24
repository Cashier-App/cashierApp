const { gql, GraphQLUpload } = require("apollo-server");
const typeDefs = gql`
  scalar Upload
  type Query {
    categories: [Category]
    category(id: String): Category
    sales: [Sale]
    sale(id: String): Sale
    stockIngredients: [StockIngredient]
    stockIngredient(id: String): StockIngredient
    stockItems: [StockItem]
    updatedStockItems: [StockItem]
    stockItem(id: String): StockItem
    ingredient(id: String): StockIngredient
  }
  type File {
    filename: String!
    mimetype: String!
    encoding: String!
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
    total: Float
    adminName: String
    date: String
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
    addStockItem(
      file: Upload!
      name: String
      price: Float
      category: String
      recipes: [add_recipe]
      stock: Float
    ): StockItem!
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
    # addStockItem(
    #   name: String
    #   price: Float
    #   category: String
    #   imageUrl: String
    #   recipes: [add_recipe]
    #   stock: Float
    # ): StockItem
    editStockItem(
      _id: ID
      file: Upload
      name: String
      price: Float
      category: String
      recipes: [add_recipe]
      stock: Float
    ): StockItem!
    deleteStockItem(_id: ID): String
    # mutation sales
    addSales(items: [add_item], payment: String, adminName: String): Sale
  }
`;

module.exports = { typeDefs };
